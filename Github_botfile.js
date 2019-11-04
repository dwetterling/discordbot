const discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
const rand = require('random');
const fs = require('fs');
const jsonfile = require('jsonfile');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new discord.Client({
   token: auth.token,
   autorun: true
});

// Dialogue arrays

var insults = [ "Your bad kid",
                "Your a pee pee poo poo pants",
                "You fucking donkey",
                "bro whats that smell??I hope that aint Your smell, because it smells like jun...... ew.....",
                "Your mother was a hamster and your father smells of elderberries",
                "Eat my watermark",
                "I bet you shower naked. YOU SLUT!",
                "What are you? Some sort of military test gone wrong??",
                "You are the cum shot your mother shoulda swallowed",
                "Why tf are you doing ^insult, instead of playing retro, fuqs wrong with chu??",
                "Just because its october does not mean you can wear your furry suit outside!",
                "I found the christmas gift Im buying you",
                "Ima be real with chu chief. I just plain out dont like you",
                "Whos a little brit across the sea? YOU ARE",
                "Watch out! I heard the US army was gonna invade your body, because you use so much essential oil shit.",
                "You are smooth brained",
                "You use small brain time",
                "You fall for all them fake reward virus/scam sites"
                ]

bot.on('ready', function (evt) {
    
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username);
    bot.user.setActivity('Chicken Tendies');
    
});


//const commando = require('discord.js-commando');
const prefix = ('^');

var stats = {};
if(fs.existsSync('stats.json')){
    stats = jsonfile.readFileSync('stats.json');
}

