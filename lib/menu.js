
export function getSectionCommands(section, commands = []) {
  const visible = commands.filter(command => !command.hidden);

  if (Array.isArray(section.commandNames)) {
    const selected = new Set(
      section.commandNames.map(value => String(value).toLowerCase())
    );
    return visible.filter(command =>
      selected.has(String(command.name).toLowerCase())
    );
  }

  const categories = Array.isArray(section.categories) && section.categories.length
    ? section.categories
    : [section.key];

  const excluded = new Set(section.excludeNames || []);

  return visible.filter(command =>
    categories.includes(command.category) && !excluded.has(command.name)
  );
}

export function buildMenu({ commands = [], config = {}, theme = {} } = {}) {
  const menu = theme.menu || {};
  const sections = Array.isArray(theme.sections) ? theme.sections : [];

  const prefix = String(config.prefix || ".");
  const safeName = String(config.name || "FEI XMD")
    .replace(/[\r\n]/g, " ")
    .slice(0, 40);

  const lines = [
    String(menu.top || "╭━━【 ") + safeName +
      String(menu.titleEnd || " 】━━┈➤"),

    String(menu.infoLine || "┃ ◈ ") +
      "𝗩𝗘𝗥𝗦𝗜𝗢𝗡: " + String(config.version || "1.0.0"),

    String(menu.infoLine || "┃ ◈ ") +
      "𝗣𝗥𝗘𝗙𝗜𝗫: " + prefix,

    String(menu.infoLine || "┃ ◈ ") +
      "𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗟𝗢𝗔𝗗𝗘𝗗: " +
      commands.filter(command => !command.hidden).length,

    String(menu.blankLine || "┃")
  ];

  if (!commands.length) {
    lines.push(
      String(menu.infoLine || "┃ ◈ ") +
      "𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗠𝗢𝗗𝗨𝗟𝗘𝗦 𝗔𝗥𝗘 𝗕𝗘𝗜𝗡𝗚 𝗣𝗥𝗘𝗣𝗔𝗥𝗘𝗗."
    );
  } else {
    const assigned = new Set();

    for (const section of sections) {
      const members = getSectionCommands(section, commands)
        .filter(command => !assigned.has(command.name));

      lines.push(
        String(menu.top || "╭━━【 ") +
        String(section.title || section.key) +
        String(menu.titleEnd || " 】━━┈➤")
      );

      if (!members.length) {
        lines.push(
          String(menu.itemLine || "┃ ◈✦│ ") +
          "(𝗡𝗢 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗬𝗘𝗧)"
        );
      } else {
        for (const command of members) {
          assigned.add(command.name);

          lines.push(
            String(menu.itemLine || "┃ ◈✦│ ") +
            prefix + command.name +
            (command.description ? " — " + command.description : "")
          );
        }
      }

      lines.push(String(menu.bottom || "╰━━━━━━━━━━━━┈➤"), "");
    }

    const ungrouped = commands.filter(command =>
      !command.hidden && !assigned.has(command.name)
    );

    if (ungrouped.length) {
      lines.push("╭━━【 𝗢𝗧𝗛𝗘𝗥 】━━┈➤");

      for (const command of ungrouped) {
        lines.push(
          String(menu.itemLine || "┃ ◈✦│ ") + prefix + command.name
        );
      }

      lines.push(String(menu.bottom || "╰━━━━━━━━━━━━┈➤"));
    }
  }

  lines.push("⚡ 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗕𝗘𝗡𝗙𝗘𝗜 𝗧𝗘𝗖𝗛");

  return lines.join("\n");
}
  
