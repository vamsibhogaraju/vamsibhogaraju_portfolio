import { useState, type FormEvent } from 'react'
import { useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import SectionLabel from './SectionLabel'
import { scrollTriggerDefaults } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

const contactLinks = [
  { icon: <MdEmail size={16} color="#3b82f6" />, text: 'bhogaraju67@gmail.com', href: 'mailto:bhogaraju67@gmail.com' },
  { icon: <FaLinkedin size={16} color="#3b82f6" />, text: 'linkedin.com/in/vamsibhogaraju', href: 'https://www.linkedin.com/in/vamsi-bhogaraju-35462b16a/' },
  { icon: <FaGithub size={16} color="#3b82f6" />, text: 'github.com/vamsibhogaraju', href: 'https://github.com/vamsibhogaraju' },
  { icon: <MdLocationOn size={16} color="#3b82f6" />, text: 'ON, Canada', href: null },
]

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  padding: '14px 16px',
  color: '#f1f5f9',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '14px',
  width: '100%',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  outline: 'none',
}

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      }
    )
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormState('sending')

    try {
      // TODO: Replace these with your real EmailJS credentials from https://emailjs.com
      await emailjs.send(
        'YOUR_SERVICE_ID',    // e.g. 'service_abc123'
        'YOUR_TEMPLATE_ID',   // e.g. 'template_xyz789'
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY'     // e.g. 'pk_abc123xyz'
      )
      setFormState('sent')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setFormState('idle'), 3000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setFormState('error')
      setTimeout(() => setFormState('idle'), 5000)
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#3b82f6'
    e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <section id="contact" style={{ background: '#080d14', padding: '120px 0' }}>
      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr; gap: 64px; }
        @media (min-width: 1024px) { .contact-grid { grid-template-columns: 38% 62%; } }
        .contact-input::placeholder { color: #475569; }
        .contact-link-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 12px 16px;
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .contact-link-card:hover {
          transform: translateX(4px);
          border-color: rgba(59,130,246,0.3);
        }
        .contact-send-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(59,130,246,0.3) !important;
        }
      `}</style>
      <div ref={sectionRef} className="contact-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Left */}
        <div>
          <SectionLabel number="08" label="CONTACT" />
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '44px',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#f1f5f9',
              marginTop: '12px',
              marginBottom: '24px',
            }}
          >
            Let's Build
            <br />
            Something
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px',
              color: '#94a3b8',
              lineHeight: 1.75,
              maxWidth: '340px',
              marginBottom: '40px',
            }}
          >
            Currently open to Data Analyst and Data Engineer opportunities. If your team needs
            someone who turns complexity into clarity, reach out.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {contactLinks.map((link) => {
              const inner = (
                <>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(59,130,246,0.1)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {link.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px',
                      color: '#94a3b8',
                    }}
                  >
                    {link.text}
                  </span>
                </>
              )

              return link.href ? (
                <a
                  key={link.text}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-card"
                >
                  {inner}
                </a>
              ) : (
                <div key={link.text} className="contact-link-card">
                  {inner}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right — Form */}
        <div
          style={{
            background: 'rgba(13,21,38,0.8)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            padding: '36px',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <style>{`
              .contact-form-row { display: grid; grid-template-columns: 1fr; gap: 16px; }
              @media (min-width: 640px) { .contact-form-row { grid-template-columns: 1fr 1fr; } }
            `}</style>
            <div className="contact-form-row">
              <input
                type="text"
                placeholder="Name"
                required
                className="contact-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="contact-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              required
              className="contact-input"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
            />
            <textarea
              placeholder="Message"
              rows={5}
              required
              className="contact-input"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={handleFocus as any}
              onBlur={handleBlur as any}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
            <button
              type="submit"
              disabled={formState === 'sending'}
              className="contact-send-btn"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffffff',
                background: formState === 'sent' ? '#10b981' : '#3b82f6',
                border: 'none',
                borderRadius: '8px',
                padding: '14px 40px',
                width: 'auto',
                alignSelf: 'flex-start',
                cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                opacity: formState === 'sending' ? 0.7 : 1,
                boxShadow: '0 4px 12px rgba(59,130,246,0.2)',
                transition: 'all 0.2s',
              }}
            >
              {formState === 'idle' && 'Send Message →'}
              {formState === 'sending' && 'Sending...'}
              {formState === 'sent' && '✓ Message sent!'}
              {formState === 'error' && 'Failed to send. Try again.'}
            </button>
            {formState === 'error' && (
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  color: '#ef4444',
                  marginTop: '8px',
                }}
              >
                Something went wrong. Please email directly at bhogaraju67@gmail.com
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
