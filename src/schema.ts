import { makeSchema, objectType, queryType } from '@nexus/schema'
import path from 'path'

export const Todo = objectType({
  name: 'Todo',
  definition(t) {
    t.string('id')
    t.string('userId')
    t.string('title')
    t.string('completed')
  },
})

const Query = queryType({
  definition(t) {
    t.field('todo', {
      type: Todo,
      resolve: async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        return await res.json()
      },
    })
  },
})

const types = { Query }

export const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
    typegen: path.join(process.cwd(), 'src', 'generated', 'nexus.ts'),
  },
  typegenAutoConfig: {
    sources: [
      {
        alias: 'faces',
        source: path.join(process.cwd(), 'src', 'interfaces.ts'),
        typeMatch: (type) => new RegExp(`(${type}Interface)`),
      },
    ],
    backingTypeMap: {
      Date: 'Date',
      URL: 'URL',
    },
    debug: process.env.NODE_ENV === 'development',
  },
})
