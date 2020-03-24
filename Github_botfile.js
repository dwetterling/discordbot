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
    bot.user.setActivity('Shoot the Hacker');
    
});


//const commando = require('discord.js-commando');
const prefix = ('^');

var stats = {};
if(fs.existsSync('stats.json')){
    stats = jsonfile.readFileSync('stats.json');
}

bot.on('message', (message) => {
    if(message.author.id == bot.user.id)
return;
    message == message.content.toLowerCase(message);
//------------------------------------------------------------------------------------------------------
//Player levels


msg = message.content.toLowerCase();

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
 if (msg.startsWith(prefix + "help"))
{    
    var botCommands = new discord.RichEmbed()
    .setTitle("How to use the Chicken Tendies bot")
    .setThumbnail(message.author.avatarURL)
    .addField("Command usage","Use the ^ icon before these words to use that command")
    .addField("stats", "Display's your stats on Retro")
    .addField("ping", "Replies pong")
    .addField("ifunny", "Sends ifunny watermark")
    .addField("hi", "Sends a lovely picture of a doggo")
    .addField("insult", "Insults you")
    .addField("magic", "Acts like a magic 8 ball")
    .addField("bored", "Suggests something to do if bored")
    .addField("russian", "let's you play a deadly game")
    .addField("tendies", "Supplies a link for the tendies song")
    .addField("winux", "Make fun of Linux")
    .addField("food", "Gives a food item for you to eat")
    .addField("air", "Calls in air support")
    .addField("machine", "Pulls out a machine gun")
    .addField("boom", "Blows up a house")
    .addField("say", "Will say anything you tell it to")
    .addField("weewoo", "Sends the police")
    .addField("gunturtle", "The turtle will have its revenge")
    .addField("vibecheck", "Prepares to check ye vibe")
    .addField("vibes", "Tells you what your vibe is")
    .setColor(0x0000FF)
    .setFooter("Hope you have fun with these commands")

    message.channel.sendEmbed(botCommands);
}
       
//-------------------------------------Secert commands for staff----------------------------------------------------
if (msg.startsWith(prefix + "staff")){
    message.delete();
    message.reply('Try these hidden keywords after' + ' ' + '^' + ' ' + '(ban,luna,spam)')
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
 
//--------------------------------------------To test bot working---------------------------------------------------
    if (msg.startsWith(prefix + "ping"))
    {
        message.delete();
        message.channel.sendMessage('Pong');
    }
//-----------------------------------------To shame luna when she forgets-------------------------------------------
//---------------------------------------Show player current level and XP------------------------------------------
    if (msg.includes(prefix + "stats")){
        message.delete();
        message.reply(' is level ' + userStats.level)
        message.channel.sendMessage(' and has ' + userStats.xp + ' xp')
        message.channel.sendMessage(xpToNextLevel + 'xp Is needed for the next level.')
    }
//-------------------------------------------ifunny tag----------------------------------------------------------
    if (msg.startsWith(prefix + "ifunny"))
    {
        message.delete();
        message.channel.sendMessage({files: ['ifunny.jpg']});
    }
//----------------------------------------------bot says bye..---------------------------------------------
    if (msg.startsWith(prefix + "bye"))
    {
        message.delete();
        message.reply('How dare you leave me??! I will find you, and kill you!')
    }
//------------------------------------------Bot says hi--------------------------------------------------------
    if (msg.startsWith(prefix + "hi"))
    {
        message.delete();
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
    if (msg.startsWith(prefix + "winux"))
    {
        message.delete();
            message.channel.sendMessage( "<@" + 196480010637279232 +  ">" + ' ' + 'BOK', {files: ['winux.jpg']});
    }
//--------------------------------------------Gotta insult people---------------------------------------------------
    if (msg.startsWith(prefix + "insult"))
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
                "You fall for all them fake reward virus/scam sites",
                "You are a dodo bird"
                ]
       
                var insult = insults[ Math.floor(Math.random() * insults.length) ];
        message.channel.sendMessage(insult);
    }
//----------------------------------------------ask the magic 8 ball------------------------------------------------
    if (msg.startsWith(prefix + "magic"))
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
    if (msg.startsWith(prefix + "bored"))
    {
        message.delete();
        var bored = ['Watch this video! https://www.youtube.com/watch?v=cTdOJUNCFFQ',
        'BORED?? Just join the Retro Minecraft server, that will cure your boredom',
        'Watch this video about Minecraft! DO IT!!! https://www.youtube.com/watch?v=Agc4YLmxT88'
    ]
        var bore = bored[ Math.floor(Math.random() * bored.length)];
        message.channel.sendMessage(bore);
    }
//-----------------------------------------Russian roullete--------------------------------------------------------
    if (msg.startsWith(prefix + "russian"))
    {
        message.delete();
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
    if (msg.startsWith(prefix + "tendies"))
    {
        message.delete();
        message.channel.sendMessage('https://www.youtube.com/watch?v=HbvXwJU6BbE')
    }
//--------------------------------------------Just some family friendly noods---------------------------------------
    if (msg.startsWith(prefix + "noods"))
    {
        message.delete();
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
    if (msg.startsWith(prefix + "count"))
    {
        message.delete();
        message.channel.sendMessage('https://www.youtube.com/watch?v=6AXPnH0C9UA&t=36s');
    }
//---------------------------------------------------------------------------------------------------------------
            
//-------------------------------------------The fake ban----------------------------------------------------------
if (msg.startsWith(prefix + "ban")){
    message.delete();
                            //bot.kick ({
                               // userID: '234511563808178196'
                           // });
        message.channel.sendMessage('Alright time to hit that ban hammer', {files: ["ban.jpg"] });
} 

//-------------------------------------------Machine gun gif----------------------------------------------------

if (msg.startsWith(prefix + "machine")){
    message.delete();
message.channel.sendMessage('Ratatatattaattaatatatatatatattaatatatatatata', {files: ["machine.gif"] });
} 

//-------------------------------Air support gif-----------------------------------------
if (msg.startsWith(prefix + "air")){
    message.delete();
    message.reply('Danger Close', {files: ["ac.gif"] });
} 

//-----------------------------------------house explosion gif------------------------------------
if (msg.startsWith(prefix + "boom")){
    message.delete();
message.channel.sendMessage('Target is K.I.A.', {files: ["boom.gif"] });
} 

//-------------------------------------------Me art----------------------------------------------------------
if (msg.startsWith(prefix + "art")){ 
    message.delete();
    message.channel.sendMessage('me art tho', {files: ["art.jpg"] });
    } 
//-----------------------------------to shame luna----------------------------
    if (msg.startsWith(prefix + "luna")){ 
        message.delete();
        message.channel.sendMessage('How could YOU??', {files: ["luna2.mp4"] });
        } 

//--------------------------------------------yobamos for chknpi-----------------------
if (msg.startsWith(prefix + "yobamos") && message.author.id == ('467654269311647744')){ 
    message.delete();
    message.channel.sendMessage('OMG its Yobamos!', {files: ["yobamos.jpg"] });
    } 

    if (msg.startsWith(prefix + "yobamos") && message.author.id == ('257723194331496448')){ 
        message.delete();
        message.channel.sendMessage('OMG its Yobamos!', {files: ["yobamos.jpg"] });
        } 

//-------------------------------------------brief description------------------------------------------------------
if (msg.startsWith(prefix + "info")){
    message.delete();
    message.channel.sendMessage('I am a discord bot, programmed to do various things for your entertainment')
}
//---------------------------------------------says who made bot-----------------------------------------------------
if (msg.startsWith(prefix + "creator")){
    message.delete();
    message.channel.sendMessage('I was created, and programmed by Gangster')
}
//--------------------------------------------------------------------------------------------------------------
if (msg.startsWith(prefix + "trickery")){

}
//--------------------------------------------VIBE check!-----------------------------------------
if (msg.startsWith(prefix + "vibecheck")){
    
   
    message.channel.sendMessage('Now checking their vibes', {files: ["vibe.jpg"] });

    
}


 
if (msg.startsWith(prefix + "vibes")){

    var vibes = ['Good',
    'EVIL'
    ]

    var vibe = vibes[ Math.floor(Math.random() * vibes.length) ];
    message.channel.sendMessage('They have a' + ' ' + vibe +' ' + 'vibe');
} 


//--------------------------------------------------WEEWOOO----------------------
if (msg.startsWith(prefix + "weewoo")){
    message.delete();
    message.channel.sendMessage('Police are on route', {files: ["WeeWoo.jpg"] });
}
//------------------------------------SPC 1048-------------------------------------

//-----------------------------------------SPAM (staff only access)-----------------------------------------
if (msg.startsWith(prefix + "spam") && message.author.id ==('257723194331496448')){
    i = 0;
    while(i < 10){
        message.channel.send (message.content.slice(5, message.content.length));
        i++;
    }
}

if (msg.startsWith(prefix + "spam") && message.author.id ==('196480010637279232')){
    i = 0;
    while(i < 50){
        message.channel.send (message.content.slice(5, message.content.length));
        
    
    }
}

if (msg.startsWith(prefix + "spam") && message.author.id ==('203612528066953216')){
    i = 0;
    while(i < 50){
        message.channel.send (message.content.slice(5, message.content.length));
        i++;
    }
}


//------------------------------------Say--------------------
if (msg.startsWith(prefix + "say"))
{
    if (message.author.id == ('241427366549651467')){
        message.channel.send ('Sorry Jun but I will not allow you to tell me what to say')
        return;
    }

    
    if (message.author.id == ('270045200771055616')){
        message.channel.send ('Sorry Destiny, But i am under orders to not say anything you tell me to')
        return;
    }

    if (message.author.id == ('342128038047383561')){
        message.channel.send ('Why do you try and use me to say things N256')
        return;
    }

    if (message.author.id == ('467654269311647744')){
        message.channel.send ('Chknpi stop dming me your nudes')
        return;
    }

    if (message.author.id == ('527212357282299922')){
        message.reply ('Shutup you wEeD SmOkER')
        return;
    }

    if (message.author.id == ('561956430857633816')){
        message.reply ('I dont let hoes like you tell me what to do')
        return;
    }

    if (message.author.id == ('629048269380648973')){
        message.reply ('Does Brooke know you just Dmd me your nudes?')
        return;
    }
    
    
else {
    
    message.delete();
    message.channel.send (message.content.slice(5, message.content.length));
}
}


//-------------------------------------------------------------------------------------------------
if (msg.startsWith(prefix + "gunturtle")){
    message.delete();
    message.channel.send('This is  for my brother who choked on a straw!', {files: ['gunturtle.jpg'] });
}
//------------------------------------------------------------------------------------------------

//---------------------------------------Yoshi----------------------------------------------------
if (msg.includes("jello") && msg.includes("yoshi")){
    message.channel.sendMessage({files: ["yoshi.gif"]});
}

//-------------------------------------------------------Herobrine-----------------------------------------
if (msg.includes("herobrine")){
    message.channel.sendMessage({files: ["herobrine.gif"]});
}

//----------------------------------------------------------------------------------------
if (msg.includes(prefix + "stop")){
    message.channel.sendMessage({files: ["stop.gif"]})
}
//------------------------------------------------------------------
if (msg.includes(prefix + "sin")){
    message.channel.sendMessage({files: ["sin.jpg"]})
}
//-----------------------------------------------------------------
if (msg.includes("i") && message.content.includes("like") && message.content.includes("apple")){
    message.channel.sendMessage({files: ["apple.jpg"]});
}

if (msg.includes("trump")){
    message.channel.sendMessage({files: ["trump.mp4"]});
}

if (message.author.id == ('662086772834041877')){
if(msg.includes("joined the server for the first time") && (message.channel.id == ('662121167066234909'))){
    message.channel.sendMessage("Welcome to Retro")}
else if(msg.includes("joined the server") && (message.channel.id == ('662121167066234909'))){
        message.channel.sendMessage("Welcome back to Retro")
}}

if (msg.includes(" hypixel")){
    if (msg.includes("dont play on")){
       message.reply("Damn right dont play on that ||piece of shit|| server")
}
   else{
       message.reply("Dont make me ban your ||ass|| you little ||bitch||")
   }
}



if (msg.includes("bruh")){
    message.channel.sendMessage({files: ["bruh.mp4"]});
}

if (msg.includes(prefix + "freedom")){
    message.channel.sendMessage({files: ["step8.mp4"]})
}

if(msg.includes("minecraft")){
    number = 2;
    var random = Math.floor(Math.random() * (number -1 + 1)) +1;
    switch(random){
    case 1: message.channel.sendMessage("Play on this lovely server!");
    message.channel.sendMessage("https://discord.gg/RjzdQwx");
    break;
    case 2: message.channel.sendMessage("Watch this lovely video! https://youtu.be/P6maopA50DY  ");
    break;
}
}

   

//-----------------------------------------------------------------------------------------------------------------
// secret,jun(ect secret cmds)
//----------------------------------------------------------------------------------------------------------------
        
});