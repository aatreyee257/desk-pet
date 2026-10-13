const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;
let drag = null;

function createWindow() {
  win = new BrowserWindow({
    width: 200,
    height: 290,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),   // load the doorway
    },
  });
  win.loadFile("index.html");
}

// When a drag starts, remember where the mouse and window were.
ipcMain.on("drag-start", (_event, { x, y }) => {
  const [winX, winY] = win.getPosition();
  drag = { x, y, winX, winY };
});

// As the mouse moves, move the window by the same amount.
ipcMain.on("drag-move", (_event, { x, y }) => {
  if (!drag) return;
  win.setPosition(
    Math.round(drag.winX + (x - drag.x)),
    Math.round(drag.winY + (y - drag.y))
  );
});

ipcMain.on("drag-end", () => {
  drag = null;
});

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());