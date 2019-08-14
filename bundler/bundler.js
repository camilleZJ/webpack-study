const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default; //导出使用的是import from-ES Module形式，必须加默认，默认就是ES M形式
const babel = require("@babel/core");

const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, "utf-8"); //1-2、获取到入口文件中的内容
  const ast = parser.parse(content, {
    sourceType: "module" //ES Module方式引入模块
  });
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({ node }) {  //找出抽象语法树中type为ImportDeclaration
      const dirname = path.dirname(filename);
      const newFile = "./" + path.join(dirname, node.source.value);
      dependencies[node.source.value] = newFile;
    }
  });
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  });
  return {
      filename,
      dependencies,
      code
  }
};

const result = moduleAnalyser("./src/index.js"); //1-1、引入入口文件
console.log(result);