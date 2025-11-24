function onNewCommand(console_text) {
  let command = console_text.trim().split(" > ")[1];

  parseCommand(command);
}

function parseCommand(command_text) {
  let words = command_text.split(" ");

  command = words[0];
  args = words.slice(1).join(" ");

  runCommand(command, args);
}

function runCommand(command, args) {
    const prompt = `${command}("${args}")`
    
    let result = eval(prompt);

    if (result != 0) {
      runCommand("error", `${command} ${result}`)
    }
}
