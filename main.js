const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

const isDev = process.env.NODE_DEV !== "PRODUCTION";
const isMac = process.platform === "darwin";

// Create the Main Window
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Resizer",
    width: isDev ? 1000 : 500,
    height: 600,
  });

  //   Open Dev tools if not in PRODUCTION environment
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

// App is Ready
app.whenReady().then(() => {
  createMainWindow();

  //   Implement the menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Menu template
const menu = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click: () => app.quit(),
        aaccelerator: "CmdOrCtrl+W",
      },
    ],
  },
];

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
