import { gql } from 'apollo-server';

const Query = gql`
  type Query {
    sayHello(name: String): String
    sayGoodbye: String
  }
`;

export const typeDefs = [Query];
