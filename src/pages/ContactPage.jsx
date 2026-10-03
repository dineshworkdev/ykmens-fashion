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
    <div className="bg-[#241812] text-[#FAF7F2] py-10 md:py-16 min-h-[75vh]">
      <Container>
        {/* Header Breadcrumbs */}
        <div className="mb-8 pb-6 border-b border-[#3E2B21]">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C8B8AA] font-semibold mb-2">
            <Link to={ROUTES.HOME} className="hover:text-[#FAF7F2]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#FAF7F2]">Contact</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F2]">
            Get In Touch
          </h1>
          <p className="text-sm text-[#C8B8AA] mt-1 max-w-xl">
            Have questions regarding sizing, current menswear collections, or your order? We are here to assist.
          </p>
        </div>

        {/* 2-Column Split Layout on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Brand Context & Assistance Guidance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#2C1E18] border border-[#3E2B21] rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D99E84] font-bold block mb-1">
                  Customer Assistance
                </span>
                <h2 className="text-xl font-bold text-[#FAF7F2]">
                  How We Can Help
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#C8B8AA] leading-relaxed">
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#3E2B21] text-[#FAF7F2] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#FAF7F2]">Sizing & Fit Advice</h3>
                    <p className="text-xs text-[#C8B8AA] mt-0.5">
                      Need recommendations on tailored blazers, trouser cuts, or overcoats? We can help you pick the right fit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#3E2B21] text-[#FAF7F2] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#FAF7F2]">Order Inquiries</h3>
                    <p className="text-xs text-[#C8B8AA] mt-0.5">
                      Check status, update address details, or ask questions about recent order placements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#3E2B21] text-[#FAF7F2] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#FAF7F2]">Product Inquiries</h3>
                    <p className="text-xs text-[#C8B8AA] mt-0.5">
                      Learn more about fabrications, garment care, and upcoming releases across our menswear catalog.
                    </p>
                  </div>
                </div>
              </div>

              {/* Truthful Note */}
              <div className="p-4 bg-[#341F17] border border-[#3E2B21] rounded-2xl text-xs text-[#FAF7F2]">
                <p className="font-bold mb-1 text-[#D99E84]">Direct Brand Support</p>
                <p className="text-[11px] text-[#C8B8AA] leading-relaxed">
                  Inquiries submitted through this form are logged for review. In production, requests route directly to our customer support queue.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to={ROUTES.SHOP}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#FAF7F2] hover:text-[#D99E84] transition-colors"
                >
                  <span>Browse the Shop Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#2C1E18] border border-[#3E2B21] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[#FAF7F2] text-[#1D1410] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[#FAF7F2]">
                    Inquiry Received
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C8B8AA] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#FAF7F2]">{formData.name}</strong>. Your message regarding{' '}
                    <strong className="text-[#FAF7F2]">"{formData.subject}"</strong> has been logged. Our customer concierge team will review your inquiry.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 border border-[#3E2B21] rounded-xl text-xs uppercase tracking-wider font-bold text-[#FAF7F2] hover:bg-[#3E2B21] transition-colors"
                    >
                      Send Another Message
                    </button>
                    <Link
                      to={ROUTES.SHOP}
                      className="px-6 py-3 bg-[#FAF7F2] text-[#1D1410] rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-[#E8DEC8] transition-colors"
                    >
                      Return to Shop
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="pb-3 border-b border-[#3E2B21]">
                    <h2 className="text-sm uppercase tracking-widest font-bold text-[#FAF7F2]">
                      Send Us a Message
                    </h2>
                    <p className="text-xs text-[#C8B8AA] mt-0.5">
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
                        className="block text-xs uppercase tracking-wider font-semibold text-[#FAF7F2] mb-2"
                      >
                        Subject
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className="w-full px-4 py-3 bg-[#1D1410] border border-[#3E2B21] rounded-xl text-[#FAF7F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#D99E84]/30 focus:border-[#D99E84] transition-all cursor-pointer"
                      >
                        <option value="General Inquiry" className="bg-[#1D1410] text-[#FAF7F2]">General Inquiry</option>
                        <option value="Size & Fit Consultation" className="bg-[#1D1410] text-[#FAF7F2]">Size & Fit Consultation</option>
                        <option value="Order & Tracking" className="bg-[#1D1410] text-[#FAF7F2]">Order & Shipping Question</option>
                        <option value="Product Care & Fabrics" className="bg-[#1D1410] text-[#FAF7F2]">Product Care & Fabrics</option>
                        <option value="Other Feedback" className="bg-[#1D1410] text-[#FAF7F2]">Other Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#FAF7F2] mb-2"
                    >
                      Message <span className="text-[#A6445D]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Please describe how we can assist you..."
                      className={`w-full px-4 py-3 bg-[#1D1410] border rounded-xl text-[#FAF7F2] placeholder-[#C8B8AA]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#D99E84]/30 focus:border-[#D99E84] transition-all ${
                        errors.message ? 'border-[#A6445D] ring-1 ring-[#A6445D]/40' : 'border-[#3E2B21]'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-[#A6445D] font-medium flex items-center gap-1">
                        <span>•</span>
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF7F2] text-[#1D1410] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#E8DEC8] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
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
