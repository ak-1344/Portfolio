"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Award, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Certification } from "@/types"
import { formatDate, isCertificationExpired, getCertificationStatus } from "@/lib/helpers"

interface CertificationCardProps {
  certification: Certification
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const isExpired = isCertificationExpired(certification)
  const status = getCertificationStatus(certification)

  return (
    <Card className={`certification-card ${isExpired ? "opacity-75" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="font-mono text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              {certification.name}
            </CardTitle>
            <p className="font-mono text-sm text-muted-foreground mt-1">
              {certification.issuing_organization}
            </p>
          </div>
          {status && (
            <Badge className={status.className}>
              {status.label}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        {certification.description && (
          <p className="font-mono text-sm preserve-whitespace text-muted-foreground">
            {certification.description}
          </p>
        )}

        {/* Dates */}
        <div className="flex flex-col gap-2 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>Issued: {formatDate(certification.issue_date)}</span>
          </div>
          {certification.expiry_date && (
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span className={isExpired ? "text-destructive" : ""}>
                {isExpired ? "Expired" : "Expires"}: {formatDate(certification.expiry_date)}
              </span>
            </div>
          )}
          {!certification.expiry_date && certification.never_expires && (
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-green-600">Never Expires</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {certification.skills && certification.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {certification.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="font-mono text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* Credential ID */}
        {certification.credential_id && (
          <div className="font-mono text-xs text-muted-foreground">
            <span className="font-semibold">ID:</span> {certification.credential_id}
          </div>
        )}

        {/* Verification Link */}
        {certification.credential_url && (
          <Button
            size="sm"
            variant="outline"
            className="font-mono w-full"
            asChild
          >
            <a
              href={certification.credential_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-3.5 w-3.5 mr-2" />
              Verify Credential
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
