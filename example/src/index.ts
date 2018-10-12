import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';

const startServer = async () => {
  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
  });

  apollo
    .listen()
    .then(({ url }: { url: string }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
};

startServer().catch((error: Error) => {
  console.error('Can\'t start the server... aborting.');
  console.error(error.message);

  process.exit(1);
});
