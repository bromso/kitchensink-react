import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { relayStylePagination } from "@apollo/client/utilities"
import { supabase } from "./supabase"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// HTTP Link for Supabase GraphQL
const httpLink = new HttpLink({
  uri: `${SUPABASE_URL}/graphql/v1`,
})

// Auth link to add headers (follows Supabase official docs)
const authLink = setContext(async (_, { headers }) => {
  // Get the access token from Supabase auth session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return {
    headers: {
      ...headers,
      apikey: SUPABASE_ANON_KEY,
      Authorization: session?.access_token ? `Bearer ${session.access_token}` : "",
    },
  }
})

// Create Apollo Client following Supabase official docs
export function createApolloClient() {
  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache({
      // Use nodeId for cache key generation (Supabase GraphQL pattern)
      dataIdFromObject(responseObject) {
        if ("nodeId" in responseObject) {
          return `${responseObject.nodeId}`
        }
        return undefined
      },
      // Relay-style pagination for collection fields
      typePolicies: {
        Query: {
          fields: {
            // Add relay pagination for any collection you query
            projectsCollection: relayStylePagination(),
            assetsCollection: relayStylePagination(),
            organizationsCollection: relayStylePagination(),
            assetRevisionsCollection: relayStylePagination(),
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
      query: {
        fetchPolicy: "network-only",
      },
    },
  })
}

// Singleton client for client-side usage
let apolloClient: ReturnType<typeof createApolloClient> | null = null

export function getApolloClient() {
  // Create new client for SSR
  if (typeof window === "undefined") {
    return createApolloClient()
  }

  // Reuse client on client-side
  if (!apolloClient) {
    apolloClient = createApolloClient()
  }

  return apolloClient
}

// Reset the client (useful after auth state changes)
export function resetApolloClient() {
  if (apolloClient) {
    apolloClient.clearStore()
    apolloClient = null
  }
}
