import appRootPath from 'app-root-path';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

declare module 'apollo-discover-resolvers';

// TODO: Types
const flattenDeep = (arr: any): any => Array.isArray(arr)
  ? arr.reduce((a: any, b: any) => a.concat(flattenDeep(b)) , [])
  : [arr];

const deepSearchResolverDirectory = (file: string): any => {
  const fileStat = fs.lstatSync(file);

  console.log('file: ', file);

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

  console.log('resolverFiles', resolverFiles);
};
