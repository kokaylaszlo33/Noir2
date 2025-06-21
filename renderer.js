const information = document.getElementById("info");
const information2 = document.getElementById("info2");
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

information2.innerText = `${dikk.more}`;

const func = async () => {
  const response = await window.versions.ping();
  information2.innerText = `${response}`; // prints out 'pong'
};

func();
