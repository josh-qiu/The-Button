
//Package
const Discord = require('discord.js');

//Create client to manage bot
const client = new Discord.Client();

//Functions
const hasValue = (roles, title) => {
    const tempRole = roles.find(role => role.name === title);
    if (tempRole == undefined) {
        server.roles.create({ data: { name: title, hoist: false, color: title.toUpperCase() } });
    }
}

const removeColors = (message) => {
    message.member.roles.remove(roles.find(role => role.name === "Purple"));
    message.member.roles.remove(roles.find(role => role.name === "Blue"));
    message.member.roles.remove(roles.find(role => role.name === "Green"));
    message.member.roles.remove(roles.find(role => role.name === "Yellow"));
    message.member.roles.remove(roles.find(role => role.name === "Orange"));
    message.member.roles.remove(roles.find(role => role.name === "Red"));
}

//Button colors
const colors = ["Purple", "Purple", "Blue", "Green", "Green", "Yellow", "Yellow",
"Orange", "Orange", "Red"];

//Image Links
const images = [
    "https://i.postimg.cc/ncLY8hY9/Penguin-Purple.jpg",
    "https://i.postimg.cc/k5SvjYNj/Penguin-1.png",
    "https://i.postimg.cc/K8RNT81h/Penguin-2.png",
    "https://i.postimg.cc/k4dFLNf7/Penguin-3.png",
    "https://i.postimg.cc/7YB9b2YN/Penguin-4.png",
    "https://i.postimg.cc/KjG78Z6V/Penguin-5.png",
    "https://i.postimg.cc/Z52LxzNB/Penguin-6.png",
    "https://i.postimg.cc/rsf1dBcp/Penguin-7.png",
    "https://i.postimg.cc/KzrrbKHB/Penguin-8.png",
    "https://i.postimg.cc/66cL1vRN/Penguin-9.png",
    "https://i.postimg.cc/3Jbj3QnS/Penguin-10.png"
]

//Hexcode colors
const hex = [
    [99, 38, 196],
    [125, 80, 211],
    [21, 149, 255],
    [19, 183, 104],
    [32, 150, 88],
    [226, 212, 35],
    [249, 201, 48],
    [255, 167, 39],
    [255, 137, 31],
    [229, 28, 28]
]

//Start date of REVIVE (string)
begin = 0;

//Seconds passed since LAST PRESS
time = 0;
delta = 0;
//How much time the button can stay alive
health = 28800;

//Counter keeps track of which color the button is
counter = 1;

//True if button has died 
dead = false;

//This message appears once the bot has logged on and can recieve commands

client.on('ready', () => {

    //Set the server to a variable
    server = client.guilds.cache.first();

    //create a new channel if it does not already exist, set channel to new channel
    channel = server.channels.cache.find(channel => channel.name == "the-button");
    if (channel == undefined) {
        server.channels.create("the-button", { type: 'text' });

        //call a function to wait 300 milliseconds until the channel is registerd
        function wait() {
            channel = server.channels.cache.find(channel => channel.name == "the-button");
            if (channel == undefined) {
                setTimeout(wait, 300);
            }
        }
        wait();
    }

    //create new roles if they do not already existƒcon
    roles = undefined;
    server.roles.fetch()
        .then(manager => roles = manager.cache)
        .catch(console.error);

    //roles = cache
    

    

    server.roles.fetch()
        .then(roles => hasValue(roles.cache, "Red"));
    server.roles.fetch()
        .then(roles => hasValue(roles.cache, "Orange"));
    server.roles.fetch()
        .then(roles => hasValue(roles.cache, "Yellow"));
    server.roles.fetch()
        .then(roles => hasValue(roles.cache, "Green"));
    server.roles.fetch()
        .then(roles => hasValue(roles.cache, "Blue"));
    server.roles.fetch()
        .then(roles => hasValue(roles.cache, "Purple"));

    time = 0;
    counter = 0;
    dead = false;
    begin = new Date().toUTCString
    start = Date.now()
    setInterval(function () {
        if (!dead) {
            delta = Date.now() - start; //Date.now - (Date.now - 2880) = 2880
            time = health - Math.floor(delta / 1000);
            console.log(time);
            if (time % 2880 == 0) {
                if (time != health) {
                    console.log("NEW COLOR");
                    if (counter == colors.length) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle("The Button has died")
                            .setImage(images[10]);
                        channel.send(embed);
                        dead = true;
                        counter++;
                    } else {
                        counter++;
                    }
                }

                

            }
        }

    }, 1000);

    console.log(`Logged in as ${client.user.tag}!`); 
});


