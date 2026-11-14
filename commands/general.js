
import { buildMenu } from "../lib/menu.js";

function formatDuration(seconds) {
  let remaining = Math.max(0, Math.floor(Number(seconds) || 0));
  const days = Math.floor(remaining / 86400);
  remaining %= 86400;
  const hours = Math.floor(remaining / 3600);
  remaining %= 3600;
  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const parts = [];

  if (days) parts.push(days + "d");
  if (hours) parts.push(hours + "h");
  if (minutes) parts.push(minutes + "m");
  if (secs || !parts.length) parts.push(secs + "s");

  return parts.join(" ");
}

function messageTimestampMs(message) {
  const raw = message && message.messageTimestamp;
  const value = raw && typeof raw.toNumber === "function"
    ? raw.toNumber()
    : Number(raw);

  if (!Number.isFinite(value) || value <= 0) return null;
  return value > 1000000000000 ? value : value * 1000;
}

function ownerNumber(config) {
  const owners = Array.isArray(config.ownerNumbers) ? config.ownerNumbers : [];
  return String(owners[0] || "").replace(/\D/g, "");
}

const commands = [
  {
    name: "menu",
    aliases: ["helpme"],
    category: "General",
    description: "Show the LURDASKY bot menu and available command sections.",
    run: async ctx => {
      const menu = buildMenu({
        commands: ctx.commands,
        config: ctx.config,
        theme: ctx.theme
      });

      if (ctx.config.imageUrl) {
        try {
          await ctx.send({
            image: { url: ctx.config.imageUrl },
            caption:
              "🤖 *𝗙𝗘𝗜 𝗫𝗠𝗗 𝗕𝗢𝗧*\n" +
              "✦ 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗟𝗨𝗥𝗗𝗔𝗦𝗞𝗬"
          });
        } catch (error) {
          console.warn(
            "FEI XMD menu artwork could not be sent; using the text menu:",
            error?.message || error
          );
        }
      }

      await ctx.reply(menu);
    }
  },

  {
    name: "help",
    category: "General",
    description: "List registered commands and their descriptions.",
    run: async ctx => {
      const rows = (ctx.commands || [])
        .filter(command => !command.hidden)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(command =>
          "› " + ctx.config.prefix + command.name +
          (command.description ? " — " + command.description : "")
        );

      const header =
        "╭──〔 📚 𝗙𝗘𝗜 𝗫𝗠𝗗 𝗛𝗘𝗟𝗣 〕\n" +
        "│  ◇ 𝗥𝗘𝗚𝗜𝗦𝗧𝗘𝗥𝗘𝗗 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦: " + rows.length +
        "\n│\n";

      const chunks = [];
      let current = header;

      for (const row of rows) {
        if (current.length + row.length + 1 > 3300) {
          chunks.push(current.trimEnd());
          current = "╭──〔 📚 𝗙𝗘𝗜 𝗫𝗠𝗗 𝗛𝗘𝗟𝗣 · 𝗖𝗢𝗡𝗧𝗜𝗡𝗨𝗘𝗗 〕\n│\n";
        }
        current += row + "\n";
      }

      if (current.trim()) chunks.push(current.trimEnd());

      for (const chunk of chunks) {
        await ctx.reply(chunk);
      }
    }
  },

  {
    name: "ping",
    category: "General",
    description: "Check bot responsiveness and estimated message response time.",
    run: async ctx => {
      const timestamp = messageTimestampMs(ctx.msg);
      const responseMs = timestamp === null
        ? null
        : Math.max(0, Date.now() - timestamp);

      await ctx.reply([
        "╭──〔 🏓 𝗙𝗘𝗜 𝗫𝗠𝗗 · 𝗣𝗢𝗡𝗚 〕",
        "│  ◇ 𝗦𝗧𝗔𝗧𝗨𝗦: " + (ctx.connectionOpen ? "Online 🟢" : "Connecting 🟡"),
        "│  ◇ 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘: " + (responseMs === null ? "Unavailable" : responseMs + " ms"),
        "│  ◇ 𝗨𝗣𝗧𝗜𝗠𝗘: " + formatDuration(process.uptime()),
        "│  ◇ 𝗩𝗘𝗥𝗦𝗜𝗢𝗡: " + ctx.config.version,
        "╰────────────────"
      ].join("\n"));
    }
  },

  {
    name: "alive",
    aliases: ["uptime"],
    category: "General",
    description: "Show bot status, mode and uptime.",
    run: async ctx => {
      await ctx.reply([
        "╭──〔 🤖 𝗕𝗢𝗧 𝗦𝗧𝗔𝗧𝗨𝗦 〕",
        "│  ◇ 𝗡𝗔𝗠𝗘: " + ctx.config.name,
        "│  ◇ 𝗦𝗧𝗔𝗧𝗨𝗦: " + (ctx.connectionOpen ? "Online 🟢" : "Connecting 🟡"),
        "│  ◇ 𝗠𝗢𝗗𝗘: " + String(ctx.mode || "public").toUpperCase(),
        "│  ◇ 𝗨𝗣𝗧𝗜𝗠𝗘: " + formatDuration(process.uptime()),
        "│  ◇ 𝗢𝗪𝗡𝗘𝗥: " + ctx.config.ownerName,
        "╰────────────────",
        "✦ 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗟𝗨𝗥𝗗𝗔𝗦𝗞𝗬"
      ].join("\n"));
    }
  },

  {
    name: "owner",
    category: "General",
    description: "Show LURDASKY bot owner details.",
    run: async ctx => {
      const number = ownerNumber(ctx.config);

      await ctx.reply([
        "╭──〔 👑 𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 〕",
        "│  ◇ 𝗡𝗔𝗠𝗘: " + ctx.config.ownerName,
        ...(number ? ["│  ◇ 𝗡𝗨𝗠𝗕𝗘𝗥: +" + number] : []),
        "╰────────────────"
      ].join("\n"));
    }
  },

  {
    name: "support",
    category: "General",
    description: "Show support guidance for FEI XMD.",
    run: async ctx => {
      await ctx.reply([
        "╭──〔 🛟 𝗙𝗘𝗜 𝗫𝗠𝗗 𝗦𝗨𝗣𝗣𝗢𝗥𝗧 〕",
        "│  ◇ 𝗕𝗢𝗧: " + ctx.config.name,
        "│  ◇ 𝗛𝗘𝗟𝗣: Setup assistance and bug reports",
        "│  ◇ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧: " + ctx.config.ownerName,
        "│",
        "│  ◇ 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬: 𝗟𝗨𝗥𝗗𝗔𝗦𝗞𝗬",
        "╰────────────────"
      ].join("\n"));
    }
  },

  {
    name: "time",
    category: "General",
    description: "Show the current server time in Nigeria.",
    run: async ctx => {
      const value = new Intl.DateTimeFormat("en-NG", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }).format(new Date());

      await ctx.reply(
        "╭──〔 🕒 𝗡𝗜𝗚𝗘𝗥𝗜𝗔 𝗧𝗜𝗠𝗘 〕\n" +
        "│  ◇ " + value + "\n" +
        "╰────────────────"
      );
    }
  },

  {
    name: "date",
    category: "General",
    description: "Show the current date in Nigeria.",
    run: async ctx => {
      const value = new Intl.DateTimeFormat("en-NG", {
        timeZone: "Africa/Lagos",
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      }).format(new Date());

      await ctx.reply(
        "╭──〔 📅 𝗡𝗜𝗚𝗘𝗥𝗜𝗔 𝗗𝗔𝗧𝗘 〕\n" +
        "│  ◇ " + value + "\n" +
        "╰────────────────"
      );
    }
  },

  {
    name: "version",
    category: "General",
    description: "Show FEI XMD version and connection status.",
    run: async ctx => {
      await ctx.reply([
        "╭──〔 🤖 𝗙𝗘𝗜 𝗫𝗠𝗗 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 〕",
        "│  ◇ 𝗕𝗢𝗧: " + ctx.config.name,
        "│  ◇ 𝗩𝗘𝗥𝗦𝗜𝗢𝗡: " + ctx.config.version,
        "│  ◇ 𝗦𝗧𝗔𝗧𝗨𝗦: " + (ctx.connectionOpen ? "Online 🟢" : "Connecting 🟡"),
        "│  ◇ 𝗠𝗢𝗗𝗘: " + String(ctx.mode || "public").toUpperCase(),
        "│  ◇ 𝗕𝗔𝗜𝗟𝗘𝗬𝗦: Official WhiskeySockets npm package",
        "╰────────────────"
      ].join("\n"));
    }
  },

  {
    name: "jid",
    aliases: ["id"],
    category: "General",
    description: "Show the current chat and message sender IDs.",
    run: async ctx => {
      await ctx.reply([
        "╭──〔 💬 𝗖𝗛𝗔𝗧 𝗜𝗡𝗙𝗢 〕",
        "│  ◇ 𝗖𝗛𝗔𝗧 𝗜𝗗: " + ctx.jid,
        "│  ◇ 𝗦𝗘𝗡𝗗𝗘𝗥 𝗜𝗗: " + (ctx.senderJid || "Unavailable"),
        "╰────────────────"
      ].join("\n"));
    }
  },

  {
    name: "whoami",
    category: "General",
    description: "Show your WhatsApp sender information.",
    run: async ctx => {
      await ctx.reply([
        "╭──〔 👤 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢 〕",
        "│  ◇ 𝗡𝗔𝗠𝗘: " + (ctx.msg?.pushName || "Unknown"),
        "│  ◇ 𝗬𝗢𝗨𝗥 𝗜𝗗: " + (ctx.senderJid || "Unavailable"),
        "│  ◇ 𝗢𝗪𝗡𝗘𝗥: " + (ctx.owner ? "Yes 👑" : "No"),
        "╰────────────────"
      ].join("\n"));
    }
  }
];

export default commands;
