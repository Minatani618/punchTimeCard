const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { morningModule } = require("./morningModule");
const { eveningModule } = require("./eveningModule");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, //これがないとrenderer.jsでrequireが使用できない　ただしセキュリティ上のリスクがあるらしい
      contextIsolation: false, //これがないとrenderer.jsでrequireが使用できない　ただしセキュリティ上のリスクがあるらしい
    },
  });
  mainWindow.webContents.openDevTools(); //開発用　ブラウザの開発者ツールが表示されるので、renderer.jsの状況を把握できる
  mainWindow.loadFile("index.html"); //ページ描画用htmlをよみに行く
});

//----------------------------------------------------------------------------
//renderer.jsから情報が帰ってきてから開始される処理　create-file という名前でイベントが帰ってきている
//出勤打刻
ipcMain.on("morning", (event, fileName) => {
  console.log("good morning");
  morningModule();
});

//退勤打刻
ipcMain.on("evening", (event, fileName) => {
  console.log("bye bye");
  eveningModule();
});
