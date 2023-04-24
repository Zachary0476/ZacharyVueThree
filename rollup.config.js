// 通过rollup进行打包

// 1、引入相关依赖
import ts from 'rollup-plugin-typescript2' // 解析ts
import json from '@rollup/plugin-json'
import resolvePlugin from '@rollup/plugin-node-resolve' // 解析三方插件
import path from 'path'
// 2、获取文件路径

const packagesDir = path.resolve(__dirname, 'packages')
// 2.1获取需要打包的包
let packageDir = path.resolve(packagesDir, process.env.TARGET)
// 2.2 打包获取到每个包的项目配置
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve('package.json')) // 每个项目的json
const packageOptions = pkg.buildOptions || {}
console.log(123, pkg);