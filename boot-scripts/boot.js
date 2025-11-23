async function boot() {
    OS_CONSOLE = document.getElementById("console");

    bootecho("boot.boot() started");
    bootecho("bootecho initialized locally");
    
    const scriptPaths = [
        "./boot-scripts/localstorage-filemanager.js",
        "./boot-scripts/script-boot.js",
        "./boot-scripts/command-executor.js",
        "./boot-scripts/console-manager.js",
    ]

    bootecho(`loading ${scriptPaths.length} boot scripts`);
    for (const scriptPath of scriptPaths) {
        bootecho(`loading ${scriptPath}`);
        try {
            await loadBootScript(scriptPath)
            bootecho(`${scriptPath} loaded`);
        } catch (err) {
            bootecho(`Error loading ${scriptPath}.`);
            bootecho("The system cannot be booted because an error occured while loading important scripts.");
            return;
        }
    }

    bootecho("running initialezeFilesystem()");
    try {
        initialazeFilesystem();
    } catch (err) {
        bootecho(err);
        enableCaret();
        return;
    }
    
    bootecho(`running initializeFiles()`);
    await initializeFiles();
    bootecho(`initializeFiles() finished`);
    bootecho(`running intro.lexe`);
    intro("");
}

async function loadBootScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Не удалось загрузить скрипт: " + src));
        document.head.appendChild(script);
    });
}