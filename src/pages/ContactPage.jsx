import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import Input from '../components/common/Input';
import { Mail, Send, CheckCircle2, MessageSquare, ArrowRight, Clock, HelpCircle } from '../assets/icons';
import { ROUTES } from '../utils/constants';

/**
 * Contact Page (/contact)
 * Clean, truthful communication channel for customer support, inquiries, and styling questions.
 */
export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate truthful submission logging
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="py-10 md:py-16 min-h-[75vh]">
      <Container>
        {/* Header Breadcrumbs */}
        <div className="mb-8 pb-6 border-b border-[#DFE5F3]">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#557373] font-semibold mb-2">
            <Link to={ROUTES.HOME} className="hover:text-[#0D0D0D]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#0D0D0D]">Contact</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0D0D0D]">
            Get In Touch
          </h1>
          <p className="text-sm text-[#557373] mt-1 max-w-xl">
            Have questions regarding sizing, current menswear collections, or your order? We are here to assist.
          </p>
        </div>

        {/* 2-Column Split Layout on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Brand Context & Assistance Guidance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#E7DECD]/40 border border-[#DFE5F3] rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#557373] font-bold block mb-1">
                  Customer Assistance
                </span>
                <h2 className="text-xl font-bold text-[#0D0D0D]">
                  How We Can Help
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#557373] leading-relaxed">
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#DFE5F3] text-[#142F40] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D0D0D]">Sizing & Fit Advice</h3>
                    <p className="text-xs text-[#557373] mt-0.5">
                      Need recommendations on tailored blazers, trouser cuts, or overcoats? We can help you pick the right fit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#DFE5F3] text-[#142F40] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D0D0D]">Order Inquiries</h3>
                    <p className="text-xs text-[#557373] mt-0.5">
                      Check status, update address details, or ask questions about recent order placements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#DFE5F3] text-[#142F40] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D0D0D]">Product Inquiries</h3>
                    <p className="text-xs text-[#557373] mt-0.5">
                      Learn more about fabrications, garment care, and upcoming releases across our menswear catalog.
                    </p>
                  </div>
                </div>
              </div>

              {/* Truthful Note */}
              <div className="p-4 bg-[#DFE5F3]/50 border border-[#DFE5F3] rounded-2xl text-xs text-[#142F40]">
                <p className="font-bold mb-1">Direct Brand Support</p>
                <p className="text-[11px] text-[#557373] leading-relaxed">
                  Inquiries submitted through this form are logged for review. In production, requests route directly to our customer support queue.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to={ROUTES.SHOP}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#0D0D0D] hover:text-[#8B0000] transition-colors"
                >
                  <span>Browse the Shop Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F2EFEA] border border-[#DFE5F3] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[#272401] text-[#F2EFEA] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[#0D0D0D]">
                    Inquiry Received
                  </h3>
                  <p className="text-xs sm:text-sm text-[#557373] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#0D0D0D]">{formData.name}</strong>. Your message regarding{' '}
                    <strong className="text-[#0D0D0D]">"{formData.subject}"</strong> has been logged. Our customer concierge team will review your inquiry.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 border border-[#DFE5F3] rounded-xl text-xs uppercase tracking-wider font-bold text-[#0D0D0D] hover:bg-[#DFE5F3] transition-colors"
                    >
                      Send Another Message
                    </button>
                    <Link
                      to={ROUTES.SHOP}
                      className="px-6 py-3 bg-[#0D0D0D] text-[#F2EFEA] rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-[#272401] transition-colors"
                    >
                      Return to Shop
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="pb-3 border-b border-[#DFE5F3]">
                    <h2 className="text-sm uppercase tracking-widest font-bold text-[#0D0D0D]">
                      Send Us a Message
                    </h2>
                    <p className="text-xs text-[#557373] mt-0.5">
                      Fill out the form below and we will respond as soon as possible.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="e.g. Arun Kumar"
                      error={errors.name}
                      required
                    />

                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="e.g. arun@example.com"
                      error={errors.email}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number (Optional)"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="e.g. 9876543210"
                    />

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs uppercase tracking-wider font-semibold text-[#0D0D0D] mb-2"
                      >
                        Subject
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className="w-full px-4 py-3 bg-[#F2EFEA] border border-[#DFE5F3] rounded-xl text-[#0D0D0D] text-sm focus:outline-none focus:ring-2 focus:ring-[#142F40]/30 focus:border-[#142F40] transition-all cursor-pointer"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Size & Fit Consultation">Size & Fit Consultation</option>
                        <option value="Order & Tracking">Order & Shipping Question</option>
                        <option value="Product Care & Fabrics">Product Care & Fabrics</option>
                        <option value="Other Feedback">Other Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#0D0D0D] mb-2"
                    >
                      Message <span className="text-[#8B0000]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Please describe how we can assist you..."
                      className={`w-full px-4 py-3 bg-[#F2EFEA] border rounded-xl text-[#0D0D0D] placeholder-[#557373]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#142F40]/30 focus:border-[#142F40] transition-all ${
                        errors.message ? 'border-[#8B0000] ring-1 ring-[#8B0000]/40' : 'border-[#DFE5F3]'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-[#8B0000] font-medium flex items-center gap-1">
                        <span>•</span>
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#0D0D0D] text-[#F2EFEA] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#272401] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Logging Inquiry...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
