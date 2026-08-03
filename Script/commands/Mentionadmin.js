module.exports.config = {
  name: "adminmention",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "MAHADI Ai Bot",
  description: "Bot will reply only when someone directly mentions an admin",
  commandCategory: "Other",
  usages: "@",
  cooldowns: 1
};

module.exports.handleEvent = function({ api, event }) {
  const adminIDs = [
    "693990838"
  ].map(String);

  // Admin নিজে মেসেজ দিলে রিপ্লাই করবে না
  if (adminIDs.includes(String(event.senderID))) return;

  // Reply message এ কাজ করবে না
  if (event.type === "message_reply" || event.messageReply) return;

  // কোনো Mention না থাকলে কিছু করবে না
  if (!event.mentions || Object.keys(event.mentions).length === 0) return;

  const mentionedIDs = Object.keys(event.mentions).map(String);

  // Admin Mention করা হয়েছে কিনা
  if (!adminIDs.some(id => mentionedIDs.includes(id))) return;

  const replies = [
    "ডাকাডাকি করিস না, বস ব্যস্ত আছে 😒😌",
    "বস, একজন আপনাকে মেনশন করেছে 😑😃",
    "বস এখন ব্যস্ত আছে, পরে আবার মেনশন করো 🙂",
    "যা বলার আমাকে বল, বস পরে দেখে নেবে 😉",
    "কিরে! বসকে এত মেনশন দিস কেন? 😾🫵",
    "বস এখন অফলাইনে আছে 😴",
    "বস এখন আমার সাথে মিটিংয়ে আছে 😎",
    "বসকে একটু শান্তিতে থাকতে দে 😌",
    "এত মেনশন না দিয়ে একটু ধৈর্য ধর ❤️",
    "বসকে বিরক্ত করিস না, উনি গুরুত্বপূর্ণ কাজে ব্যস্ত 🤍",
    "বসকে ডাকছিস কেন? কোনো দরকার থাকলে ইনবক্সে নক দে 📩",
    "বসকে মেনশন দিয়ে লাভ নেই, উনি পরে সব দেখবেন 😅",
    "মেনশন কম দে, সম্মান বেশি দে 😎",
    "বসের নাম এত ডাকিস না, কাজে মন দে 😁"
  ];

  return api.sendMessage(
    replies[Math.floor(Math.random() * replies.length)],
    event.threadID,
    event.messageID
  );
};

module.exports.run = async function() {};
