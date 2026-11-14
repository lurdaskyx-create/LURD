
export default Object.freeze({
  botTitle: "🤖 𝗟𝗨𝗥𝗗𝗔𝗦𝗞𝗬",

  menu: {
    top: "╭──〔 ",
    titleEnd: " 〕",
    infoLine: "│  ◇ ",
    itemLine: "│  › ",
    blankLine: "│",
    bottom: "╰────────────────"
  },

  sections: [
    { key: "General", title: "⌂ 𝗚𝗘𝗡𝗘𝗥𝗔𝗟", categories: ["General"] },
    { key: "AI & Chat", title: "◈ 𝗔𝗜 𝗖𝗛𝗔𝗧", categories: ["AI & Chat"] },
    { key: "AI Media", title: "✧ 𝗔𝗜 𝗠𝗘𝗗𝗜𝗔", categories: ["AI Media"] },
    { key: "News Desk", title: "▤ 𝗡𝗘𝗪𝗦 𝗗𝗘𝗦𝗞", categories: ["News"] },
    { key: "Group Tools", title: "♧ 𝗚𝗥𝗢𝗨𝗣 𝗧𝗢𝗢𝗟𝗦", categories: ["Group"] },
    { key: "Downloads", title: "⇩ 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗦", categories: ["Downloads"] },
    {
      key: "Fun Games",
      title: "♧ 𝗙𝗨𝗡 𝗚𝗔𝗠𝗘𝗦",
      commandNames: ["calc", "poll", "coinflip", "dice", "8ball", "choose", "trivia", "riddle", "activity", "pokemon"]
    },
    {
      key: "Fun Mix",
      title: "✦ 𝗙𝗨𝗡 𝗠𝗜𝗫",
      categories: ["Fun"],
      excludeNames: ["pokemon"]
    },
    {
      key: "Anime Info",
      title: "◇ 𝗔𝗡𝗜𝗠𝗘 𝗜𝗡𝗙𝗢",
      categories: ["Anime Info", "Anime Rankings"]
    },
    {
      key: "Anime Art",
      title: "▧ 𝗔𝗡𝗜𝗠𝗘 𝗔𝗥𝗧",
      categories: ["Anime Random", "Anime Tools", "Anime Images"]
    },
    {
      key: "Anime GIFs",
      title: "▣ 𝗔𝗡𝗜𝗠𝗘 𝗚𝗜𝗙𝗦",
      commandNames: ["angry","baka","bleh","blowkiss","blush","bored","carry","clap","confused","cry","cuddle","dance","facepalm","feed","handhold","handshake","happy","highfive"]
    },
    {
      key: "Anime Reactions",
      title: "♡ 𝗔𝗡𝗜𝗠𝗘 𝗥𝗘𝗔𝗖𝗧𝗜𝗢𝗡𝗦",
      commandNames: ["hug","kabedon","kiss","lappillow","laugh","lurk","nod","nom","nope","nya","pat","peck","poke","pout","run","salute","shake"]
    },
    {
      key: "Anime Moves",
      title: "↗ 𝗔𝗡𝗜𝗠𝗘 𝗠𝗢𝗩𝗘𝗦",
      commandNames: ["shocked","shrug","sip","sleep","smile","smug","spin","stare","teehee","think","thumbsup","tickle","wag","wave","wink","yawn","yeet"]
    },
    { key: "Canvas Tools", title: "▧ 𝗖𝗔𝗡𝗩𝗔𝗦 𝗧𝗢𝗢𝗟𝗦", categories: ["Canvas"] },
    { key: "Media Tools", title: "⚙ 𝗠𝗘𝗗𝗜𝗔 𝗧𝗢𝗢𝗟𝗦", categories: ["Media & Tools"] },
    { key: "Chat Privacy", title: "⌑ 𝗖𝗛𝗔𝗧 𝗣𝗥𝗜𝗩𝗔𝗖𝗬", categories: ["Chat & Privacy"] },
    { key: "Status Tools", title: "▣ 𝗦𝗧𝗔𝗧𝗨𝗦 𝗧𝗢𝗢𝗟𝗦", categories: ["Status"] },
    { key: "Owner Tools", title: "♛ 𝗢𝗪𝗡𝗘𝗥 𝗧𝗢𝗢𝗟𝗦", categories: ["Owner"] }
  ]
});
