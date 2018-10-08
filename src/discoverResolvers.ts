import appRootPath from 'app-root-path';
import fs from 'fs';
import glob from 'glob';
import pascalCase from 'pascal-case';
import path from 'path';
import pluralize from 'pluralize';

declare module 'apollo-discover-resolvers';

const resolverTypes = ['mutations', 'queries'];

// TODO: Types
const flattenDeep = (arr: any): any => Array.isArray(arr)
  ? arr.reduce((a: any, b: any) => a.concat(flattenDeep(b)) , [])
  : [arr];

const deepSearchResolverDirectory = (file: string): any => {
  const fileStat = fs.lstatSync(file);

  if (!fileStat.isDirectory()) {
    return file;
  }

  const children = glob.sync(`${file}/*`);

  return children.map(child => deepSearchResolverDirectory(child));
};

export const discoverResolvers = (directory: string) => {
  const resolverPath = `${appRootPath.path}/${path.relative(appRootPath.path, directory)}`;

  const resolverFiles = flattenDeep(
    glob
      .sync(`${resolverPath}/*/*`)
      .map(file => deepSearchResolverDirectory(file)),
  );

  return resolverFiles.reduce(
    (accumulator: any, currentFile: string) => {
      let resolvers: any = accumulator;

      const splitPath = path.dirname(currentFile).split(path.sep);

      const indexOfResolverType = splitPath.findIndex((element: string): boolean => (
        resolverTypes.includes(element)
      ));

      const resolverType = splitPath[indexOfResolverType];
      const resolverKey = pluralize(pascalCase(resolverType), 1);
      const resolver = require(currentFile);

      switch (resolverKey) {
        case 'Query':
        case 'Mutation':
          resolvers = {
            ...resolvers,
            [resolverKey]: {
              ...resolvers[resolverKey],
              ...resolver,
            },
          };

          break;
        default:
          resolvers = {
            ...resolvers,
            ...resolver,
          };

          break;
      }

      return resolvers;
    },
    {},
  );
};
