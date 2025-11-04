let db;
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
};

function createFile(path, filename) {
  const objectStore = db
    .transaction("filesystem", "readwrite")
    .objectStore("filesystem");

  objectStore.put("", `${path}/${filename}`);
}



async function getDirContents(path) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("filesystem", "readonly");
    const store = tx.objectStore("filesystem");
    const request = store.getAllKeys();

    request.onsuccess = () => {
      const allFiles = request.result;
      const dirFiles = allFiles.filter(filepath => filepath.startsWith(path));
      resolve(dirFiles);
    }
  });
}