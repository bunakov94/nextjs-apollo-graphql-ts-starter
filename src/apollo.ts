import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { useMemo } from 'react'
import { SchemaLink } from '@apollo/client/link/schema'

let apolloClient: ApolloClient<NormalizedCacheObject>

export type ApolloClientType = typeof apolloClient

function createIsomorphicLink(): ApolloLink | SchemaLink {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema')
    const { schema } = require('./schema')
    return new SchemaLink({ schema })
  } else {
    const { HttpLink } = require('@apollo/client/link/http')
    return new HttpLink({ uri: '/api/graphql' })
  }
}

function createApolloClient(): ApolloClientType {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphicLink(),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(initialState = {}): ApolloClientType {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }

  if (typeof window === 'undefined') return _apolloClient
  apolloClient = apolloClient ?? _apolloClient

  return apolloClient
}

export function useApollo(initialState: NormalizedCacheObject): ApolloClientType {
  return useMemo(() => initializeApollo(initialState), [initialState])
}
