
export default Object.freeze({
  botTitle: "ﮩ٨ـﮩﮩ٨ـL U R D'乂'𓃶",

  menu: {
    top: "┌──「 ",
    titleEnd: " 」",
    infoLine: "│  ",
    itemLine: "├─ ",
    blankLine: "│",
    bottom: "└────────────────"
  },

  sections: [
    { key: "General", title: "⌂ GENERAL", categories: ["General"] },
    { key: "AI & Chat", title: "✧ AI & CHAT", categories: ["AI & Chat"] },
    { key: "AI Media", title: "◈ AI MEDIA", categories: ["AI Media"] },
    { key: "News Desk", title: "▤ NEWS DESK", categories: ["News"] },
    { key: "Group Tools", title: "♧ GROUP TOOLS", categories: ["Group"] },
    { key: "Downloads", title: "↓ DOWNLOADS", categories: ["Downloads"] },

    {
      key: "Fun Games",
      title: "◇ FUN GAMES",
      commandNames: ["calc", "poll", "coinflip", "dice", "8ball", "choose", "trivia", "riddle", "activity", "pokemon"]
    },

    {
      key: "Fun Mix",
      title: "✿ FUN MIX",
      categories: ["Fun"],
      excludeNames: ["pokemon"]
    },

    {
      key: "Anime Info",
      title: "❀ ANIME INFO",
      categories: ["Anime Info", "Anime Rankings"]
    },

    {
      key: "Anime Art",
      title: "▧ ANIME ART",
      categories: ["Anime Random", "Anime Tools", "Anime Images"]
    },

    {
      key: "Anime GIFs",
      title: "▷ ANIME GIFS",
      commandNames: ["angry","baka","bleh","blowkiss","blush","bored","carry","clap","confused","cry","cuddle","dance","facepalm","feed","handhold","handshake","happy","highfive"]
    },

    {
      key: "Anime Reactions",
      title: "♡ ANIME REACTIONS",
      commandNames: ["hug","kabedon","kiss","lappillow","laugh","lurk","nod","nom","nope","nya","pat","peck","poke","pout","run","salute","shake"]
    },

    {
      key: "Anime Moves",
      title: "⚡ ANIME MOVES",
      commandNames: ["shocked","shrug","sip","sleep","smile","smug","spin","stare","teehee","think","thumbsup","tickle","wag","wave","wink","yawn","yeet"]
    },

    { key: "Canvas Tools", title: "▧ CANVAS TOOLS", categories: ["Canvas"] },
    { key: "Media Tools", title: "⚙ MEDIA TOOLS", categories: ["Media & Tools"] },
    { key: "Chat Privacy", title: "◉ CHAT PRIVACY", categories: ["Chat & Privacy"] },
    { key: "Status Tools", title: "▣ STATUS TOOLS", categories: ["Status"] },
    { key: "Owner Tools", title: "♛ OWNER TOOLS", categories: ["Owner"] }
  ]
});
