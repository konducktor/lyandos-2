function onNewCommand(console_text) {
<<<<<<< Updated upstream
  const split = console_text.trim().split(" > ");
  let command = split[split.length - 1];

=======
  let command = console_text.split(" > ")[1];
>>>>>>> Stashed changes
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
    console.log(`Running command: ${prompt}`);
    
    let result = eval(prompt);
    console.log(`Command result: ${result}`);

    if (result != 0) {
      runCommand("error", `${command} ${result}`)
    }
}
