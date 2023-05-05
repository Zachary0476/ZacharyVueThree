// 执行打包 monborepo
import execa from 'execa'
// 2.并行打包
async function build(target) {
    // -c rollup配置 环境变 量-env
    await execa('rollup', ['-cw', '--bundleConfigAsCjs', '--environment', `TARGET:${target}`], { stdio: 'inherit' })
}

build('reactivity')
