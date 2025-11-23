const lexeExt = "lexe";
let currentDir = "/";

let files = {};

async function readFileRaw(name) {
    try {
        const response = await fetch(`filesystem${currentDir}${name}`);
        
        if (!response.ok) {
            throw new Error(`Failed to load file: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error(error);
    }
}
async function readFile(filename) {
    const name = filename.trim().split("/").slice(-1).join("/");

    bootecho(`Reading file ${filename}`);
    return {
        name: name.trim(),
        displayName: name.trim().split(".").slice(0, -1).join("."),
        extension: name.trim().split(".").slice(-1).join("."),
        content: await (await readFileRaw(filename)).text()
    };
}

function isExecutable(file) {
    return file.extension === lexeExt;
}

function loadScript(file) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = `function ${file.displayName}(args) {
        ${file.content}
    }`;

    bootecho(`Loaded script ${file.name}`);
    document.body.appendChild(script);
}

async function initializeDirectory(path, filesystem) {
    for (let filename of filesystem.files) {
        const file = await readFile(`${path}${filename}`);
        if (isExecutable(file)) loadScript(file);
    }

    if (filesystem.subdirs === undefined) return;
    for (let dirname in filesystem.subdirs) {
        await initializeDirectory(`${path}${dirname}/`, filesystem.subdirs[`${dirname}`]);
    }
}

async function initializeFiles() {
    const rawFile = await readFileRaw("filesystem.json");
    const filesystemJson = await rawFile.json();

    await initializeDirectory("", filesystemJson);
    bootecho("All scripts loaded");
    intro("");
}