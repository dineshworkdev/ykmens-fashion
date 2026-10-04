/**
 * Cloudflare Full-Stack Worker Entrypoint for YK Men's Fashion
 * 
 * - Serves existing React/Vite static assets from `./dist` with SPA fallback.
 * - Handles server-side API routes under `/api/*`.
 * - Preserves existing client-side routes, styling, animations, and frontend features.
 */

import { handleCreateCashfreeOrder } from './cashfree.js';

export default {
  /**
   * Main Worker fetch handler
   * @param {Request} request
   * @param {Record<string, any>} env
   * @param {ExecutionContext} ctx
   * @returns {Promise<Response>}
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Server-side API routing (/api/*)
    if (url.pathname.startsWith('/api/')) {
      return handleApiRequest(request, env, ctx, url);
    }

    // 2. Serve static assets via Cloudflare Assets binding
    if (env.ASSETS) {
      try {
        const response = await env.ASSETS.fetch(request);

        // Fallback for SPA routing if an unmatched GET route returns 404
        if (response.status === 404 && request.method === 'GET' && !url.pathname.includes('.')) {
          return env.ASSETS.fetch(new Request(new URL('/', request.url), request));
        }

        return response;
      } catch (err) {
        console.error('Static asset serving error:', err);
        return new Response('Internal Server Error', { status: 500 });
      }
    }

    return new Response('Static assets binding (ASSETS) is not available.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};

/**
 * Server-side API router
 * @param {Request} request
 * @param {Record<string, any>} env
 * @param {ExecutionContext} ctx
 * @param {URL} url
 * @returns {Promise<Response>}
 */
async function handleApiRequest(request, env, ctx, url) {
  const origin = request.headers.get('Origin') || '*';

  // Common CORS headers for cross-origin or local dev testing
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, x-api-version',
    'Access-Control-Max-Age': '86400',
  };

  // Preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Normalize path by stripping trailing slashes for consistent matching
  const pathname = url.pathname.replace(/\/+$/, '') || '/';

  // API Health Check
  if (pathname === '/api/health') {
    return new Response(
      JSON.stringify({
        status: 'healthy',
        service: 'yk-mens-fashion-worker',
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }

  // Cashfree Sandbox Order Creation
  if (pathname === '/api/cashfree/create-order') {
    return handleCreateCashfreeOrder(request, env, ctx, corsHeaders);
  }

  // Placeholder for future payment / verification endpoints
  if (pathname.startsWith('/api/payment') || pathname.startsWith('/api/cashfree')) {
    return new Response(
      JSON.stringify({
        message: 'Endpoint recognized. Additional payment services will be enabled in the next step.',
      }),
      {
        status: 501,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }

  // 404 for unknown API endpoints
  return new Response(
    JSON.stringify({
      error: 'Not Found',
      message: `Endpoint ${url.pathname} not found on this Worker`,
    }),
    {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    }
  );
}
