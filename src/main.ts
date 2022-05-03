import { Client, Intents } from 'discord.js'
import type { TextChannel } from 'discord.js'
import { isJMAQuake, isJMATsunami, isEEWDetection } from './dataParser'
import WebSocket from 'ws'
import * as dotenv from 'dotenv'

dotenv.config()

const token = process.env.DISCORD_TOKEN

const client = new Client({
  intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]
})

client.on('ready', async () => {
  console.log(`DisasterAlert Ready. ${client.user?.username}`)
  const p2pWS = new WebSocket("wss://api.p2pquake.net/v2/ws")

  p2pWS.on('open', async () => {
    console.log('Connection Opened')
    const guildTextChannels: TextChannel[] = []
    client.channels.cache.forEach(ch => {
      if (ch.type === "GUILD_TEXT" && ch.name === "jd-alert") {
        guildTextChannels.push(ch)
      }
    })
    guildTextChannels.forEach(ch => {
      ch.send('P2PQuake WebSocket Connection Opened')
      console.log('Data Listen on -> ' + ch.guild.name)
    })
  })

  p2pWS.on('message', (data) => {
    console.log('recieved: %s', data)
    if (isJMAQuake(data)){
      console.log('JMAQuake: ' + data.issue.time)
    }
  })
})

client.login(token)
