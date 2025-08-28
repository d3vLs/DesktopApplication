const { contextBridge, ipcRenderer } = require("electron");
// const os = require("os");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,

  // we can also expose variables, not just functions
  platform: () => process.platform,

  ping: () => ipcRenderer.invoke("ping"),

  // we can also expose entire objects, not just functions
  //   os: os.type(),
});
