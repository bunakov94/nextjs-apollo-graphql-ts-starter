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

  if (!data) return <h1>No data</h1>

  const {
    todo: { id, title, userId, completed },
  } = data

  if (loading) return <span>loading...</span>
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={'/favicon.ico'} />
      </Head>

      <main className="main">
        <h1>Test data</h1>
        <h2>ID: {id}</h2>
        <h2>User ID: {userId}</h2>
        <h2>Title: {title}</h2>
        <h2>Completed: {completed}</h2>
      </main>
      <style jsx>{`
        .main {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
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
