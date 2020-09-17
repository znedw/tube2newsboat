const fastify = require('fastify')({ logger: true })
const fs = require('fs').promises
require('dotenv').config()

fastify.put('/sub/add', async (request, reply) => {
  const { channelId } = request.body
  if (channelId) {
    fastify.log.info(`Got a channel to add: ${channelId}`)
    await fs.appendFile(newsboatUrlFile(), buildSubUrl(channelId))
    return { status: 'ok' }
  } else {
    reply.status = 400
    return { status: 'bad-request' }
  }
})

const newsboatUrlFile = () => process.env.NEWSBOAT_URL_FILE || `${require('os').homedir()}/.newsboat/urls`

const buildSubUrl = (channelId) => `\nhttps://www.youtube.com/feeds/videos.xml?channel_id=${channelId.trim()}\n`

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
    fastify.log.info(`url config file is ${newsboatUrlFile()}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
