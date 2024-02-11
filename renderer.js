const { ipcRenderer } = require("electron"); //main.jsで設定したおかげでnodeモジュールが使用できる

document.getElementById("morningBtn").addEventListener("click", () => {
  ipcRenderer.send("morning");
});
document.getElementById("eveningBtn").addEventListener("click", () => {
  ipcRenderer.send("evening");
});
