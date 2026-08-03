const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports.config = {
    name: "help",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "SHAHADAT SAHU",
    description: "Shows all commands with details",
    commandCategory: "system",
    usages: "[command name/page number]",
    cooldowns: 5,
    envConfig: {
        autoUnsend: true,
        delayUnsend: 20
    }
};

module.exports.languages = {
    "en": {
        "moduleInfo": `╭━━━━━━━━━━━━━━━━╮
┃ ✨ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐈𝐍𝐅𝐎 ✨
┣━━━━━━━━━━━┫
┃ 🔖 Name: %1
┃ 📄 Usage: %2
┃ 📜 Description: %3
┃ 🔑 Permission: %4
┃ 👨‍💻 Credit: %5
┃ 📂 Category: %6
┃ ⏳ Cooldown: %7s
┣━━━━━━━━━━━━━━━━┫
┃ ⚙ Prefix: %8
┃ 🤖 Bot Name: %9
┃ 👑 Owner: 𝐌𝐀𝐇𝐀𝐃𝐈  𝐂𝐡𝐚𝐭 𝐁𝐨𝐭
╰━━━━━━━━━━━━━━━━╯`,
        "helpList": "[ There are %1 commands. Use: \"%2help commandName\" to view more. ]",
        "user": "User",
        "adminGroup": "Admin Group",
        "adminBot": "Admin Bot"
    }
};

// 🔹 এখানে আপনার ফটো Imgur লিংক করে বসাবেন ✅
const helpImages = [
    "https://i.postimg.cc/Z9JwjYX9/file-00000000eb0c820a9d2bb0b3ba1d0bba.png",
    "https://i.postimg.cc/4KFptJGR/file-00000000566081f4ba743a077d3e9bb0.png",
    "https://i.postimg.cc/7GG0npHF/file-00000000c5e481f4abd1fb16a25303b1.png",
    "https://i.postimg.cc/G88GxZLN/file-00000000f81081f4b070c075047e4a02.png"
];


function downloadImages(callback) {
    const randomUrl = helpImages[Math.floor(Math.random() * helpImages.length)];
    const filePath = path.join(__dirname, "cache", "help_random.jpg");

    request(randomUrl)
        .pipe(fs.createWriteStream(filePath))
        .on("close", () => callback([filePath]));
}

module.exports.handleEvent = function ({ api, event, getText }) {
    const { commands } = global.client;
    const { threadID, messageID, body } = event;

    if (!body || typeof body === "undefined" || body.indexOf("help") != 0) return;  
    const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);  
    if (splitBody.length < 2 || !commands.has(splitBody[1].toLowerCase())) return;  

    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};  
    const command = commands.get(splitBody[1].toLowerCase());  
    const prefix = threadSetting.PREFIX || global.config.PREFIX;  

    const detail = getText("moduleInfo",  
        command.config.name,  
        command.config.usages || "Not Provided",  
        command.config.description || "Not Provided",  
        command.config.hasPermssion,  
        command.config.credits || "Unknown",  
        command.config.commandCategory || "Unknown",  
        command.config.cooldowns || 0,  
        prefix,  
        global.config.BOTNAME || "𝐌𝐀𝐇𝐀𝐃𝐈  𝐂𝐡𝐚𝐭 𝐁𝐨𝐭"  
    );  

    downloadImages(files => {  
        const attachments = files.map(f => fs.createReadStream(f));  
        api.sendMessage({ body: detail, attachment: attachments }, threadID, () => {  
            files.forEach(f => fs.unlinkSync(f));  
        }, messageID);  
    });
};

module.exports.run = function ({ api, event, args, getText }) {
    const { commands } = global.client;
    const { threadID, messageID } = event;

    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};  
    const prefix = threadSetting.PREFIX || global.config.PREFIX;  

    if (args[0] && commands.has(args[0].toLowerCase())) {  
        const command = commands.get(args[0].toLowerCase());  

        const detailText = getText("moduleInfo",  
            command.config.name,  
            command.config.usages || "Not Provided",  
            command.config.description || "Not Provided",  
            command.config.hasPermssion,  
            command.config.credits || "Unknown",  
            command.config.commandCategory || "Unknown",  
            command.config.cooldowns || 0,  
            prefix,  
            global.config.BOTNAME || "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭"  
        );  

        downloadImages(files => {  
            const attachments = files.map(f => fs.createReadStream(f));  
            api.sendMessage({ body: detailText, attachment: attachments }, threadID, () => {  
                files.forEach(f => fs.unlinkSync(f));  
            }, messageID);  
        });  
        return;  
    }  

    const arrayInfo = Array.from(commands.keys())
        .filter(cmdName => cmdName && cmdName.trim() !== "")
        .sort();  

    const page = Math.max(parseInt(args[0]) || 1, 1);  
    const numberOfOnePage = 20;  
    const totalPages = Math.ceil(arrayInfo.length / numberOfOnePage);  
    const start = numberOfOnePage * (page - 1);  
    const helpView = arrayInfo.slice(start, start + numberOfOnePage);  

    let msg = helpView.map(cmdName => `┃ ✪ ${cmdName}`).join("\n");

    const text = `╭━━━━━━━━━━━━━━━━╮
┃ 📜 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓 📜
┣━━━━━━━━━━━━━━━┫
┃ 📄 Page: ${page}/${totalPages}
┃ 🧮 Total: ${arrayInfo.length}
┣━━━━━━━━━━━━━━━━┫
${msg}
┣━━━━━━━━━━━━━━━━┫
┃ ⚙ Prefix: ${prefix}
┃ 🤖 Bot Name: ${global.config.BOTNAME || "𝐌𝐀𝐇𝐀𝐃𝐈 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭"}
┃ 👑 Owner: 𝐌𝐀𝐇𝐀𝐃𝐈 𝐇𝐀𝐒𝐀𝐍 𝐑𝐎𝐍𝐘
╰━━━━━━━━━━━━━━━━╯`;

    downloadImages(files => {  
        const attachments = files.map(f => fs.createReadStream(f));  
        api.sendMessage({ body: text, attachment: attachments }, threadID, () => {  
            files.forEach(f => fs.unlinkSync(f));  
        }, messageID);  
    });  
};
