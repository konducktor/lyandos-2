function boot() {
    OS_CONSOLE = document.getElementById("console");

    bootecho("boot.boot() started");
    bootecho("bootecho initialized locally");
    
    const fileFunctions = {
        "./boot-scripts/script-boot.js": "initializeFiles",
        "./boot-scripts/command-executor.js": null,
        "./boot-scripts/console-manager.js": null,
    }

    bootecho(`loading ${Object.keys(fileFunctions).length} boot scripts`);
    Object.keys(fileFunctions).forEach(scriptPath => {
        const func = fileFunctions[scriptPath];
        
        bootecho(`loading ${scriptPath}`);
        loadBootScript(scriptPath).then(() => {
            bootecho(`${scriptPath} loaded`);
            if (func != null) {
                bootecho(`executing ${scriptPath}->${func.toString()}`);
                eval(`${func}()`);
                bootecho(`${scriptPath}->${func.toString()} executed`);
            }
        });

        
    });    
}

function loadBootScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Не удалось загрузить скрипт: " + src));
        document.head.appendChild(script);
    });
}