"use client"

import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { Button } from "@repo/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { useState } from "react"
import { resetApolloClient } from "@/lib/apollo-client"
import { signInWithSupabase, signOutFromSupabase, supabase } from "@/lib/supabase"

// Type definitions for GraphQL responses (using snake_case to match Supabase schema)
interface ProjectNode {
  id: string
  name: string
  description: string
  created_at: string
}

interface AssetNode {
  id: string
  name: string
  workflow_status: string
  asset_type: string
}

interface ProjectsQueryResult {
  projectsCollection: {
    edges: Array<{ node: ProjectNode }>
  } | null
}

interface AssetsQueryResult {
  assetsCollection: {
    edges: Array<{ node: AssetNode }>
  } | null
}

// Test query to fetch projects
const GET_PROJECTS = gql`
  query TestGetProjects {
    projectsCollection(first: 10) {
      edges {
        node {
          id
          name
          description
          created_at
        }
      }
    }
  }
`

// Test query to fetch assets
const GET_ASSETS = gql`
  query TestGetAssets {
    assetsCollection(first: 10) {
      edges {
        node {
          id
          name
          workflow_status
          asset_type
        }
      }
    }
  }
`

function ProjectsQuery() {
  const { data, loading, error, refetch } = useQuery<ProjectsQueryResult>(GET_PROJECTS, {
    fetchPolicy: "network-only",
  })

  if (loading) return <p className="text-muted-foreground">Loading projects...</p>
  if (error) return <p className="text-destructive">Error: {error.message}</p>

  const projects = data?.projectsCollection?.edges ?? []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Projects ({projects.length})</h3>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Refetch
        </Button>
      </div>
      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects found</p>
      ) : (
        <ul className="space-y-2">
          {projects.map(({ node }) => (
            <li key={node.id} className="rounded border p-3">
              <p className="font-medium">{node.name}</p>
              <p className="text-sm text-muted-foreground">{node.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function AssetsQuery() {
  const { data, loading, error, refetch } = useQuery<AssetsQueryResult>(GET_ASSETS, {
    fetchPolicy: "network-only",
  })

  if (loading) return <p className="text-muted-foreground">Loading assets...</p>
  if (error) return <p className="text-destructive">Error: {error.message}</p>

  const assets = data?.assetsCollection?.edges ?? []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Assets ({assets.length})</h3>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Refetch
        </Button>
      </div>
      {assets.length === 0 ? (
        <p className="text-muted-foreground">No assets found</p>
      ) : (
        <ul className="space-y-2">
          {assets.map(({ node }) => (
            <li key={node.id} className="rounded border p-3">
              <p className="font-medium">{node.name}</p>
              <p className="text-sm text-muted-foreground">
                Status: {node.workflow_status} | Type: {node.asset_type}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function TestGraphQLPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check initial auth state
  useState(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session)
    })
  })

  const handleSignIn = async () => {
    setIsLoading(true)
    setAuthError(null)
    try {
      await signInWithSupabase(email, password)
      setIsAuthenticated(true)
      resetApolloClient() // Reset Apollo cache after auth change
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Sign in failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOutFromSupabase()
      setIsAuthenticated(false)
      resetApolloClient()
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">GraphQL Connection Test</h1>
        <p className="text-muted-foreground">Test the Supabase GraphQL API connection</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supabase Authentication</CardTitle>
          <CardDescription>
            Sign in with your Supabase credentials to test authenticated queries
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-green-600">Authenticated with Supabase</p>
              <Button onClick={handleSignOut} disabled={isLoading} variant="outline">
                {isLoading ? "Signing out..." : "Sign Out"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                />
              </div>
              {authError && <p className="text-sm text-destructive">{authError}</p>}
              <Button onClick={handleSignIn} disabled={isLoading || !email || !password}>
                {isLoading ? "Signing in..." : "Sign In with Supabase"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Projects Query</CardTitle>
            <CardDescription>Test fetching projects from GraphQL</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectsQuery />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assets Query</CardTitle>
            <CardDescription>Test fetching assets from GraphQL</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetsQuery />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