//Event handler for a message
client.on('message', message => {

    if (dead) {
        return;
    }

    //Direct messages
    if (!message.channel.guild) {
        //if (message.content === ">next") {
        //    start -= (delta % 2880) + 1;
        //} else {
        //    message.channel.send("hello");
        //}
        console.log(message.content);
        start -= 2860 * 1000;
        return;
    }

    if (message.channel != channel) {
        return;
    }

    /* Switch statement handles these commands:
     * >revive: Starts the button at max health, resets begin, time, and counter
     * >press: Presses the button, resets time and counter
     * >check: Sends the current health and color of the button
     */
    switch (message.content) {
        case ">press":
            if (!dead) {
                start = Date.now();
                removeColors(message);
                message.channel.send(`${message.member.displayName} has pressed the button at **${ colors[counter]} ** !`);
                message.member.roles.add(roles.find(role => role.name === colors[counter]))
                counter = 0;
            }
            break;
        case ">check":
            if (counter == colors.length) {
                embed = new Discord.MessageEmbed()
                    .setTitle("The Button is dead")
                    .setImage(images[10]);
            } else {
                embed = new Discord.MessageEmbed()
                    .setTitle("The Button is **" + colors[counter] + "**!")
                    .setImage(images[counter])
                    .setColor(hex[counter]);
            }
            message.channel.send(embed);
            break;
    }
    



    if (message.content === 'ping') {

        //ROLE TESTING
       message.guild.roles.fetch()
            .then(roles => message.channel.send(`First ID: ${roles.cache.findKey(role => role.name === "Random Role 1")}`))
            .catch(console.error);
        message.guild.roles.fetch('724140479335104562')
            .then(role => message.channel.send(`Role position: ${role.position}`))
            .catch(console.error);

        //addding roles
        //- get ID of the role
        // Use ID in role cache to find the role

        //create a green and a yellow role if they don't already exist



        //EMBED TESTING


          00
        //const embed = new Discord.MessageEmbed()
        //    .setTitle('Penis')
        //    .setColor([14, 213, 240])
        //    .setAuthor(client.user.username, client.user.displayAvatarURL())
        //    .setDescription('Description Here')
        //    .setFooter('Footer Here')
        //    .addField('Name', 'Content')
        //    .setImage("https://i.postimg.cc/6QLjhzbZ/1200px-058-Growlithe.png");

        //message.channel.send(embed);
        //PICTURE TESTING
        //message.channel.send("This is my profile: ", { files: ["./images/Button.png"] });

        //TIMER TESTING
        //message.channel.send("Seconds remaining" + (40 - Math.floor(delta / 1000)));
        //message.channel.send("UTC time: " + new Date().toUTCString());
    }

    //BASIC BUTTON COMMANDS
    //switch (message.content) {
    //    case ">press":
    //        start = Date.now();
    //        message.channel.send("The Button has been pressed!");
    //        break;
    //    case ">check":
    //        message.channel.send("**Green**");
    //        break;
    //    //CHANGE PROFILE PICTURE TEST 
    //    case ">change":
    //        client.user.setAvatar('./images/Button.png')
    //            .then(user => console.log(`New avatar set!`))
    //            .catch(console.error);

    //}

});

client.login(NzIwNzkwMjc0NTI3MzMwNDY0.XuUn-g.iPuVHWGsEboJi304Cuk2Pqts53U);
//thursDAY JUNE 25
