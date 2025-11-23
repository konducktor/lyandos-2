const lexeExt = "lexe";
let currentDir = "/";

// async function readFileRaw(name) {
//     try {
//         const response = await fetch(`filesystem${currentDir}${name}`);
        
//         if (!response.ok) {
//             throw new Error(`Failed to load file: ${response.status}`);
//         }

//         return response;
//     } catch (error) {
//         console.error(error);
//     }
// }
// async function readFile(filename) {
//     const name = filename.trim().split("/").slice(-1).join("/");

//     bootecho(`Reading file ${filename}`);
//     return {
//         name: name.trim(),
//         displayName: name.trim().split(".").slice(0, -1).join("."),
//         extension: name.trim().split(".").slice(-1).join("."),
//         content: await (await readFileRaw(filename)).text()
//     };
// }

function getFile(filename, contents) {
    bootecho(`reading file ${filename}`);

    return {
        name: filename.trim(),
        displayName: filename.trim().split(".").slice(0, -1).join("."),
        extension: filename.trim().split(".").slice(-1).join("."),
        content: contents
    };
}

function isExecutable(file) {
    return file.extension === lexeExt;
}

async function loadScript(file) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = 'text/javascript';
        script.textContent = `function ${file.displayName}(args) {
            ${file.content}
        }`;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Error loading script: " + src));

        document.body.appendChild(script);
        bootecho(`loaded script ${file.name}`);
    });
}

async function initializeDirectory(dir) {
    // for (let filename of filesystem.files) {
    //     const file = await readFile(`${path}${filename}`);
    //     if (isExecutable(file)) loadScript(file);
    // }

    // if (filesystem.subdirs === undefined) return;
    // for (let dirname in filesystem.subdirs) {
    //     await initializeDirectory(`${path}${dirname}/`, filesystem.subdirs[`${dirname}`]);
    // }

    Object.keys(dir.files).forEach(async filename => {
        const file = getFile(filename, dir.files[filename]);
        if (isExecutable(file)) await loadScript(file);
    });

    if (dir.subdirs === undefined) return;
    for (let dirname of Object.keys(dir.subdirs)) {
        initializeDirectory(dir.subdirs[dirname]);
    }
}

async function initializeFiles() {
    // const rawFile = await readFileRaw("filesystem.json");
    // const filesystemJson = await rawFile.json();

    // await initializeDirectory("", filesystemJson);

    const filesystemRaw = localStorage.getItem("filesystem");
    const filesystemJson = JSON.parse(filesystemRaw);

    await initializeDirectory(filesystemJson);

    bootecho("All scripts loaded");
}