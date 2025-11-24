const terminal = document.getElementById("console");
const caret = "> ";

terminal.addEventListener("keydown", (e) => {
    const lines = terminal.value.split("\n");
    const lastLine = lines[lines.length - 1];
    const caretPos = terminal.selectionStart;

    const lastLineStart = terminal.value.lastIndexOf("\n") + 1;

    if (caretPos < lastLineStart) {
        e.preventDefault();
        terminal.setSelectionRange(terminal.value.length, terminal.value.length);
        return;
    }

    if (
        (e.key === "Backspace" && caretPos <= lastLineStart + caret.length) ||
        (e.key === "ArrowLeft" && caretPos <= lastLineStart + caret.length)
    ) {
        e.preventDefault();
        return;
    }

    if (e.key === "Enter") {
        e.preventDefault();

        const lines = terminal.value.split("\n");
        const lastLine = lines[lines.length - 1];
        const command = lastLine.slice(prompt.length).trim();

        terminal.value += "\n"

        try {
            onNewCommand(command);
        } catch (error) {
            console.error(error);
            terminal.value += error + "\n"
        }
        enableCaret();
    }
});

function enableCaret() {
    if (terminal.value.length > 0) {
        terminal.value += "\n"
    }
    terminal.value += `${CURRENT_PATH} ${caret}`;
}