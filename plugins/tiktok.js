let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Uhm...donde esta la url?'
  let res = await fetch(global.API('xteam', '/dl/tiktok', {
    url: args[0]
  }, 'APIKEY'))
  let json = await res.json()
  conn.sendFile(m.chat, json.result.url, 'tiktok.mp4', `
_*Nombre de usuario:*_ @${json.result.username}
`.trim(), m, false, {
    thumbnail
  })
}
handler.help = ['tiktok'].map(v => v + ' <enlace>')
handler.tags = ['downloader']

handler.command = /^(tiktok(dl)?)$/i

module.exports = handler
