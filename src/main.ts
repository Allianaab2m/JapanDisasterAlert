import { Client, Intents } from 'discord.js'

const client = new Client({
    intents: Intents.FLAGS.GUILD_MESSAGES
})

client.on('ready', async () => {
    console.log(`DisasterAlert Ready. ${client.user?.username}`)
})

// p2p API access per 5s use node-cron
