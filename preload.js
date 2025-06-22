const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("speech", {
  speak: (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  },
  getVoices: (callback) => {
    const voices = window.speechSynthesis.getVoices();
    // // Wait for voices to load
    // window.speechSynthesis.onvoiceschanged = () => {
    //   const voices = window.speechSynthesis.getVoices();
    //   callback(voices);
    // };
    // // Force a refresh (some browsers need this)
    // window.speechSynthesis.getVoices();
    console.log(voices);
    return voices;
  },
});
contextBridge.exposeInMainWorld("dikk", {
  more: "This is an exposed variable",
});
