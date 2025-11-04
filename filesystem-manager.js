let db;
let FILESYSTEM;
let CURRENTDIR = "/";

const request = indexedDB.open("lyandos", 3);
// indexedDB.deleteDatabase("lyandos");

request.onupgradeneeded = event => {
  bootecho("Filesystem not initialized. Initializing filesystem..");

  db = event.target.result;
  db.createObjectStore("filesystem");

  bootecho("Filesystem initialized.");
};

request.onsuccess = event => {
  db = event.target.result;

  initializeFilesystem();
};

function initializeFilesystem() {
  const objectStore = db
    .transaction("filesystem", "readwrite")
    .objectStore("filesystem");

  const request = objectStore.get("/.filesystem");

  request.onsuccess = event => {
    const value = event.target.result;

    if (value) {
      FILESYSTEM = JSON.parse(value);
    }
    else {
      FILESYSTEM = {
        "files": [],
        "subdirs": {}
      }

      saveFilesystem();
    }
  }
}

function saveFilesystem() {
  writeFile('', '.filesystem', JSON.stringify(FILESYSTEM));
}

function addFileFilesystem(path, filename) {
  // FUCCCKKKKKKKKKKKKKKKK
}

function createFile(path, filename) {
  const objectStore = db
    .transaction("filesystem", "readwrite")
    .objectStore("filesystem");

  objectStore.put("", `${path}/${filename}`);
  addFileFilesystem(path, filename);
}

function getDirContents(path) {
  const tx = db.transaction("filesystem", "readonly");
  const store = tx.objectStore("filesystem");
  const request = store.getAllKeys();

  request.onsuccess = () => {
    const allFiles = request.result;
    const dirFiles = allFiles.filter(filepath => filepath.startsWith(path) && !filepath.includes("/."));
    console.log(dirFiles);
    return dirFiles;
  }
}