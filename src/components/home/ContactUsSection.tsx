import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const ContactUsSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const isVisible = entry?.isIntersecting;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-12 ${isVisible ? 'opacity-100 animate-text-reveal' : 'opacity-0'}`}>
          <span className="font-semibold tracking-widest text-sm mb-3 block" style={{ color: '#4e3779' }}>
            GET IN TOUCH
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-primary-dark mb-4">
            Contact Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form - 2 columns */}
          <div className={`lg:col-span-2 ${isVisible ? 'opacity-100 animate-slide-in-left' : 'opacity-0'}`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-primary-dark mb-2 tracking-wider uppercase">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 outline-none transition-all duration-250"
                    style={{ transition: 'border-color 0.25s' }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#e3261d'}
                    onBlur={(e) => e.currentTarget.style.borderColor = ''}
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-primary-dark mb-2 tracking-wider uppercase">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 outline-none transition-all duration-250"
                    style={{ transition: 'border-color 0.25s' }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#e3261d'}
                    onBlur={(e) => e.currentTarget.style.borderColor = ''}
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-primary-dark mb-2 tracking-wider uppercase">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 outline-none transition-all duration-250"
                    style={{ transition: 'border-color 0.25s' }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#e3261d'}
                    onBlur={(e) => e.currentTarget.style.borderColor = ''}
                    placeholder="+968 9803 6952"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-primary-dark mb-2 tracking-wider uppercase">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 outline-none transition-all duration-250"
                    style={{ transition: 'border-color 0.25s' }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#e3261d'}
                    onBlur={(e) => e.currentTarget.style.borderColor = ''}
                  >
                    <option value="">Select topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="booking">Tour Booking</option>
                    <option value="mice">MICE Events</option>
                    <option value="fit">FIT Packages</option>
                    <option value="group">Group Tours</option>
                    <option value="wedding">Wedding Planning</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-primary-dark mb-2 tracking-wider uppercase">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 focus:border-primary-orange outline-none transition-all duration-250 resize-none"
                  placeholder="Tell us about your travel plans..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary text-base py-3 px-8 group"
              >
                Send Message
                <svg className="w-4 h-4 ml-2 inline-block transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

          {/* Contact Info - 1 column */}
          <div className={`${isVisible ? 'opacity-100 animate-slide-in-right' : 'opacity-0'}`}>
            {/* Phone */}
            <div className="mb-6 pb-6 border-b border-neutral-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center" style={{ backgroundColor: '#e3261d' }}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary-dark mb-1">Phone</h4>
                  <p className="text-neutral-600 text-sm">+968 9803 6952</p>
                  <p className="text-neutral-600 text-sm">+968 9876 5432</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mb-6 pb-6 border-b border-neutral-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center" style={{ backgroundColor: '#4e3779' }}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary-dark mb-1">Email</h4>
                  <p className="text-neutral-600 text-sm">salessupport@almahaholidays.com</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mb-6 pb-6 border-b border-neutral-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center" style={{ backgroundColor: '#e3261d' }}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary-dark mb-1">Address</h4>
                  <p className="text-neutral-600 text-sm">Al Khuwair, Muscat</p>
                  <p className="text-neutral-600 text-sm">Sultanate of Oman</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-primary-dark text-white p-6">
              <h4 className="font-display text-lg font-bold mb-4">Business Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">Sun - Thu</span>
                  <span>8 AM - 6 PM</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-2">
                  <span className="font-semibold">Saturday</span>
                  <span>9 AM - 2 PM</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-2">
                  <span className="font-semibold">Friday</span>
                  <span style={{ color: '#e3261d' }}>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Map */}
        <div className={`w-full h-[300px] overflow-hidden border-2 border-neutral-200 ${isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.4581661625643!2d58.355419299999994!3d23.587896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91f8c9e2bbb84f%3A0xd679d3cf1dcdb742!2sAl%20Maha%20Rent%20A%20Car%20(Al%20Hajiry%20Group)!5e0!3m2!1sen!2sin!4v1772450459508!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Al Maha Tourism Location"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
