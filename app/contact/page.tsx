"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Github, Linkedin, Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { isValidEmail } from "@/lib/helpers"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset status
    setSubmitStatus("idle")
    setErrorMessage("")

    // Validation
    if (!formData.name.trim()) {
      setSubmitStatus("error")
      setErrorMessage("Please enter your name")
      return
    }
    if (!isValidEmail(formData.email)) {
      setSubmitStatus("error")
      setErrorMessage("Please enter a valid email address")
      return
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setSubmitStatus("error")
      setErrorMessage("Message must be at least 10 characters long")
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.reason || null,
            message: formData.message.trim(),
            status: "unread"
          }
        ])

      if (error) {
        console.error("Supabase error:", error)
        throw error
      }

      setSubmitStatus("success")
      setFormData({ name: "", email: "", reason: "", message: "" })
    } catch (error: any) {
      console.error("Error submitting contact form:", error)
      setSubmitStatus("error")
      setErrorMessage(error?.message || "Failed to send message. Please try again or email directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left Side - Contact Form */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="font-mono text-3xl md:text-4xl font-bold">Get In Touch</h1>
            {/* <p className="font-mono text-muted-foreground text-base md:text-lg">Let's build something amazing together.</p> */}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Send a Message</CardTitle>
              <CardDescription className="font-mono">I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-mono">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="font-mono"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-mono">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="font-mono"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason" className="font-mono">
                    Reason (Optional)
                  </Label>
                  <Select 
                    value={formData.reason} 
                    onValueChange={(value) => handleInputChange("reason", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="font-mono">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="collaboration" className="font-mono">
                        Collaboration
                      </SelectItem>
                      <SelectItem value="job" className="font-mono">
                        Job Opportunity
                      </SelectItem>
                      <SelectItem value="feedback" className="font-mono">
                        Feedback
                      </SelectItem>
                      <SelectItem value="suggestion" className="font-mono">
                        Suggestion
                      </SelectItem>
                      <SelectItem value="other" className="font-mono">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-mono">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="font-mono min-h-[120px]"
                    placeholder="Tell me about your project or idea..."
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <p className="font-mono text-sm">Message sent successfully! I'll get back to you soon.</p>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <p className="font-mono text-sm">{errorMessage}</p>
                  </div>
                )}

                <Button type="submit" className="w-full font-mono" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Contact Info & Quote */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Connect With Me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <a
                  href="mailto:adityakhatkar97.3@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors font-mono"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">adityakhatkar97.3@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://github.com/ak-1344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors font-mono"
                >
                  <Github className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">GitHub</div>
                    <div className="text-sm text-muted-foreground">@ak-1344</div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/aditya1344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors font-mono"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-sm text-muted-foreground">Aditya</div>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <blockquote className="font-mono text-sm leading-relaxed">
                <p className="mb-4">
                  "The best way to predict the future is to build it. Every great system starts with a simple idea and
                  grows through iteration, collaboration, and relentless improvement."
                </p>
                <footer className="text-muted-foreground">— My approach to development</footer>
              </blockquote>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle className="font-mono">Response Time</CardTitle>
            </CardHeader>
            <CardContent className="font-mono text-sm space-y-2">
              <div className="flex justify-between">
                <span>General inquiries:</span>
                <span className="text-primary">24-48 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Collaboration requests:</span>
                <span className="text-primary">1-2 days</span>
              </div>
              <div className="flex justify-between">
                <span>Job opportunities:</span>
                <span className="text-primary">2-3 days</span>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  )
}
