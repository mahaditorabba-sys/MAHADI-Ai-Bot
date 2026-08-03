const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
 name: "helpall",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "SHAHADAT SAHU",
 description: "Displays all available commands in one page",
 commandCategory: "system",
 usages: "[No args]",
 cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
 const { commands } = global.client;
 const { threadID, messageID } = event;

 const allCommands = [];

 for (let [name] of commands) {
 if (name && name.trim() !== "") {
 allCommands.push(name.trim());
 }
 }

 allCommands.sort();

 const finalText = `╔═══❖ 🌟 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓 🌟 ❖═══╗
${allCommands.map(cmd => `║ ➔ ${cmd}`).join("\n")}
╠═════🔰 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 🔰═════╣
║ 🤖 𝐁𝐨𝐭: ─꯭─⃝‌‌𝐌𝐀𝐇𝐀𝐃𝐈  𝐂𝐡𝐚𝐭 𝐁𝐨𝐭
║ 👑 𝐎𝐰𝐧𝐞𝐫: 𝐌𝐀𝐇𝐀𝐃𝐈  𝐂𝐡𝐚𝐭 𝐁𝐨𝐭
║ 📦 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬: ${allCommands.length} 
╚═══════════════════════╝`;

 // 🔹 এখানে আপনার ফটো Imgur লিংক করে বসাবেন ✅
 
 const backgrounds = [
    "https://i.postimg.cc/Z9JwjYX9/file-00000000eb0c820a9d2bb0b3ba1d0bba.png",
    "https://i.postimg.cc/7GG0npHF/file-00000000c5e481f4abd1fb16a25303b1.png",
    "https://i.postimg.cc/4KFptJGR/file-00000000566081f4ba743a077d3e9bb0.png",
    "https://i.postimg.cc/G88GxZLN/file-00000000f81081f4b070c075047e4a02.png"
 ];
 const selectedBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
 const imgPath = __dirname + "/cache/helpallbg.jpg";

 const callback = () =>
 api.sendMessage({ body: finalText, attachment: fs.createReadStream(imgPath) }, threadID, () => fs.unlinkSync(imgPath), messageID);

 request(encodeURI(selectedBg))
 .pipe(fs.createWriteStream(imgPath))
 .on("close", () => callback());
};
