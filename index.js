const fastify = require('fastify')({ logger: true })
const fs = require('fs').promises

fastify.put('/sub/add', async (request, reply) => {
  const { channelId } = request.body
  if (channelId) {
    console.log(`Got a channel to add: ${channelId}`)
    await fs.appendFile(newsboatUrlFile(), buildSubUrl(channelId))
    return { status: 'ok' }
  } else {
    reply.status = 400
    return { status: 'bad-request' }
  }
})

const newsboatUrlFile = () => `${require('os').homedir()}/.newsboat/urls`

const buildSubUrl = (channelId) => `\nhttps://www.youtube.com/feeds/videos.xml?channel_id=${channelId.trim()}\n`

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
