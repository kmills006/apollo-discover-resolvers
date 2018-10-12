import { gql } from 'apollo-server';

const Query = gql`
  type Query {
    sayHello(name: String): String
    sayGoodbye: String
  }
`;

const Mutation = gql`
  type Mutation {
    sumNumbers(valueA: Int!, valueB: Int!): Int!
  }
`;

export const typeDefs = [Mutation, Query];
