import { makeSchema, objectType, queryType } from '@nexus/schema'

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
        console.log(res)
        return await res.json()
      },
    })
  },
})

const types = { Query }

export const schema = makeSchema({
  types,
})
