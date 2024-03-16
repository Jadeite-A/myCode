// 自动导入
const directiveFiles = import.meta.glob('./utils/*.ts');
// const directiveFiles = require.context('./utils', true, /\.ts$/);

// const directives = directiveFiles.keys().reduce((directive, directivePath) => {
//   const directiveName: string = directivePath.replace(/^\.\/(.*)\.\w+$/, '$1');
//   const value = directiveFiles(directivePath);
//   directive[directiveName] = value.default;
//   return directive;
// }, {});
const directives: Record<string, any> = {};
for (const path in directiveFiles) {
  const directiveName = path.replace(/^\.\/(.*)\.\w+$/, '$1');
  directiveFiles[path]().then((module: any) => {
    directives[directiveName] = module.default;
  });
}

export default {
  install(Vue: any) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  }
};