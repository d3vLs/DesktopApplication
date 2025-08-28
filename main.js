//we are importing two Electron modules with CommonJS module syntax:

// app, which controls your application's event lifecycle.
// BrowserWindow, which creates and manages app windows.
import { app, BrowserWindow } from "electron/main";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { ipcMain } from "electron";

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The createWindow() function loads your web page into a new BrowserWindow instance
// and sets the window's dimensions to 800x600 pixels.
// The loadFile("index.html") method loads the specified HTML file into the window.
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true, // (default is true, but you can add this explicitly)
      preload: join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

// The app.whenReady() method ensures that the createWindow() function is called only after Electron has finished initializing.
// This prevents any issues that might arise from trying to create a window before the app is fully
app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();

  // The app.on("activate") event listener is specific to macOS (darwin).
  // It ensures that if the application is activated (e.g., clicked in the dock) and there are no open windows,
  // a new window is created. This is a common behavior on macOS where applications often
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// The window-all-closed event is emitted when all windows have been closed.
// The code checks if the platform is not macOS (darwin) and calls app.quit
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
