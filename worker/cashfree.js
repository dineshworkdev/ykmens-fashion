/**
 * Cashfree Payment Gateway Integration (Sandbox)
 * 
 * Handles order creation on the Cashfree Sandbox API.
 * Uses environment secrets (CASHFREE_APP_ID, CASHFREE_SECRET_KEY) securely from Worker env.
 * Never exposes secrets to client, logs, or error responses.
 */

const CASHFREE_SANDBOX_ORDERS_URL = 'https://sandbox.cashfree.com/pg/orders';
const CASHFREE_API_VERSION = '2025-01-01';

/**
 * Handle POST /api/cashfree/create-order
 * @param {Request} request
 * @param {Record<string, any>} env
 * @param {ExecutionContext} ctx
 * @param {Record<string, string>} corsHeaders
 * @returns {Promise<Response>}
 */
export async function handleCreateCashfreeOrder(request, env, ctx, corsHeaders) {
  // 1. Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Method Not Allowed',
        message: 'Only POST requests are supported for order creation.',
      }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'POST, OPTIONS',
          ...corsHeaders,
        },
      }
    );
  }

  // 2. Parse JSON request body
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Bad Request',
        message: 'Invalid JSON request body.',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }

  // 3. Validate order amount
  const rawAmount = body.amount ?? body.order_amount ?? body.orderAmount;
  const numAmount = parseFloat(rawAmount);

  if (isNaN(numAmount) || numAmount <= 0) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Validation Error',
        message: 'order_amount must be a valid positive number.',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }

  // 4. Validate Worker environment secrets
  const appId = env.CASHFREE_APP_ID;
  const secretKey = env.CASHFREE_SECRET_KEY;

  if (!appId || !secretKey) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Configuration Error',
        message: 'Cashfree credentials (CASHFREE_APP_ID, CASHFREE_SECRET_KEY) are not configured in the Worker environment.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }

  const orderAmount = Math.round(numAmount * 100) / 100;
  const orderCurrency = String(body.currency || body.order_currency || 'INR').trim().toUpperCase();

  // 5. Generate or sanitize order_id (Cashfree constraint: 3-50 chars, [a-zA-Z0-9_-])
  let orderId = body.orderId || body.order_id;
  if (!orderId || typeof orderId !== 'string' || orderId.trim().length === 0) {
    orderId = `yk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  } else {
    orderId = orderId.trim().replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);
  }

  // 6. Normalize customer details
  const customer = body.customer || body.customer_details || {};
  
  // Format phone: must be valid 10 digits for Indian numbers
  let phone = String(customer.phone || customer.customer_phone || '').trim().replace(/[^0-9]/g, '');
  if (phone.length > 10 && phone.startsWith('91')) {
    phone = phone.slice(2);
  }
  if (!phone || phone.length < 10) {
    phone = '9999999999'; // Safe sandbox fallback if not supplied
  } else if (phone.length > 10) {
    phone = phone.slice(-10);
  }

  const firstName = customer.firstName || '';
  const lastName = customer.lastName || '';
  const fullName = customer.name || customer.customer_name || `${firstName} ${lastName}`.trim() || 'Guest Customer';
  const customerName = fullName.substring(0, 50);

  const email = (customer.email || customer.customer_email || 'guest@ykmensfashion.com').trim().substring(0, 100);

  let customerId = customer.id || customer.customerId || customer.customer_id;
  if (!customerId || typeof customerId !== 'string') {
    customerId = `cust_${phone}`;
  } else {
    customerId = customerId.trim().replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);
  }
  if (customerId.length < 3) {
    customerId = `cust_${Date.now()}`;
  }

  // 7. Build Cashfree Orders API request payload
  const cashfreePayload = {
    order_id: orderId,
    order_amount: orderAmount,
    order_currency: orderCurrency,
    customer_details: {
      customer_id: customerId,
      customer_name: customerName,
      customer_email: email,
      customer_phone: phone,
    },
  };

  // Optional return_url for redirect after payment
  const returnUrl = body.returnUrl || body.return_url || (body.order_meta && body.order_meta.return_url);
  if (returnUrl && typeof returnUrl === 'string') {
    cashfreePayload.order_meta = {
      return_url: returnUrl,
    };
  }

  if (body.order_note || body.note) {
    cashfreePayload.order_note = String(body.order_note || body.note).substring(0, 200);
  }

  // 8. Invoke Cashfree Sandbox API
  try {
    const cfResponse = await fetch(CASHFREE_SANDBOX_ORDERS_URL, {
      method: 'POST',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': CASHFREE_API_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cashfreePayload),
      signal: AbortSignal.timeout(15000),
    });

    const responseData = await cfResponse.json().catch(() => null);

    // Handle upstream Cashfree errors safely without revealing credentials
    if (!cfResponse.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: responseData?.message || 'Cashfree order creation failed',
          code: responseData?.code || 'CASHFREE_API_ERROR',
          type: responseData?.type || 'api_error',
        }),
        {
          status: cfResponse.status >= 400 && cfResponse.status < 600 ? cfResponse.status : 502,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // 9. Return session details and order metadata to frontend
    return new Response(
      JSON.stringify({
        success: true,
        order_id: responseData.order_id,
        cf_order_id: responseData.cf_order_id,
        payment_session_id: responseData.payment_session_id,
        order_amount: responseData.order_amount,
        order_currency: responseData.order_currency,
        order_status: responseData.order_status,
        environment: 'sandbox',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (err) {
    const isTimeout = err.name === 'TimeoutError';
    return new Response(
      JSON.stringify({
        success: false,
        error: isTimeout ? 'Gateway Timeout' : 'Bad Gateway',
        message: isTimeout
          ? 'Timed out connecting to Cashfree payment gateway.'
          : 'Unable to reach Cashfree payment service.',
      }),
      {
        status: isTimeout ? 504 : 502,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
}
