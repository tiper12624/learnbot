module.exports = (ctx) => {
  const pjson = require('../../../package.json')
  ctx.reply(pjson.version)
}
