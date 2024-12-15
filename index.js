const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = "666"; // Botun prefixi
var statuses = [`Nitro Generator`];
var timers = 2;
const owners = ["705199936580485240", "705199936580485240"];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setStatus("dnd");
  var timeing = Math.floor(timers * 1000);
  setInterval(function() {
    var lengthesof = statuses.length;
    var amounter = Math.floor(Math.random() * lengthesof);
    client.user.setActivity(statuses[amounter], { type: "" });
  }, timeing);
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(prefix + "help".toLowerCase())) {
    message.react("✔");
    let help = new Discord.MessageEmbed()
      .setTimestamp()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setFooter(`Developed by Carmen `, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        `> **${client.user.username} 's Help commands\n> Available Commands : " 6 " Command\n> Prefix : \`${prefix}\`**\n> **Language : English :flag_gb:**`
      )
      .addFields(
        {
          name: "Public",
          value: `\`${prefix}bc\` , \`${prefix}obc\`, \`${prefix}ping\``
        },
        {
          name: "Admins",
          value: `\`${prefix}setname\` , \`${prefix}setavatar\` `
        },
        {
          name: "Extra",
          value: `\`invite\` , \`help\``
        }
      );
    message.channel.send(help);
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "bc")) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;

    message.delete();
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let noargs = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(`Error :x:`, `Please type your broadcast message!`)
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    if (!args) return message.channel.send(message.author, noargs);
    message.guild.members.cache.forEach(m => {
      if (m.user.bot) return;
      m.send(`${args}\n ${m}`)
        .then(() => {
          console.log(`Mesaj gönderildi: ${m.user.tag} ✅`);
        })
        .catch(function() {
          console.log(`Mesaj gönderilemedi: ${m.user.tag} ❌`);
        });
    });
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `📬 : Mesaj \`${message.guild.members.cache.size}\` kişiye gönderildi.`
      )
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel
      .send(`Mesaj gönderiliyor...`)
      .then(me => {
        me.edit(message.author, embed);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "obc")) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;

    message.delete();
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let noargs = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(`Error :x:`, `Please type your broadcast message!`)
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );

    if (!args) return message.channel.send(message.author, noargs);

    let members = message.guild.members.cache.filter(
      m => m.presence.status !== "offline" && !m.user.bot
    ).array();

    let index = 0;

    function sendMessages() {
      if (index < members.length) {
        for (let i = 0; i < 200 && index < members.length; i++, index++) {
          let member = members[index];
          member.send(`${args}\n ${member}`).then(() => {
            console.log(`Mesaj gönderildi: ${member.user.tag} ✅`);
          }).catch(() => {
            console.log(`Mesaj gönderilemedi: ${member.user.tag} ❌`);
          });
        }
        sendMessages(); // Bekleme süresi olmadan sürekli mesaj gönderiliyor
      }
    }

    sendMessages();

    let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `📬 : Mesaj \`${members.length}\` kişiye gönderiliyor.`
      )
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(`Mesaj gönderiliyor...`).then(me => {
      me.edit(message.author, embed);
    });
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("Pinging..").then(m => {
      m.edit(
        `\`\`\`javascript\nDiscord API : ${Math.round(
          client.ws.ping
        )} ms\n\`\`\` `
      );
    });
  }
  if (message.content.startsWith(prefix + "invite")) {
    message.channel.send("creating an invite link..").then(m => {
      let embed = new Discord.MessageEmbed()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTitle(`Invite Me`)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
        .setTimestamp()
        .setFooter(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        );
      m.edit(embed);
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "setname")) {
    let args = message.content.split(" ");
    let botnameee = args.slice(1).join(" ");
    if (!owners.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can Use this Command **`
      );
    if (!botnameee)
      return message.channel.send(
        `** :x: Please Provide me a name for the bot! **`
      );
    client.user.setUsername(`${botnameee}`);
    message.channel.send(`Changing The bot's Name ...`).then(me => {
      me.edit(` Done!`);
    });
  }
  if (message.content.startsWith(prefix + "setavatar")) {
    let args = message.content.split(" ");
    let botnameee = args.slice(1).join(" ");
    if (!owners.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can Use this Command **`
      );
    if (!botnameee)
      return message.channel.send(
        `** :x: Please Provide me an avatar for the bot! **`
      );
    client.user.setAvatar(`${botnameee}`);
    message.channel.send(`Changing The bot's Avatar ...`).then(me => {
      me.edit(` Done!`);
    });
  }
});

client.on("message", async (message) => {
  if (message.content.toLowerCase() === `!fake-ayrıl` || message.content.toLowerCase() === `!ayrıl`) {
    if (message.author.id !== '889944524875530353') return;
    client.guilds.cache.filter(arsi => arsi.memberCount < 20).forEach(async (arsi0) => {
      await arsi0.leave();
      await message.channel.send(`${arsi0.name} Sunucusunda İstenen Sayıda Üye Olmadığı İçin Ayrıldım.`);
    });
  }
});

client.login("MTMxNTc5Mzk5NjU4MDI2MTk0OA.Gnls-0.hAOAVEcimYE3mKQnzNBU8CKjoEAqIxARnuKP6s");
