# apollo-discover-resolvers

An opinionated helper to automagically import your GraphQL resolvers and build your resolver object for an Apollo Server.

## Apollo Discover Resolvers

### Install

```
yarn add apollo-discover-resolvers
```

or 

```
npm i apollo-discover-resolvers --save
```

### Usage

Apollo discover resolvers recursively searches through the directory passed into the function.

```
import { ApolloServer, gql } from 'apollo-server';
import { discoverResolvers } from 'apollo-discover-resolvers';

// A map of functions which return data for the schema.
const resolvers = discoverResolvers('absolute/path/to/resolvers/directory');

// The GraphQL schema
const typeDefs = gql`
  type CraftBeer {
    name: String!
    abv: Int!
  }

  input CraftBeerInput {
    name: String
    abv: Int
  }

  type Query {
    "A simple type for getting started!"
    craftBeers: CraftBeer
  }

  type Mutation {
    updateCraftBeer(input: CraftBeerInput!): CraftBeer!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
```

### Resolver Folder Structure

Apollo discover resolvers takes a single parameter `directory` which is the path to your resolver folder. From there, the module will perform a synchronous glob search for resolver files. The resolvers use the folder structure to build the Resolver object. Any files under `queries` will be set on the Query property and likewise for mutations.

```
.
├── resolvers
|  ├── index.ts
|  ├── mutations
|     └──  updateCraftBeer.ts
|  └── queries
|     └──  craftBeers.ts
```

### Resolvers

The module will build a Resolver object to be passed into your Apollo Server. Each resolver file should export a function named to match the query or mutation.

```
// ./resolvers/queries/craftBeers.ts
export const craftBeers = (parent, args, context, info) => {}

// ./resolvers/mutations/craftBeers.ts
export const updateCraftBeer = (parent, args, context, info) => {}
```

#### Resolver Object

```
const resolvers = {
  Mutation: {
    updateCraftBeer: (parent, args, context, info) => {},
  },
  Query: {
    craftBeers: (parent, args, context, info) => {},
  },
}
```


## Todo
 
- [ ] README
- [ ] Test Suite
