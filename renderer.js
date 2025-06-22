const information = document.getElementById("info");
const information2 = document.getElementById("info2");
const speakButton = document.getElementById("speakButton");
const debug = document.getElementById("debug");
const utterance = new SpeechSynthesisUtterance();
let numberOfVoices = 0;
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

information2.innerText = `${dikk.more}`;

const func = async () => {
  const response = await window.versions.ping();
  information2.innerText = `${response}`; // prints out 'pong'
};

func();

// speakButton.addEventListener("click", () => {
//   debug.innerHTML = speech.getVoices();
//   speech.speak(information.innerText);
// });

speakButton.addEventListener("click", () => {
  utterance.text = "Mi van, kicsi?";
  window.speechSynthesis.speak(utterance);
});

speechSynthesis.addEventListener("voiceschanged", () => {
  var voices = window.speechSynthesis.getVoices();

  utterance.voice = voices[6];
  setTimeout(() => {
    console.log(`There are ${voices.length} voices available`);
  }, 1000);
});
