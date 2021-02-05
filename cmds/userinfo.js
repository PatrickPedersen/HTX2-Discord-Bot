const Discord = module.require("discord.js");
const moment = module.require("moment");

module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first() || message.author;

    let userinfo = {};
    userinfo.id = user.id;
    userinfo.registered = moment.utc(message.guild.members.get(user.id).user.createdAt).format("dddd, MMMM Do, YYYY");
    userinfo.joined = moment.utc(message.guild.members.get(user.id).user.joinedAt).format("dddd, MMMM Do, YYYY");

    let embed = new Discord.RichEmbed()
        .setAuthor(`${user.username}#${user.discriminator}`)
        // .setThumbnail(`${bot.user.avatarURL}`)
        .setDescription(`${user}`)
        .setColor("#9B59B6")
        .addField("Status", userinfo.status)
        .addField("Joined", userinfo.joined, true)
        .addField("Registered", user.createdAt)
        .setFooter("ID", `${user.id}`, true)
            
    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "userinfo"
}