bot.on('message', (message) => {
//-----------------------------------------------------------------------------
//Player levels
if(message.author.id == bot.user.id)
return;

    if (message.guild.id in stats === false){
        stats[message.guild.id] = {};
    }

    
    const guildStats = stats[message.guild.id];
    if(message.author.id in guildStats === false){
        guildStats[message.author.id] = {
            xp: 0,
            level: 0,
            last_message: 0
        };
    }

    const userStats = guildStats[message.author.id];
    const xpToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100
    if(Date.now() - userStats.last_message > 30000){
    userStats.xp += rand.int(15, 25);
    userStats.last_message = Date.now();

    
    if(userStats.xp >= xpToNextLevel){
        userStats.level++;
        userStats.xp = userStats.xp - xpToNextLevel
        message.channel.send(message.author.username + ' has reached level ' + userStats.level);
    }

    jsonfile.writeFileSync('stats.json', stats);

    console.log(message.author.username + ' now has ' + userStats.xp)
    console.log(xpToNextLevel + ' xp needed for next level.')
    }
//------------------------------------------------------------------------------------------------------------------
 if (message.content.startsWith(prefix + "help"))
{    
        message.reply(' Try these keywords after' + ' ' +  '^' + ' ' +  '(stats,ping,ifunny,hi,winux,insult,magic,bored,russian,tendies,noods,count)')
        }
//-------------------------------------------------------------------------------------------------------------------
    if (message.content.startsWith(prefix + "ping"))
    {
        message.channel.sendMessage('Pong');
    }
//-----------------------------------------------------------------------------------------------------------------
    if (message.content.startsWith(prefix + "stats")){
        message.reply(' is level ' + userStats.level)
        message.channel.sendMessage(' and has ' + userStats.xp + ' xp')
        message.channel.sendMessage(xpToNextLevel + 'xp Is needed for the next level.')
    }
//-------------------------------------------------------------------------------------------------------------------
    if (message.content.startsWith(prefix + "ifunny"))
    {
        message.channel.sendMessage({files: ['ifunny.jpg']});
    }
//------------------------------------------------------------------------------------------------------------------
    if (message.content.startsWith(prefix + "hi"))
    {
        number = 6; 
                      var random = Math.floor(Math.random() * (number -1 + 1)) +1;
                      switch(random){         
            case 1: message.reply ('Hello.' + '.Enjoy this picture of a cute dog', {files: ['dog.jpg']});
                    break;
            case 2: message.reply ('Hello.' + '.Enjoy this picture of a cute dog', {files: ['dog2.jpg']});     
                    break;
            case 3: message.reply ('Hello.' + '.Enjoy this picture of a cute dog', {files: ['dog3.jpg']});
                    break;
            case 4: message.reply ('Hello.' + '.Enjoy this picture of a cute dog', {files: ['dog4.jpg']});
                    break;
            case 5: message.reply ('Hello.' + '.Enjoy this picture of a cute dog', {files: ['dog5.jpg']});    
                    break;
            case 6: message.reply ('Hello.' + 'Enjoy this picture of a cute dog', {files: ['dog6.jpg']});
                    break;
                    }
    }
//------------------------------------------------------------------------------------------------------------------
    if (message.content.startsWith(prefix + "winux"))
    {
            message.channel.sendMessage( "<@" + 196480010637279232 +  ">" + ' ' + 'BOK', {files: ['winux.jpg']});
    }
//------------------------------------------------------------------------------------------------------------------
    if (message.content.startsWith(prefix + "insult"))
    {
	// choose a random insult
        var insult = insults[ Math.floor(Math.random() * insults.length) ];
        message.reply(insult);

        // check for image
	var regex = /(?:<)(.*)(?:>)/g;

	if (insult.match(regex))
        {
            image = regex.exec(insult)[1];
            message.reply({files: [image]});
        }
    }
//-----------------------------------------------------------------------------------------------------------------
    if (message.content.startsWith(prefix + "magic"))
    {
        number = 20;
               var random = Math.floor(Math.random() * (number - 1 + 1)) +1;
               switch(random){
                   case 1: message.channel.sendMessage ('It is certain');
                   break;
                   case 2:  message.channel.sendMessage ('It is decidedly so');
                    break;                
                   case 3: message.channel.sendMessage ('Without a doubt');
                   break;
                   case 4: message.channel.sendMessage ('Yes - definitely');
                   break;
                   case 5: message.channel.sendMessage ('You may rely on it');
                   break;
                   case 6: message.channel.sendMessage ('As I see it, yes.');
                   break;
                   case 7: message.channel.sendMessage ('Most likely');
                   break;
                   case 8:  message.channel.sendMessage ('Outlook good');
                   break;
                   case 9:  message.channel.sendMessage ('Yes');
                   break;
                   case 10: message.channel.sendMessage ('Signs point to yes');
                   break;
                   case 11: message.channel.sendMessage ('Reply hazy,try again');
                   break;
                   case 12: message.channel.sendMessage ('Ask again later');
                   break;
                   case 13:  message.channel.sendMessage ('Better not tell you now');
                   break;
                   case 14: message.channel.sendMessage ('Cannot predict now');
                   break;
                   case 15: message.channel.sendMessage ('Concentrate and ask again');
                   break;
                   case 16: message.channel.sendMessage ('Dont count on it');
                   break;
                   case 17: message.channel.sendMessage ('My reply is no');
                   break;
                   case 18: message.channel.sendMessage ('My sources say no');
                   break;
                   case 19: message.channel.sendMessage ('Outlook not so good');
                   break;
                   case 20: message.channel.sendMessage ('Very doubtful');
                   break;
               }
    }
//-------------------------------------------------------------------------------------------------------------------
    if (message.content.startsWith(prefix + "bored"))
    {
        number = 3; 
        var random = Math.floor(Math.random() * (number -1 + 1)) +1;
        switch(random){ 
            case 1:  message.channel.sendMessage('Watch this video! https://www.youtube.com/watch?v=cTdOJUNCFFQ'); 
            break;
            case 2: message,channel.sendMessage('BORED?? Just join the Retro Minecraft server, that will cure your boredom');
            break;
            case 3: message.channel.sendMessage('Watch this video about Minecraft! DO IT!!! https://www.youtube.com/watch?v=Agc4YLmxT88');
            break;
        }
    }
//-------------------------------------------------------------------------------------------------------------------
    if (message.content.startsWith(prefix + "russian"))
    {
        number = 6; 
                        var random = Math.floor(Math.random() * (number -1 + 1)) +1;
                        switch(random){         
            case 1:  message.reply ( 'You lived');
                    break;
            case 2:  message.reply ('You lived');
                    break;
            case 3:  message.reply ('You lived');
                    break;
            case 4:  message.reply ('You Dead af bitch');
                    break;
            case 5: message.reply ('you lived');
                    break;
            case 6: message.reply ('You lived');
                    break;
         }
    }
//-------------------------------------------------------------------------------------------------------------------
    if (message.content.startsWith(prefix + "tendies"))
    {
        message.channel.sendMessage('https://www.youtube.com/watch?v=HbvXwJU6BbE')
    }
//------------------------------------------------------------------------------------------------------------------
    if (message.content.startsWith(prefix + "noods"))
    {
        number = 5; 
        var random = Math.floor(Math.random() * (number -1 + 1)) +1;
        switch(random){    
    case 1:message.channel.sendMessage ('Here are Linux noods', { files: ["noods.jpg"] });  
    break;
    case 2: message.channel.sendMessage ('Here are Pizza Henry noods', { files: ["pizza.jpg"] });  
    break;
    case 3: message.channel.sendMessage ('Here are chknpi noods', { files: ["chicken.jpg"] });   
    break;
    case 4: message.channel.sendMessage ('Here are GarlicBread noods', { files: ["garlic.jpg"] });    
    break;
    case 5: message.channel.sendMessage('Here are Anti-ifunny Watermark noods', { files: ["Seabear.jpg"] });     
    break;
        }
    }
    if (message.content.startsWith(prefix + "count"))
    {
        message.channel.sendMessage('https://www.youtube.com/watch?v=6AXPnH0C9UA&t=36s');
    }
//---------------------------------------------------------------------------------------------------------------
// Add Shame,secret,jun,ban (ect secret cmds)
//----------------------------------------------------------------------------------------------------------------
        
});
