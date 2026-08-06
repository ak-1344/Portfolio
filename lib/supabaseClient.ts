// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
const SUPABASE_DISABLED_MESSAGE =
  'Supabase is disabled because NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.'
const SHOULD_WARN_ABOUT_SUPABASE = process.env.NODE_ENV !== 'production'

const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

function warnSupabaseDisabledOnce() {
  if (!SHOULD_WARN_ABOUT_SUPABASE) {
    return
  }

  const globalScope = globalThis as typeof globalThis & {
    __portfolioSupabaseWarningShown__?: boolean
  }

  if (!globalScope.__portfolioSupabaseWarningShown__) {
    console.warn(SUPABASE_DISABLED_MESSAGE)
    globalScope.__portfolioSupabaseWarningShown__ = true
  }
}

function createFallbackQueryBuilder() {
  const state = {
    data: [] as unknown[] | null,
    error: null as Error | null,
  }

  const builder: any = new Proxy(
    {},
    {
      get(_target, property) {
        if (property === 'then') {
          return (onfulfilled?: any, onrejected?: any) =>
            Promise.resolve({ data: state.data, error: state.error }).then(onfulfilled, onrejected)
        }

        if (property === 'catch') {
          return (onrejected?: any) =>
            Promise.resolve({ data: state.data, error: state.error }).catch(onrejected)
        }

        if (property === 'finally') {
          return (onfinally?: any) =>
            Promise.resolve({ data: state.data, error: state.error }).finally(onfinally)
        }

        if (property === 'single' || property === 'maybeSingle') {
          return () => {
            state.data = null
            return builder
          }
        }

        if (property === 'insert' || property === 'upsert' || property === 'update' || property === 'delete') {
          return () => {
            state.data = null
            state.error = new Error(SUPABASE_DISABLED_MESSAGE)
            return builder
          }
        }

        return () => builder
      },
    }
  )

  return builder
}

function createFallbackSupabaseClient() {
  warnSupabaseDisabledOnce()

  return {
    from() {
      return createFallbackQueryBuilder()
    },
  }
}

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)
  : createFallbackSupabaseClient()
