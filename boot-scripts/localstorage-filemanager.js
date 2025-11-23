function initialazeFilesystem() {
    const filesystem = localStorage.getItem("filesystem");

    if (filesystem == null) {
        throw Error(`filesystem not setup. Use "bootstrap" to setup from scratch (or "bootstrap <link>" from link)`);
    }

}

function bootstrap(args) {
    const args_list = args.split(" ");

    if (args_list.length > 1) {
        throw new Error("Too many arguments!");
    }

    if (args_list.length == 1 && args_list[0] != '') {
        return;
    }

    const defaultFilesystem = {
        "files": [
        ],
        "subdirs": {
            "bin": {
                "files": {
                    "charout.lexe": String.raw`
document.getElementById("console").value += args;
return 0;
                    `,
                    "clear.lexe": String.raw`
document.getElementById("console").value = "";
return 0;
                    `,
                    "debug.lexe": String.raw`
console.log(args);
return 0;
                    `,
                    "echo.lexe": String.raw`
if (args == "") {
    return "No text to output.";
}

charout(args + "\n" + "\n");

return 0;
                    `,
                    "error.lexe": String.raw`
const args_list = args.split(" ");
charout("ERROR RUNNING SCRIPT" + args_list[0] + ":\n\t" + args_list.slice(1).join(" ") + "\n");
return 0;
                    `
                }
            },
            "sbin": {
                "files": {
                    "intro.lexe": String.raw`
logo = [
'888                                  888 .d88888b.  .d8888b.  .d8888b.  ',
'888                                  888d88P" "Y88bd88P  Y88bd88P  Y88b ',
'888                                  888888     888Y88b.            888 ',
'888     888  888 8888b. 88888b.  .d88888888     888 "Y888b.       .d88P ',
'888     888  888    "88b888 "88bd88" 888888     888    "Y88b. .od888P"  ',
'888     888  888.d888888888  888888  888888     888      "888d88P"      ',
'888     Y88b 888888  888888  888Y88b 888Y88b. .d88PY88b  d88P888"       ',
'88888888 "Y88888"Y888888888  888 "Y88888 "Y88888P"  "Y8888P" 888888888  ',
'             888                                                        ',
'        Y8b d88P                                                        ',
'         "Y88P"                                                         '
];

for(i = 0; i < logo.length; i++) {
    charout(logo[i]);
    charout("\n");
}

enableCaret();
return 0;
                    `
                }
            }
        }
    };
    console.log(JSON.stringify(defaultFilesystem))
    localStorage.setItem("filesystem", JSON.stringify(defaultFilesystem));
    return 0;
}