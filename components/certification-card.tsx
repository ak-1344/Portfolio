"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Award, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Certification } from "@/types"
import { formatDate, isCertificationExpired, getCertificationStatus } from "@/lib/helpers"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

interface CertificationCardProps {
  certification: Certification
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const isExpired = isCertificationExpired(certification)
  const status = getCertificationStatus(certification)

  return (
    <Card className={`certification-card flex h-full flex-col ${isExpired ? "opacity-75" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="font-mono text-lg leading-snug">
              <span className="flex items-start gap-2">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="line-clamp-2">{certification.name}</span>
              </span>
            </CardTitle>
            <p className="mt-1 line-clamp-2 min-h-10 font-mono text-sm text-muted-foreground">
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

      <CardContent className="flex flex-1 flex-col gap-4">
        {/* Description */}
        {certification.description && (
          <p className="line-clamp-4 min-h-20 font-mono text-sm text-muted-foreground">
            {certification.description}
          </p>
        )}

        {/* Certificate Image */}
        {certification.certificate_image && (
          <Dialog>
            <DialogTrigger asChild>
              <div className="group relative h-44 w-full cursor-pointer overflow-hidden rounded-md border transition-opacity hover:opacity-90 md:h-48">
                <Image
                  src={certification.certificate_image}
                  alt={`Certificate for ${certification.name}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                  <span className="opacity-0 group-hover:opacity-100 text-white font-mono text-sm bg-black/50 px-3 py-1 rounded-full transition-opacity">
                    View Certificate
                  </span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-background border shadow-lg">
              <DialogHeader className="p-4 border-b">
                <DialogTitle className="font-mono text-lg">{certification.name}</DialogTitle>
              </DialogHeader>
              <div className="relative w-full h-[80vh] bg-muted/20">
                <Image
                  src={certification.certificate_image}
                  alt={`Certificate for ${certification.name}`}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}

        <div className="space-y-3">
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
        </div>

        {/* Verification Link */}
        {certification.credential_url && (
          <Button
            size="sm"
            variant="outline"
            className="mt-auto w-full font-mono"
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
