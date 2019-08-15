class CopyrightWebpackPlugin {
  apply(compiler) {
    //compiler：webpack的实例
    //compiler.hooks钩子，类似于react中的生命周期函数

    //一个新的编译(compilation)创建之后，钩入(hook into) compiler，同步钩子
    compiler.hooks.compile.tap("CopyrightWebpackPlugin", compilation => {
      console.log(compiler);
    });

    //emit:生成资源到 output 目录之前，异步的
    //compilation：存放的只是跟这次打包相关的所有内容，与compiler存在差异，compiler配置的内容，包括打包的所有相关内容，
    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlugin",
      (compilation, callback) => {
          debugger;
        compilation.assets["copyright.text"] = {
          source: function() {
            return "copyright bu dell lee";
          },
          size: function() {
            return 21; //'copyright bu dell lee'21个字节
          }
        };
        callback();
      }
    );
  }
}

module.exports = CopyrightWebpackPlugin;
