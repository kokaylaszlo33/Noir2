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
      contextIsolation: true, // Crucial for security
      sandbox: true, // Recommended protection
      nodeIntegration: false,
    },
  });

  //  // Build the menu from template
  // const menu = Menu.buildFromTemplate(template)
  const menu = Menu.buildFromTemplate(template);

  // // Set the application menu
  Menu.setApplicationMenu(menu);

  // win.webContents.openDevTools();
  win.maximize();
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();

  const { globalShortcut } = require("electron");
  globalShortcut.register("Esc", () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) win.webContents.toggleDevTools();
  });

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
