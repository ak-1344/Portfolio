'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, ExternalLink } from 'lucide-react'

interface PDFViewerProps {
  pdfUrl: string
  isOpen: boolean
  onClose: () => void
}

export function PDFViewer({ pdfUrl, isOpen, onClose }: PDFViewerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] h-[95vh] p-0 gap-0 flex flex-col">
        <DialogHeader className="flex-shrink-0 px-4 md:px-6 py-3 border-b">
          <div className="flex items-center justify-between gap-2 pr-8">
            <DialogTitle className="font-mono text-base">Resume</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="font-mono h-9"
              >
                <a href={pdfUrl} download="Aditya_Resume.pdf">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="font-mono h-9 hidden sm:flex"
              >
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open
                </a>
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 min-h-0 p-4">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            className="w-full h-full border rounded-lg shadow-inner"
            title="Resume PDF Viewer"
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ResumeButtonProps {
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export function ResumeButton({ className, variant = 'outline', size = 'default' }: ResumeButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pdfUrl = '/resume.pdf' // Make sure to add your resume.pdf to the public folder

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(true)}
        className={className}
      >
        Resume
      </Button>
      <PDFViewer
        pdfUrl={pdfUrl}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
