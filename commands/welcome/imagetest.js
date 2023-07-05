const Discord = require('discord.js')
const fetch = require("node-fetch");
const { MessageEmbed } = require('discord.js')
const express = require('express')
const app = express()
const moment = require("moment")
const links = require('../../JSON/link.json')
const { Canvas, resolveImage } = require('canvas-constructor');
const canvas = require('canvas')
const { registerFont } = require('canvas');
registerFont('./fonts/Quicksand-SemiBold.ttf', { family: 'Quicksand-SemiBold' });




module.exports = {
  name: "testimage",
  aliases: ["ti"],
  category: ":frame_photo: WELCOME",
  usage: "it",
  description: "Test image welcome.",
  run: async (client, message, args) => {
   

    const m = await message.channel.send(`**${message.author.username}** please wait image welcome looks like this:`);
    const link = links.link[Math.floor((Math.random() * links.link.length))];

    const img = await canvas.loadImage(`${link}`);

 
const userPfp = await resolveImage(message.author.displayAvatarURL({
            format: "png",
            size: 1024
        }))

    const image = new Canvas(1024, 576)
      .printImage(img, 0, 0, 1024, 576) 
      .setColor(`#FFFFFF`)
      //.setTextFont('115px Quicksand-SemiBold')
      //.setTextAlign("center")
      //.printWrappedText(moment(message.author.createdAt).format("MMMM d, YYYY"), 570, 460)
      .setTextAlign("center")
      .setTextFont('30px Quicksand-SemiBold')
      .printWrappedText(message.author.tag, 509, 509)
      //.printWrappedText(`${message.guild.members.cache.size}th member`, 512, 455)
      //.setColor(`#FFFFFF`)
      //.setTextAlign("center")
      //.setTextFont('150px Quicksand-SemiBold')
      //.setTextAlign("center")
      //.printWrappedText(message.guild.name, 550, 470)
      .printCircularImage(userPfp, 582, 249, 72, 72)
      .toBuffer();
      
    
    m.delete({ timeout: 100 });
    return message.channel.send(new Discord.MessageAttachment((await image), "image.png"))
  }
}
