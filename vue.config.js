// 添加全局配置文件
const path = require("path");
const port = process.env.port || 9980; // dev端口号

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/", // 部署应用包时的基本 URL
  outputDir: "dist", // 打包路径
  assetsDir: "static", // 放置静态资源路径
  lintOnSave: process.env.NODE_ENV === "production", // 在生成环境下每次保存检查代码格式
  // 开发服务器相关配置
  devServer: {
    port: port,
    open: true,
  },
  configureWebpack: {
    name: "疫情管理平台",
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
