"use client"

import { useEffect, useState } from "react"
import { CertificationCard } from "./certification-card"
import { supabase } from "@/lib/supabaseClient"
import type { Certification } from "@/types"
import { Award } from "lucide-react"

export function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true })
        .order("issue_date", { ascending: false })

      if (error) throw error
      setCertifications(data || [])
    } catch (error) {
      console.error("Error fetching certifications:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 space-y-8">
        <div className="flex items-center gap-3 mb-8">
          <Award className="h-8 w-8 text-primary" />
          <h2 className="font-mono text-4xl font-bold">Certifications</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton-card h-64" />
          ))}
        </div>
      </section>
    )
  }

  if (certifications.length === 0) {
    return null // Don't show section if no certifications
  }

  return (
    <section className="py-16 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <Award className="h-8 w-8 text-primary" />
        <h2 className="font-mono text-4xl font-bold">Certifications</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((certification) => (
          <CertificationCard key={certification.id} certification={certification} />
        ))}
      </div>
    </section>
  )
}
