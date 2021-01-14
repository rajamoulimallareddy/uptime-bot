require("express")().listen(1343);

const db = require("quick.db"); 
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("Token HERE");
const fetch = require("node-fetch");
const fs = require('fs')

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return 
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Pinged Successfully!")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`uphelp | Created By Navaneeth K M </>#7174`)
  console.log(`Logined`)
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "up-uptime") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("** ⛔ This link is already there !!!**")
    
    let help = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("**✅ Successfully added your link to pinging list !!!**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
     message.channel.send(help).then(msg => msg.delete(60000)); //Clears the response after 60000/60 seconds
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    let help = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("⛔ **Error Only Absolute URLs Supported.**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
   return message.channel.send(help).then(msg => msg.delete(60000)); //Clears the response after 60000/60 seconds
  })
  }
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "up-total") {
  var link = spl[1]
 message.channel.send(`**${db.get("linkler").length} / 1000**`)
}})



const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "up-help") {
let embed = new Discord.RichEmbed()
.setColor('#070706')
.addField(`Discord Uptime Bot Help System`, `Discord bots are now uptime for 24/7`)
.setDescription(`**Commands**

 ⛄️ **up-help**  | Shows all commands available!

 💎 **up-uptime**  | Makes your repl.it links up for 24/7!

 ⚡ **up-total** | Shows total number of links available in the system!

`)
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`Navaneeth Uptime Bot | Created By Navaneeth K M </>#7174`, client.user.avatarURL)
return message.channel.send(embed);
    }
 
})

  const log = message => {
  console.log(`${message}`);
}
  
  