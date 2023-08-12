import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock"
import path from "path";
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineConfig(({command}) => { 
  return {
  plugins: [vue(),
   
   createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
   }),
      viteMockServe({
        mockPath: "mock",
        localEnabled: true,
    }),
    ],
  resolve: {
    alias: {
      "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
    },
  },
  // scss全局变量的配置
  css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/variable.scss";',
        },
      },
    },
}
});
