"use client"

import { useState, useRef, useEffect } from "react"
import { X, Terminal as TerminalIcon, Minimize2, Move } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface TerminalLine {
  type: "command" | "output" | "error" | "help" | "directory"
  content: string
}

interface FileSystem {
  [key: string]: {
    type: "file" | "directory"
    content?: string
    children?: string[]
    url?: string
  }
}

interface Position {
  x: number
  y: number
}

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to AK Terminal v1.0" },
    { type: "output", content: "Type 'help' for available commands" },
    { type: "output", content: "" },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [currentDirectory, setCurrentDirectory] = useState("~")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
  const [tempFileSystem, setTempFileSystem] = useState<FileSystem>({})
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Define file system structure
  const baseFileSystem: FileSystem = {
    "~": {
      type: "directory",
      children: ["pages", "resume", "github", "linkedin", "email", "README.md"],
    },
    "~/README.md": {
      type: "file",
      content: `AK Portfolio Terminal
=====================

Navigation Pages:
- home        : Homepage
- about       : About me
- projects    : My projects
- blogs       : Blog posts
- certifications : Certifications
- contact     : Contact form
- now         : What I'm doing now

Social Links & Files:
- resume      : View/Download resume
- github      : Open GitHub profile
- linkedin    : Open LinkedIn profile
- email       : Open email client

Commands:
- ls          : List directory contents
- pwd         : Print working directory
- cd <dir>    : Change directory
- cat <file>  : Display file contents
- mkdir <dir> : Create directory (temporary)
- touch <file>: Create file (temporary)
- clear       : Clear terminal
- help        : Show help message

Simply type a page name to navigate!`,
    },
    "~/resume": {
      type: "file",
      content: "Opening resume in new tab...",
      url: "/resume.pdf",
    },
    "~/github": {
      type: "file",
      content: "Opening GitHub profile...",
      url: "https://github.com/ak-1344",
    },
    "~/linkedin": {
      type: "file",
      content: "Opening LinkedIn profile...",
      url: "https://linkedin.com/in/your-profile",
    },
    "~/email": {
      type: "file",
      content: "Opening email client...",
      url: "mailto:your-email@example.com",
    },
    "~/pages": {
      type: "directory",
      children: ["home", "about", "projects", "blogs", "certifications", "contact", "now"],
    },
    "~/pages/home": {
      type: "directory",
      children: [],
    },
    "~/pages/about": {
      type: "directory",
      children: [],
    },
    "~/pages/projects": {
      type: "directory",
      children: [],
    },
    "~/pages/blogs": {
      type: "directory",
      children: [],
    },
    "~/pages/certifications": {
      type: "directory",
      children: [],
    },
    "~/pages/contact": {
      type: "directory",
      children: [],
    },
    "~/pages/now": {
      type: "directory",
      children: [],
    },
  }

  // Merge base file system with temporary file system
  const fileSystem: FileSystem = { ...baseFileSystem, ...tempFileSystem }

  const pages = ["home", "about", "projects", "blogs", "certifications", "contact", "now"]

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [history])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".terminal-header")) {
      setIsDragging(true)
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        setDragStart({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const terminalWidth = isMinimized ? 256 : 450
        const terminalHeight = isMinimized ? 48 : 500
        
        // Calculate new position based on mouse position minus drag offset
        let newX = e.clientX - dragStart.x
        let newY = e.clientY - dragStart.y
        
        // Constrain to viewport bounds
        const minX = 0
        const maxX = window.innerWidth - terminalWidth
        const minY = 0
        const maxY = window.innerHeight - terminalHeight
        
        newX = Math.max(minX, Math.min(maxX, newX))
        newY = Math.max(minY, Math.min(maxY, newY))
        
        setPosition({ x: newX, y: newY })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragStart, isMinimized])

  const addToHistory = (type: "command" | "output" | "error" | "help" | "directory", content: string) => {
    setHistory((prev) => [...prev, { type, content }])
  }

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim()
    if (!trimmedCommand) return

    addToHistory("command", `${currentDirectory} $ ${trimmedCommand}`)

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmedCommand])
    setHistoryIndex(-1)

    const [cmd, ...args] = trimmedCommand.split(" ")

    switch (cmd.toLowerCase()) {
      case "help":
        addToHistory("help", "Available commands:")
        addToHistory("help", "  ls              - List directory contents")
        addToHistory("help", "  pwd             - Print working directory")
        addToHistory("help", "  cd <directory>  - Change directory")
        addToHistory("help", "  cat <file>      - Display file contents")
        addToHistory("help", "  mkdir <name>    - Create directory (temporary)")
        addToHistory("help", "  touch <name>    - Create file (temporary)")
        addToHistory("help", "  clear           - Clear terminal screen")
        addToHistory("help", "  help            - Show this help message")
        addToHistory("output", "")
        addToHistory("help", "Navigation shortcuts:")
        addToHistory("help", `  ${pages.join(", ")}`)
        addToHistory("output", "")
        break

      case "ls":
        const currentDir = fileSystem[currentDirectory]
        if (currentDir && currentDir.children) {
          const items = currentDir.children.map((child) => {
            const childPath = `${currentDirectory}/${child}`.replace("~//", "~/")
            const item = fileSystem[childPath]
            return item?.type === "directory" ? `${child}/` : child
          })
          addToHistory("output", items.join("  "))
        } else {
          addToHistory("output", "")
        }
        addToHistory("output", "")
        break

      case "pwd":
        addToHistory("directory", currentDirectory)
        addToHistory("output", "")
        break

      case "cd":
        if (args.length === 0 || args[0] === "~") {
          setCurrentDirectory("~")
          addToHistory("output", "")
        } else if (args[0] === "..") {
          const parts = currentDirectory.split("/")
          if (parts.length > 1) {
            parts.pop()
            setCurrentDirectory(parts.join("/") || "~")
          }
          addToHistory("output", "")
        } else {
          const targetPath = args[0].startsWith("~/")
            ? args[0]
            : `${currentDirectory}/${args[0]}`.replace("~//", "~/")
          
          if (fileSystem[targetPath] && fileSystem[targetPath].type === "directory") {
            setCurrentDirectory(targetPath)
            addToHistory("output", "")
          } else {
            addToHistory("error", `cd: ${args[0]}: No such directory`)
            addToHistory("output", "")
          }
        }
        break

      case "cat":
        if (args.length === 0) {
          addToHistory("error", "cat: missing file operand")
          addToHistory("output", "")
        } else {
          const filePath = args[0].startsWith("~/")
            ? args[0]
            : `${currentDirectory}/${args[0]}`.replace("~//", "~/")
          
          const file = fileSystem[filePath]
          if (file && file.type === "file") {
            if (file.content) {
              file.content.split("\n").forEach((line) => {
                addToHistory("output", line)
              })
              addToHistory("output", "")
            }
            if (file.url) {
              window.open(file.url, "_blank")
            }
          } else {
            addToHistory("error", `cat: ${args[0]}: No such file`)
            addToHistory("output", "")
          }
        }
        break

      case "mkdir":
        if (args.length === 0) {
          addToHistory("error", "mkdir: missing operand")
        } else {
          const dirName = args[0]
          const newDirPath = `${currentDirectory}/${dirName}`.replace("~//", "~/")
          
          if (fileSystem[newDirPath]) {
            addToHistory("error", `mkdir: cannot create directory '${dirName}': File exists`)
          } else {
            // Add to parent's children
            const parentDir = fileSystem[currentDirectory]
            if (parentDir && parentDir.children) {
              setTempFileSystem((prev) => ({
                ...prev,
                [currentDirectory]: {
                  ...parentDir,
                  children: [...parentDir.children!, dirName],
                },
                [newDirPath]: {
                  type: "directory",
                  children: [],
                },
              }))
              addToHistory("output", "")
            }
          }
        }
        addToHistory("output", "")
        break

      case "touch":
        if (args.length === 0) {
          addToHistory("error", "touch: missing file operand")
        } else {
          const fileName = args[0]
          const newFilePath = `${currentDirectory}/${fileName}`.replace("~//", "~/")
          
          if (fileSystem[newFilePath]) {
            addToHistory("output", "") // File exists, touch updates timestamp (we just do nothing)
          } else {
            // Add to parent's children
            const parentDir = fileSystem[currentDirectory]
            if (parentDir && parentDir.children) {
              setTempFileSystem((prev) => ({
                ...prev,
                [currentDirectory]: {
                  ...parentDir,
                  children: [...parentDir.children!, fileName],
                },
                [newFilePath]: {
                  type: "file",
                  content: "",
                },
              }))
              addToHistory("output", "")
            }
          }
        }
        addToHistory("output", "")
        break

      case "clear":
        setHistory([])
        break

      default:
        // Check if it's a page name
        if (pages.includes(cmd.toLowerCase())) {
          const targetPage = cmd.toLowerCase()
          addToHistory("output", `Navigating to /${targetPage === "home" ? "" : targetPage}...`)
          addToHistory("output", "")
          setTimeout(() => {
            router.push(targetPage === "home" ? "/" : `/${targetPage}`)
          }, 300)
        } else {
          // Check if it's a file without ./ prefix
          const filePath = `${currentDirectory}/${cmd}`.replace("~//", "~/")
          const file = fileSystem[filePath]
          
          if (file && file.type === "file") {
            // Execute file
            if (file.content) {
              file.content.split("\n").forEach((line) => {
                addToHistory("output", line)
              })
            }
            if (file.url) {
              addToHistory("output", "")
              window.open(file.url, "_blank")
            }
            addToHistory("output", "")
          } else if (cmd.startsWith("./")) {
          const target = cmd.substring(2)
          
          // Check if it's a page
          if (pages.includes(target.toLowerCase())) {
            addToHistory("output", `Executing ./${target}...`)
            addToHistory("output", `Navigating to /${target === "home" ? "" : target}...`)
            addToHistory("output", "")
            setTimeout(() => {
              router.push(target === "home" ? "/" : `/${target}`)
            }, 300)
          } else {
            // Check if it's a file
            const filePath = `${currentDirectory}/${target}`.replace("~//", "~/")
            const file = fileSystem[filePath]
            
            if (file && file.type === "file") {
              addToHistory("output", `Executing ./${target}...`)
              if (file.content) {
                file.content.split("\n").forEach((line) => {
                  addToHistory("output", line)
                })
              }
              if (file.url) {
                addToHistory("output", "")
                window.open(file.url, "_blank")
              }
              addToHistory("output", "")
            } else {
              addToHistory("error", `bash: ./${target}: No such file or directory`)
              addToHistory("output", "")
            }
          }
          } else {
            addToHistory("error", `Command not found: ${cmd}. Type 'help' for available commands.`)
            addToHistory("output", "")
          }
        }
        break
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentInput)
      setCurrentInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1)
        if (newIndex === commandHistory.length - 1 && historyIndex === commandHistory.length - 1) {
          setHistoryIndex(-1)
          setCurrentInput("")
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      // Auto-complete for page names
      const matches = pages.filter((page) => page.startsWith(currentInput.toLowerCase()))
      if (matches.length === 1) {
        setCurrentInput(matches[0])
      } else if (matches.length > 1) {
        addToHistory("output", matches.join("  "))
      }
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex fixed bottom-6 right-6 z-50 items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="Open terminal"
      >
        <TerminalIcon className="w-5 h-5" />
        <span className="absolute right-full mr-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Open Terminal
        </span>
      </button>
    )
  }

  const terminalStyle: React.CSSProperties = position.x || position.y 
    ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
      }
    : {
        bottom: "24px",
        right: "24px",
      }

  return (
    <div
      ref={containerRef}
      className={cn(
        "hidden md:block fixed z-50 bg-card border border-border rounded-lg shadow-2xl",
        isMinimized ? "w-64 h-12" : "w-[450px] h-[500px]",
        isDragging ? "cursor-move transition-none" : "transition-all duration-300"
      )}
      style={terminalStyle}
      onMouseDown={handleMouseDown}
    >
      {/* Terminal Header */}
      <div className="terminal-header flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border rounded-t-lg cursor-move">
        <div className="flex items-center gap-2">
          <Move className="w-3 h-3 text-muted-foreground" />
          <TerminalIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-mono text-foreground">terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-muted rounded p-1 transition-colors"
            aria-label="Minimize terminal"
          >
            <Minimize2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => {
              setIsOpen(false)
              setPosition({ x: 0, y: 0 })
              setTempFileSystem({})
            }}
            className="hover:bg-destructive/20 rounded p-1 transition-colors"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      {!isMinimized && (
        <div className="flex flex-col h-[calc(100%-40px)]">
          {/* Output Area */}
          <div
            ref={terminalRef}
            className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-background/50 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, index) => (
              <div
                key={index}
                className={cn(
                  "mb-1",
                  line.type === "command" && "text-blue-400 font-semibold",
                  line.type === "output" && "text-green-400",
                  line.type === "error" && "text-red-400",
                  line.type === "help" && "text-yellow-400",
                  line.type === "directory" && "text-cyan-400 font-semibold"
                )}
              >
                {line.content}
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-semibold">{currentDirectory} $</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-blue-400 font-mono text-sm caret-blue-400"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
