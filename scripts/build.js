// 执行打包 monborepo
// 1.获取打包 目录文件 文件不参与打包
const fs = require('fs')
const execa = require('execa')

const dirs = fs.readdirSync('packages').filter(p => fs.statSync(`packages/${p}`).isDirectory())
console.log(dirs);
// 2.并行打包
async function build(target) {
    // console.log(123, target);
    // -c rollup配置 环境变量-env
    await execa('rollup', ['-c', '--environment', `TARGET:${target}`])
}
async function runParaller(dirs, build) {
    const result = [] // 打包队列
    for (let item of dirs) {
        result.push(build(item))
    }
    return Promise.all(result)
}

runParaller(dirs, build).then((resolve, reject) => {
    console.log('ok');
})


