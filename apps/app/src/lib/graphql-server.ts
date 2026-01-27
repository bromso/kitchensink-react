import type { DocumentNode } from "@apollo/client"
import { print } from "graphql"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

interface GraphQLResponse<T> {
  data: T | null
  errors?: Array<{ message: string; path?: string[] }>
}

/**
 * Server-side GraphQL fetch for React Server Components
 * This bypasses Apollo Client for direct server-side fetching
 */
export async function fetchGraphQL<T>(
  query: DocumentNode,
  variables?: Record<string, unknown>,
  options?: {
    accessToken?: string
    revalidate?: number | false
  }
): Promise<{ data: T | null; error: Error | null }> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return {
      data: null,
      error: new Error("Supabase environment variables not configured"),
    }
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
    }

    if (options?.accessToken) {
      headers.Authorization = `Bearer ${options.accessToken}`
    }

    const response = await fetch(`${SUPABASE_URL}/graphql/v1`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: print(query),
        variables,
      }),
      next: {
        revalidate: options?.revalidate ?? 60, // Default 60s cache
      },
    })

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`)
    }

    const result: GraphQLResponse<T> = await response.json()

    if (result.errors?.length) {
      const errorMessage = result.errors.map((e) => e.message).join(", ")
      throw new Error(`GraphQL errors: ${errorMessage}`)
    }

    return { data: result.data, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown error"),
    }
  }
}

/**
 * Helper to extract nodes from a relay-style collection response
 */
export function extractNodes<T>(collection: { edges: Array<{ node: T }> } | null | undefined): T[] {
  if (!collection?.edges) return []
  return collection.edges.map((edge) => edge.node)
}

/**
 * Helper to get a single node from a collection (for by-ID queries)
 */
export function extractSingleNode<T>(
  collection: { edges: Array<{ node: T }> } | null | undefined
): T | null {
  if (!collection?.edges?.length) return null
  return collection.edges[0].node
}
