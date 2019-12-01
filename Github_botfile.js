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
//------------------------------------------------------------------------------------------------------
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

   // console.log(message.author.username + ' now has ' + userStats.xp)
    //console.log(xpToNextLevel + ' xp needed for next level.')
    }

//-------------------------------------------Shows list of commands--------------------------------------------------
 if (message.content.startsWith(prefix + "help"))
{    
        message.reply(' Try these keywords after' + ' ' +  '^' + ' ' +  '(stats,ping,ifunny,hi,winux,insult,magic,bored,russian,tendies,noods,count,food,air,machine,boom)');
        
        }
//-------------------------------------Secert commands for staff----------------------------------------------------
if (message.content.startsWith(prefix + "staff")){
    message.reply('Try these hidden keywords after' + ' ' + '^' + ' ' + '(shame,ban)')
}

if (message.content.startsWith(prefix + "food"))
{
    var food =['chicken tendies',
        'pasta',
        'salad',
        'burger',
        'tacos',
        'pizza',
        'grilled cheese',
        'EGG',
        'PB & J',
        'chili',
        'Chicken wrap',
        'mac n cheese',
        'nothing..STARVE!!!!'
    ]

    var eat = food[ Math.floor(Math.random() * food.length) ];
        message.reply(eat);

}
//---------------------------------------------------------------------------------------------------------------
 /* if (message.content.startsWith(prefix + "say"))
 {
     message.channel.sendMessage(message.content.;
 } */
//----------------------------------Auto reply to torvic-----------------------------------------------------------
       if (message.author.id == ('234511563808178196') || message.author.id == ("596936209217880084") || message.author.id == ("320737915908915200") && message.channel.id ==('414962144195379220')){
            message.channel.sendMessage( message.author.username + 'Is a BooMER');
           message.channel.sendMessage({files: ['ifunny.jpg']});
        }

//--------------------------------------Auto reply to Chknpi--------------------------------------------------------
       /*  if (message.author.id == ('467654269311647744') && message.channel.id ==('414962144195379220'))
        {
           message.channel.sendMessage( message.author.username + 'Is a BooMER');
        } */
//--------------------------------------------To test bot working---------------------------------------------------
    if (message.content.startsWith(prefix + "ping"))
    {
        message.channel.sendMessage('Pong');
    }
//-----------------------------------------To shame luna when she forgets-------------------------------------------
    // if (message.content.startsWith(prefix + "shame"))
    // {
    //     message.channel.sendMessage('You forgot to do something', {files: ["shame.jpg"] });
    // }
//---------------------------------------Show player current level and XP------------------------------------------
    if (message.content.startsWith(prefix + "stats")){
        message.reply(' is level ' + userStats.level)
        message.channel.sendMessage(' and has ' + userStats.xp + ' xp')
        message.channel.sendMessage(xpToNextLevel + 'xp Is needed for the next level.')
    }
//-------------------------------------------ifunny tag----------------------------------------------------------
    if (message.content.startsWith(prefix + "ifunny"))
    {
        message.channel.sendMessage({files: ['ifunny.jpg']});
    }
//----------------------------------------------bot says bye..---------------------------------------------
    if (message.content.startsWith(prefix + "bye"))
    {
        message.reply('How dare you leave me??! I will find you, and kill you!')
    }
//------------------------------------------Bot says hi--------------------------------------------------------
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
//--------------------------------------Sorry not sorry linux------------------------------------------------------
    if (message.content.startsWith(prefix + "winux"))
    {
            message.channel.sendMessage( "<@" + 196480010637279232 +  ">" + ' ' + 'BOK', {files: ['winux.jpg']});
    }
//--------------------------------------------Gotta insult people---------------------------------------------------
    if (message.content.startsWith(prefix + "insult"))
    {
        var insults = [ "Your bad kid",
                "Your a pee pee poo poo pants",
                "You fucking donkey",
                "bro whats that smell??I hope that aint Your smell, because it smells like jun...... ew.....",
                "Your mother was a hamster and your father smells of elderberries",
                "Eat my watermark",
                "I bet you shower naked. YOU SLUT!",
                "What are you? Some sort of military test gone wrong??",
                "You are the cum shot your mother shoulda swallowed",
                "Your a IQ of 3 kinda person",
                //"Just because its october does not mean you can wear your furry suit outside!",
                "You block head lookin ass",
                "Ima be real with chu chief. I just plain out dont like you",
                "Whos a little brit across the sea? YOU ARE",
                "Watch out! I heard the US army was gonna invade your body, because you use so much essential oil shit.",
                "You are smooth brained",
                "You use small brain time",
                "You fall for all them fake reward virus/scam sites"
                ]
       
                var insult = insults[ Math.floor(Math.random() * insults.length) ];
        message.channel.sendMessage(insult);
    }
