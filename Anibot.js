(async()=>{
                    let process = require('process');
                    const events = require('events');
                      let Discord = require("discord.js")
let Database  = require("easy-json-database")
let { MessageEmbed, MessageButton, MessageActionRow, Intents, Permissions, MessageSelectMenu }= require("discord.js")
let logs = require("discord-logs")
const os = require("os-utils");
const lyricsFinder = require('lyrics-finder');
let { Player,QueueRepeatMode } = require("discord-player")
let playdl = require("play-dl")
    let fs = require('fs');
                        const devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;
                        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
                        const s4d = {
                            Discord,
                            database: new Database(`${__dirname}/database.json`),
    fire:null,
                            joiningMember:null,
                            reply:null,
                            tokenInvalid:false,
                            tokenError: null,
                            player:null,
                            manager:null,
                            Inviter:null,
                            message:null,
                            notifer:null,
                            checkMessageExists() {
                                if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                                if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                            }
                        };
                        s4d.client = new s4d.Discord.Client({
                        intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],
                        partials: ["REACTION", "CHANNEL"]
                        });
                        s4d.client.on('ready', () => {
                            console.log(s4d.client.user.tag + " is alive!")
                        })
                        logs(s4d.client);
s4d.player = new Player(s4d.client)         
                        var arguments2, command, volume, onoff;



    //simple host
    const {error} = require("../../err.js");
    process.on("uncaughtException", function(err) {
        error({
            "id": '960747040973946940',
            "error": String(err)
        });
    });
    s4d.client.on("ready", async() => {
    error({
    "id": '960747040973946940',
    "error": String("Alert: Bot turned on!")
    });
    while (s4d.client && s4d.client.token) {
        await delay(2000)
        const {
            stop
        } = require("../../power.js");
        if (await (stop('960747040973946940'))) {
            s4d.client.destroy()
        }
    }
});
s4d.player.on("trackStart", async (queue, track) => {
   let embed = new Discord.MessageEmbed()
     embed.setTitle((['now playing ',track.title,'\n','author: ',track.author,'\n','url: ',track.url,'\n','views: ',track.views,'\n','duration: ',track.duration].join('')));
    embed.setImage((track.thumbnail));
    (queue.metadata.channel).send({embeds:[embed]});


})

s4d.player.on("queueEnd",async (queue) => {
   (queue.metadata.channel).send({content:String('queue finished')});

})

s4d.player.on("trackAdd", async (queue, track) => {
   (queue.metadata.channel).send({content:String((['music ',track.title,'added to queue'].join('')))});

})

await s4d.client.login('OTYwNzQ0ODk0NzU2OTYyMzQ0.Yku5aA.deZtnfZDSLtvEgMMqMhCCEzKtkA').catch((e) => {
        s4d.tokenInvalid = true;
        s4d.tokenError = e;
        if (e.toString().toLowerCase().includes("token")) {
            throw new Error("An invalid token was provided!")
        } else {
            throw new Error("Intents are not turned on!")
        }
    });

s4d.client.on('ready', async () => {
  s4d.client.user.setPresence({status: "online",activities:[{name:'ani!play',type:"LISTENING"}]});

});

s4d.client.on('messageCreate', async (s4dmessage) => {
  arguments2 = (s4dmessage.content).split(' ');
  command = arguments2.splice(0, 1)[0];
  if (command == 'ani!play') {
    if ((s4dmessage.member.voice.channelId) == null) {
      s4dmessage.channel.send({content:String('you are not in a voice channel!')});
      return
    }
    if ((s4dmessage.guild.me.voice.channelId) != null && (s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('you are not in my voice channel!')});
      return
    }
    const queue = s4d.player.createQueue((s4dmessage.guild), {metadata: {channel: (s4dmessage.channel)}, async onBeforeCreateStream(track, source, _queue) {
            if (source === "youtube") {
                return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream;
            }
        }
    });
    if (!(queue.connection)) {
      await queue.connect((s4dmessage.member.voice.channel))
      ;}
    queue.play((await s4d.player.search((arguments2.join(' ')), {requestedBy: (s4dmessage.author)}).then(x => x.tracks[0])));
  }
  if (command == 'ani!pause') {
    if ((s4dmessage.member.voice.channel) == null) {
      s4dmessage.channel.send({content:String('you are not in a voice channel!')});
      return
    }
    if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('you are not in my voice channel!')});
      return
    }
    if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
      s4dmessage.channel.send({content:String('there is no music playing!')});
      return
    }
    (s4d.player.getQueue((s4dmessage.guild).id)).setPaused(true)
    s4dmessage.channel.send({content:String('paused music')});
  }
  if (command == 'ani!resume') {
    if ((s4dmessage.member.voice.channel) == null) {
      s4dmessage.channel.send({content:String('you are not in a voice channel!')});
      return
    }
    if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('you are not in my voice channel!')});
      return
    }
    if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
      s4dmessage.channel.send({content:String('there is no music playing!')});
      return
    }
    (s4d.player.getQueue((s4dmessage.guild).id)).setPaused(false)
    s4dmessage.channel.send({content:String('resumed the music')});
  }
  if (command == 'ani!stop') {
    if ((s4dmessage.member.voice.channel) == null) {
      s4dmessage.channel.send({content:String('you are not in a voice channel!')});
      return
    }
    if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('you are not in my voice channel!')});
      return
    }
    if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
      s4dmessage.channel.send({content:String('there is no music playing!')});
      return
    }
    (s4d.player.getQueue((s4dmessage.guild).id)).destroy()
    s4dmessage.channel.send({content:String('stopped music')});
  }
  if (command == 'ani!volume') {
    volume = arguments2[0];
    if ((s4dmessage.member.voice.channel) == null) {
      s4dmessage.channel.send({content:String('you are not in a voice channel!')});
      return
    }
    if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('you are not in my voice channel!')});
      return
    }
    if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
      s4dmessage.channel.send({content:String('there is no music playing!')});
      return
    }
    if ((Number(volume)) < 0) {
      s4dmessage.channel.send({content:String('the volume need to be more then 0!')});
      return
    }
    if ((Number(volume)) > 100) {
      s4dmessage.channel.send({content:String('the volume need to be less then 100!')});
      return
    }
    (s4d.player.getQueue((s4dmessage.guild).id)).setVolume(volume)
    s4dmessage.channel.send({content:String(('the volume is now ' + String(volume)))});
  }
  if (command == 'ani!skip') {
    if ((s4dmessage.member.voice.channel) == null) {
      s4dmessage.channel.send({content:String('you are not in a voice channel!')});
      return
    }
    if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('you are not in my voice channel!')});
      return
    }
    if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
      s4dmessage.channel.send({content:String('there is no music playing!')});
      return
    }
    (s4d.player.getQueue((s4dmessage.guild).id)).skip()
    s4dmessage.channel.send({content:String(('skipped music ' + String((s4d.player.getQueue((s4dmessage.guild).id)).current)))});
  }
  if (command == 'ani!loop') {
    onoff = arguments2[0];
    if (onoff == 'on') {
      if ((s4dmessage.member.voice.channel) == null) {
        s4dmessage.channel.send({content:String('you are not in a voice channel!')});
        return
      }
      if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
        s4dmessage.channel.send({content:String('you are not in my voice channel!')});
        return
      }
      if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
        s4dmessage.channel.send({content:String('there is no music playing!')});
        return
      }
      (s4d.player.getQueue((s4dmessage.guild).id)).setRepeatMode(QueueRepeatMode.QUEUE)
      s4dmessage.channel.send({content:String('loop on')});
    } else if (onoff == 'off') {
      if ((s4dmessage.member.voice.channel) == null) {
        s4dmessage.channel.send({content:String('you are not in a voice channel!')});
        return
      }
      if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
        s4dmessage.channel.send({content:String('you are not in my voice channel!')});
        return
      }
      if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
        s4dmessage.channel.send({content:String('there is no music playing!')});
        return
      }
      (s4d.player.getQueue((s4dmessage.guild).id)).setRepeatMode(QueueRepeatMode.OFF)
      s4dmessage.channel.send({content:String('loop off')});
    } else {
      s4dmessage.channel.send({content:String('you need to send ani!loop on/off')});
    }
  }
  if (command == 'ani!back') {
    if ((s4dmessage.member.voice.channel) == null) {
      s4dmessage.channel.send({content:String('you are not in a voice channel!')});
      return
    }
    if ((s4dmessage.member.voice.channelId) != (s4dmessage.guild.me.voice.channelId)) {
      s4dmessage.channel.send({content:String('you are not in my voice channel!')});
      return
    }
    if (!((s4d.player.getQueue((s4dmessage.guild).id)).playing)) {
      s4dmessage.channel.send({content:String('there is no music playing!')});
      return
    }
    (s4d.player.getQueue((s4dmessage.guild).id)).back()
    s4dmessage.channel.send({content:String('playing previous music')});
  }

});

                        return s4d
                        })();
                        