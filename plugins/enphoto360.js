let limit = 10
let fetch = require('node-fetch')
let split = '|'
let handler = async (m, { conn, args: [effect], text: txt }) => {
  let { effects } = await (await (fetch(global.API('xteam', '/ephoto')))).json()
  if (!effect) throw '*Lista de efectos*\n\n' + effects.sort((a, b) => a - b).join('\n')
  effect = effect.toLowerCase()
  if (!effect in effects) throw `Efecto *${effect}* extraviado`
  let [text, text2, ...text3] = txt.replace(effect, '').trimStart().split(split)
  text3 = text3.join(split)
  let url = global.API('xteam', '/ephoto/' + effect, { text, text2, text3 }, 'APIKEY')
  await conn.sendFile(m.chat, url, 'ephoto.jpg', `*ENPHOTO360*\n*Efecto:* ${effect}`, m)
}
handler.help = ['enphoto'].map(v => v + ' <efecto> <texto>|[texto2]|[texto3]')
handler.tags = ['tools']
handler.command = /^(en?photo(360)?)$/i

handler.register = true

handler.limit = true

module.exports = handler
