import { FC } from 'react'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'src/apollo'
import '../styles/globals.css'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const client = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
