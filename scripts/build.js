// 执行打包 monborepo
import fs from 'fs'
import execa from 'execa'

const dirs = fs.readdirSync('packages').filter(p => fs.statSync(`packages/${p}`).isDirectory())
console.log(dirs);
// 2.并行打包
async function build(target) {
    // console.log(123, target);
    // -c rollup配置 环境变量-env
    await execa('rollup', ['-c', '--bundleConfigAsCjs', '--environment',  `TARGET:${target}`], { stdio: 'inherit' })
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