//----------------------------------------------ask the magic 8 ball------------------------------------------------
    if (message.content.startsWith(prefix + "magic"))
    { 
        var magics = ['It is certain',
        'It is decidedly so',
        'Without a doubt',
        'Yes - definitely',
        'You may rely on it',
        'As I see it, yes.',
        'Most likely',
        'Outlook good',
        'Yes',
        'Signs point to yes',
        'Reply hazy,try again',
        'Ask again later',
        'Better not tell you now',
        'Cannot predict now',
        'Concentrate and ask again',
        'Dont count on it',
        'My reply is no',
        'My sources say no',
        'Outlook not so good',
        'Very doubtful'
    ]

    var magic = magics[ Math.floor(Math.random() * magics.length) ];
    message.channel.sendMessage(magic);
    }
//----------------------------------------------When you get bored--------------------------------------------------
    if (message.content.startsWith(prefix + "bored"))
    {
        var bored = ['Watch this video! https://www.youtube.com/watch?v=cTdOJUNCFFQ',
        'BORED?? Just join the Retro Minecraft server, that will cure your boredom',
        'Watch this video about Minecraft! DO IT!!! https://www.youtube.com/watch?v=Agc4YLmxT88'
    ]
        var bore = bored[ Math.floor(Math.random() * bored.length)];
        message.channel.sendMessage(bore);
    }
//-----------------------------------------Russian roullete--------------------------------------------------------
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
//-----------------------------------------------Chicken tendies song------------------------------------------------
    if (message.content.startsWith(prefix + "tendies"))
    {
        message.channel.sendMessage('https://www.youtube.com/watch?v=HbvXwJU6BbE')
    }
//--------------------------------------------Just some family friendly noods---------------------------------------
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
//----------------------------------------------A edited Count song----------------------------------------------
    if (message.content.startsWith(prefix + "count"))
    {
        message.channel.sendMessage('https://www.youtube.com/watch?v=6AXPnH0C9UA&t=36s');
    }
//---------------------------------------------------------------------------------------------------------------
            
//-------------------------------------------The fake ban----------------------------------------------------------
if (message.content.startsWith(prefix + "ban")){
                            //bot.kick ({
                               // userID: '234511563808178196'
                           // });
        message.channel.sendMessage('Alright time to hit that ban hammer', {files: ["ban.jpg"] });
} 

//-------------------------------------------Machine gun gif----------------------------------------------------

if (message.content.startsWith(prefix + "machine")){
    
message.channel.sendMessage('Ratatatattaattaatatatatatatattaatatatatatata', {files: ["machine.gif"] });
} 

//-------------------------------Air support gif-----------------------------------------
if (message.content.startsWith(prefix + "air")){
    message.reply('Danger Close', {files: ["ac.gif"] });
} 

//-----------------------------------------house explosion gif------------------------------------
if (message.content.startsWith(prefix + "boom")){
    
message.channel.sendMessage('Target is K.I.A.', {files: ["boom.gif"] });
} 

//-------------------------------------------Me art----------------------------------------------------------
if (message.content.startsWith(prefix + "art")){ 
    message.channel.sendMessage('me art tho', {files: ["art.jpg"] });
    } 
//-----------------------------------to shame luna----------------------------
    if (message.content.startsWith(prefix + "luna")){ 
        message.channel.sendMessage('How could YOU??', {files: ["luna2.mp4"] });
        } 

//--------------------------------------------yobamos for chknpi-----------------------
if (message.content.startsWith(prefix + "yobamos") && message.author.id == ('467654269311647744')){ 
    message.channel.sendMessage('OMG its Yobamos!', {files: ["yobamos.jpg"] });
    } 

    if (message.content.startsWith(prefix + "yobamos") && message.author.id == ('257723194331496448')){ 
        message.channel.sendMessage('OMG its Yobamos!', {files: ["yobamos.jpg"] });
        } 

//------------------------------------------brief description--------------------------------------------------------------
if (message.content.startsWith(prefix + "info")){
    message.channel.sendMessage('I am a discord bot, programmed to do various things for your entertainment')
}
//----------------------------------------------says who made bot-------------------------------------------------------
if (message.content.startsWith(prefix + "creator")){
    message.channel.sendMessage('I was created, and programmed by Gangster')
}
//-----------------------------------------------------------------------------------------------------------------
// secret,jun(ect secret cmds)
//----------------------------------------------------------------------------------------------------------------
        
});
