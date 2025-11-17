"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"

export default function TestContactPage() {
  const [testResult, setTestResult] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setTestResult("Testing Supabase connection...")

    try {
      // Test 1: Check if we can connect
      const { data, error } = await supabase
        .from("contact_messages")
        .select("count")
        .limit(1)

      if (error) {
        setTestResult(`❌ Connection Error: ${error.message}\n\nDetails: ${JSON.stringify(error, null, 2)}`)
        return
      }

      setTestResult("✅ Connection successful!\n\n")

      // Test 2: Try to insert a test message
      const testMessage = {
        name: "Test User",
        email: "test@example.com",
        subject: "Test Subject",
        message: "This is a test message from the contact form",
        status: "unread" as const
      }

      const { data: insertData, error: insertError } = await supabase
        .from("contact_messages")
        .insert([testMessage])
        .select()

      if (insertError) {
        setTestResult(prev => prev + `❌ Insert Error: ${insertError.message}\n\nDetails: ${JSON.stringify(insertError, null, 2)}\n\nThis likely means RLS policies need to be configured.`)
        return
      }

      setTestResult(prev => prev + `✅ Insert successful!\n\nInserted data: ${JSON.stringify(insertData, null, 2)}`)

    } catch (error: any) {
      setTestResult(`❌ Unexpected Error: ${error.message}\n\n${JSON.stringify(error, null, 2)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="font-mono text-3xl font-bold">Supabase Contact Form Test</h1>
        
        <Button onClick={testConnection} disabled={loading} className="font-mono">
          {loading ? "Testing..." : "Test Connection & Insert"}
        </Button>

        {testResult && (
          <pre className="p-4 bg-muted rounded-lg font-mono text-xs overflow-auto max-h-96">
            {testResult}
          </pre>
        )}

        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="font-mono text-sm">
            <strong>Note:</strong> If you see an RLS policy error, you need to enable public INSERT access on the contact_messages table in Supabase.
          </p>
        </div>

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg space-y-2">
          <p className="font-mono text-sm font-bold">To fix RLS policy issues:</p>
          <ol className="font-mono text-xs list-decimal list-inside space-y-1">
            <li>Go to Supabase Dashboard → Authentication → Policies</li>
            <li>Select the "contact_messages" table</li>
            <li>Add a new policy:</li>
          </ol>
          <pre className="p-2 bg-black/50 rounded text-xs mt-2">
{`-- Enable INSERT for anonymous users
CREATE POLICY "Allow public insert on contact_messages"
ON contact_messages
FOR INSERT
TO public
WITH CHECK (true);`}
          </pre>
        </div>
      </div>
    </div>
  )
}
