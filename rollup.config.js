// 通过rollup进行打包

// 1、引入相关依赖
import ts from 'rollup-plugin-typescript2' // 解析ts
import json from '@rollup/plugin-json'
import resolvePlugin from '@rollup/plugin-node-resolve' // 解析三方插件
import path from 'path'
import { rollup } from 'rollup'
// 2、获取文件路径

const packagesDir = path.resolve(__dirname, 'packages')
// 2.1获取需要打包的包
let packageDir = path.resolve(packagesDir, process.env.TARGET)
// 2.2 打包获取到每个包的项目配置
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve('package.json')) // 每个项目的json
const packageOptions = pkg.buildOptions || {}
const name = path.basename(packageDir)
console.log(123, pkg);

// 3.创建一个映射表
const outputOptions = {
    'esm-bundler': {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: 'es'
    },
    'cjs': {
        file: resolve(`dist/${name}.cjs.js`),
        format: 'cjs'
    },
    'global': {
        file: resolve(`dist/${name}.global.js`),
        format: 'iife'
    }
}
const options = pkg.buildOptions

function createConfig(format, output) {
    // 进行打包
    output.name = options.name
    output.sourcemap = true
    // 生成rollup配置
    return {
        input: resolve('src/index.ts'), //导入
        output,
        plugins: [ // 固定格式
            json(),
            ts({ //解析ts
                tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
            resolvePlugin() // 解析三方插件
        ]
    }
}
// rollup需要导出一个配置
export default options.formats.map(format => createConfig(format, outputOptions[format]))