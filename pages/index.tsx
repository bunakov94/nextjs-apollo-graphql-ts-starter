import Head from 'next/head'
import { useQuery, gql, NormalizedCacheObject } from '@apollo/client'
import { initializeApollo } from 'src/apollo'
import { TodoInterface } from '../src/interfaces'

const MyQuery = gql`
  query MyQuery {
    todo {
      id
      userId
      title
      completed
    }
  }
`

interface HomeData {
  todo: TodoInterface
}

const Home = (): JSX.Element => {
  const { data, loading } = useQuery<HomeData>(MyQuery)
  const {
    todo: { id, title, userId, completed },
  } = data as HomeData

  if (loading) return <span>loading...</span>
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={'/favicon.ico'} />
      </Head>

      <main>
        <h1>{id}</h1>
        <h1>{userId}</h1>
        <h1>{title}</h1>
        <h1>{completed}</h1>
      </main>
    </div>
  )
}

export default Home

export async function getStaticProps(): Promise<NormalizedCacheObject> {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: MyQuery,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}
