const { app, Menu, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
const { template } = require("./src/menuTemplate");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// This MUST be done before the app is ready.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //  // Build the menu from template
  // const menu = Menu.buildFromTemplate(template)
  const menu = Menu.buildFromTemplate(template);

  // // Set the application menu
  Menu.setApplicationMenu(menu);

  win.maximize();
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
