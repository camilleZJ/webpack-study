const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default; //导出使用的是import from-ES Module形式，必须加默认，默认就是ES M形式
const babel = require("@babel/core");

const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, "utf-8"); //1-2、获取到入口文件中的内容
  const ast = parser.parse(content, {
    //将源代码转换成就是对象：ast抽象语法树
    sourceType: "module" //ES Module方式引入模块
  });
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      //找出抽象语法树中type为ImportDeclaration
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
  };
};

const makeDependenciesGraph = entry => {
  const entryModule = moduleAnalyser(entry); //1-1、引入入口文件
  //通过队列方式实现类似递归效果
  const graphArray = [entryModule];
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i];
    const { dependencies } = item; //item.dependencies
    if (dependencies) {
      for (let j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j])); //第一次遍历：j:./message.js   dependencies[j]:./src\message.js，第一次遍历后graphArray增加了message.js的分析结果又可以处理其中的依赖了
      }
    }
  }

  //数组格式对于打包来说不太容易，以下做一个格式的转换
  const graph = {};
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    };
  });
  return graph;
};

const generateCode = entry => {
  const graph = JSON.stringify(makeDependenciesGraph(entry)); //转换为json字符串
  //防止污染全局环境，代码需放在闭包中
  return `
    (function(graph){
      function require(module) {
        function localRequire(relativePath) {
          return require(graph[module].dependencies[relativePath]); //根据相对路径拿到模块真实的路径
        }

        var exports = {};
        (function(require, exports, code){ //接收导出exports、localRequire
          eval(code);  //执行代码，code中包含了require, exports的使用，此时require使用的实际是localRequire
        })(localRequire, exports, graph[module].code);
        
        return exports; //导出以便下一个模块接收
      };
      require('${entry}') //调用构建的require方法
    })(${graph}); //字符串形式传入
  `;
};

const code = generateCode("./src/index.js");
console.log(code);
