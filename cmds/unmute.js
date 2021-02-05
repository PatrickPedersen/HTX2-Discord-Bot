const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have manage messages.")

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.sendMessage("You did not specify a user mention or ID!");

    if(toMute.id === message.author.id) return message.channel.sendMessage("You cannot unmute yourself.");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.sendMessage("You cannot unmute a member who is higher or has the same role as you.");

    let role = message.guild.roles.find(r => r.name === "HTX 2 Muted");
    
    if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted!");

    await toMute.removeRole(role);

    delete bot.mutes[toMute.id];

    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
        if(err) throw(err);
        console.log(`I have unmuted ${toMute.user.tag}.`)
    });
}

module.exports.help = {
    name: "unmute"
}