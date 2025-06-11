import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Terminal, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Terminal className="h-10 w-10 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="font-mono text-6xl font-bold text-primary">404</h1>
            <h2 className="font-mono text-2xl font-semibold">Command not found</h2>
          </div>

          <div className="font-mono text-muted-foreground space-y-1">
            <p>The page you're looking for isn't deployed yet...</p>
            <div className="bg-muted p-4 rounded-lg text-left max-w-md mx-auto">
              <span className="text-primary">$</span> wanna_build_it --with_ak?
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="font-mono">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="font-mono">
            <Link href="/contact">Suggest a Feature</Link>
          </Button>
        </div>

        <div className="font-mono text-xs text-muted-foreground">
          <p>Error 404: Page not found in current directory</p>
          <p>Try checking the URL or navigate back to safety</p>
        </div>
      </div>
    </div>
  )
}
