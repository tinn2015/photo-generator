module.exports = {
  env: {
    NODE_ENV: '"development"',
    needMock: process.env.needMock || false
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    esnextModules: ['taro-ui']
  }
}
