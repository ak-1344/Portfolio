"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun, Terminal, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
  { name: "Certifications", href: "/certifications" },
  { name: "NOW", href: "/now" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 font-mono">
            <Terminal className="h-5 w-5" />
            <span className="font-bold">ak@dev:~$</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "font-mono text-sm transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary border-b border-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Theme toggle (desktop only) */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="font-mono hidden md:inline-flex"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Admin (desktop only) */}
            {/* <Link
              href="/admin"
              className="hidden md:inline font-mono text-xs text-muted-foreground hover:text-primary"
            >
              &gt;_
            </Link> */}

            {/* Mobile Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-44 p-4 font-mono backdrop-blur-md bg-background/95 border border-border/50">
                <div className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-sm transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <div className="border-t pt-3 mt-2">
                    <Button
                      variant="ghost"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="w-full justify-start text-sm"
                    >
                      {theme === "dark" ? (
                        <>
                          <Sun className="h-4 w-4 mr-2" /> Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="h-4 w-4 mr-2" /> Dark Mode
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  )
}
