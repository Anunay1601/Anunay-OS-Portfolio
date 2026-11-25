"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Linkedin,
  Github,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error || "Failed to send message. Please try again."
        );
      }

      setSubmitted(true);
      // Reset form data on successful delivery
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        honeypot: "",
      });
    } catch (err: any) {
      // Preserve form data on failure and display clear error message
      setErrorMessage(
        err?.message || "An unexpected error occurred while transmitting your message."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage(null);
  };

  return (
    <div className="h-full flex flex-col space-y-4 font-sans select-none">
      <div className="border-b border-border/60 pb-3 shrink-0">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Mail className="w-4 h-4 text-accent-blue" />
          <span>Direct Communication & Network Profiles</span>
        </h3>
        <p className="text-xs text-muted-foreground">
          Reach out via email, phone, or connect directly on professional networks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto pr-1 no-scrollbar">
        {/* Direct Contact Details & Professional Links */}
        <div className="space-y-3">
          {/* Contact Info Card */}
          <div className="p-4 rounded-apple-lg border border-border/80 bg-surface/60 space-y-3 shadow-sm">
            <h4 className="text-xs font-mono font-bold uppercase text-accent-blue tracking-wider">
              Contact Specifications
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-foreground">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <Mail className="w-4 h-4 text-accent-blue shrink-0" />
                  <a href={`mailto:${profileData.email}`} className="hover:underline font-mono truncate">
                    {profileData.email}
                  </a>
                </div>
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors"
                >
                  Email
                </a>
              </div>

              <div className="flex items-center justify-between text-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent-blue shrink-0" />
                  <span className="font-mono">+91 {profileData.phone}</span>
                </div>
                <a
                  href={`tel:+91${profileData.phone}`}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  Call
                </a>
              </div>

              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-4 h-4 text-accent-blue shrink-0" />
                <span className="font-mono">{profileData.location}</span>
              </div>
            </div>
          </div>

          {/* LinkedIn Profile Redirect Card */}
          <div className="p-4 rounded-apple-lg border border-accent-blue/30 bg-accent-blue/5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-apple-md bg-accent-blue text-white flex items-center justify-center shrink-0">
                  <Linkedin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">LinkedIn Profile</h4>
                  <p className="text-[10px] font-mono text-muted-foreground">Anunay Chhapre</p>
                </div>
              </div>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-apple-md text-xs font-mono font-semibold bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
              >
                <span>Connect</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* GitHub Profile Redirect Card */}
          <div className="p-4 rounded-apple-lg border border-border/80 bg-surface/60 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-apple-md bg-foreground/10 border border-border text-foreground flex items-center justify-center shrink-0">
                  <Github className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">GitHub Profile</h4>
                  <p className="text-[10px] font-mono text-muted-foreground">@Anunay1601</p>
                </div>
              </div>
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-apple-md text-xs font-mono font-semibold bg-surface-hover hover:bg-surface-active text-foreground border border-border transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>View GitHub</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="p-4 rounded-apple-lg border border-border/80 bg-surface/60 space-y-3 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-accent-blue tracking-wider mb-2">
              Send Direct Message
            </h4>
            {submitted ? (
              <div className="p-6 text-center space-y-3 bg-emerald-500/10 border border-emerald-500/20 rounded-apple-md">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-emerald-300">
                  Message sent successfully. I&apos;ll get back to you soon.
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Thank you for reaching out. Your transmission has been dispatched to Anunay.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[11px] font-mono text-accent-blue hover:underline focus:outline-none"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                {errorMessage && (
                  <div className="p-2.5 rounded-apple-sm bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                    <span className="flex-1">{errorMessage}</span>
                  </div>
                )}

                {/* Honeypot field for bot detection */}
                <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                  <label htmlFor="contact_hp_field">Do not fill this field</label>
                  <input
                    id="contact_hp_field"
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-muted-foreground font-mono text-[10px] mb-1">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="e.g. Recruiter / Hiring Manager"
                    maxLength={100}
                    className="w-full px-3 py-2 rounded-apple-sm bg-surface border border-border/80 text-foreground focus:outline-none focus:border-accent-blue font-sans disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-muted-foreground font-mono text-[10px] mb-1">
                    Your Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="name@company.com"
                    maxLength={254}
                    className="w-full px-3 py-2 rounded-apple-sm bg-surface border border-border/80 text-foreground focus:outline-none focus:border-accent-blue font-sans disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-muted-foreground font-mono text-[10px] mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="e.g. Project Discussion / Job Opportunity"
                    maxLength={150}
                    className="w-full px-3 py-2 rounded-apple-sm bg-surface border border-border/80 text-foreground focus:outline-none focus:border-accent-blue font-sans disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-muted-foreground font-mono text-[10px] mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Hello Anunay, we would love to discuss an opportunity..."
                    maxLength={5000}
                    className="w-full px-3 py-2 rounded-apple-sm bg-surface border border-border/80 text-foreground focus:outline-none focus:border-accent-blue font-sans disabled:opacity-50"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
