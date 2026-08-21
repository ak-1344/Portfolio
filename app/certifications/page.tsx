"use client"

import { useState, useEffect } from "react"
import { CertificationCard } from "@/components/certification-card"
import { supabase } from "@/lib/supabaseClient"
import type { Certification } from "@/types"
import { Award, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [filteredCerts, setFilteredCerts] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    fetchCertifications()
  }, [])

  useEffect(() => {
    filterCertifications()
  }, [certifications, statusFilter])

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
      setFilteredCerts(data || [])
    } catch (error) {
      console.error("Error fetching certifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterCertifications = () => {
    let filtered = [...certifications]

    if (statusFilter === "active") {
      filtered = filtered.filter(cert => 
        cert.never_expires || 
        !cert.expiry_date || 
        new Date(cert.expiry_date) >= new Date()
      )
    } else if (statusFilter === "expired") {
      filtered = filtered.filter(cert => 
        !cert.never_expires && 
        cert.expiry_date && 
        new Date(cert.expiry_date) < new Date()
      )
    }

    setFilteredCerts(filtered)
  }

  const activeCerts = certifications.filter(cert => 
    cert.never_expires || 
    !cert.expiry_date || 
    new Date(cert.expiry_date) >= new Date()
  ).length

  const expiredCerts = certifications.filter(cert => 
    !cert.never_expires && 
    cert.expiry_date && 
    new Date(cert.expiry_date) < new Date()
  ).length

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Award className="h-10 w-10 text-primary" />
            <h1 className="font-mono text-4xl font-bold">Certifications</h1>
          </div>
          <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card h-80" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (certifications.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Award className="h-10 w-10 text-primary" />
            <h1 className="font-mono text-4xl font-bold">Certifications</h1>
          </div>
          <div className="text-center py-16">
            <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="font-mono text-muted-foreground text-lg">
              No certifications available at the moment.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="space-y-8 md:space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            <h1 className="font-mono text-3xl md:text-4xl font-bold">Certifications</h1>
          </div>
          <p className="font-mono text-muted-foreground text-base md:text-lg">
            Professional certifications and credentials showcasing my expertise and continuous learning.
          </p>
        </div>

        {/* Stats & Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-6 font-mono text-sm">
            <div>
              <span className="text-muted-foreground">Total: </span>
              <span className="font-semibold">{certifications.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Active: </span>
              <span className="font-semibold text-green-600">{activeCerts}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Expired: </span>
              <span className="font-semibold text-red-600">{expiredCerts}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] font-mono">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="font-mono">All Certifications</SelectItem>
                <SelectItem value="active" className="font-mono">Active Only</SelectItem>
                <SelectItem value="expired" className="font-mono">Expired Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Certifications Grid */}
        {filteredCerts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-mono text-muted-foreground">
              No certifications match the selected filter.
            </p>
            <Button
              variant="outline"
              className="font-mono mt-4"
              onClick={() => setStatusFilter("all")}
            >
              Show All
            </Button>
          </div>
        ) : (
          <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCerts.map((certification) => (
              <CertificationCard key={certification.id} certification={certification} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
