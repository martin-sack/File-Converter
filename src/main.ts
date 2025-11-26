import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';

// Import converters
import { imageToPDF } from './converters/imageToPDF';
import { imageResize } from './converters/imageResize';
import { imageCompress } from './converters/imageCompress';
import { imageConvert } from './converters/imageConvert';
import { pdfToWord } from './converters/pdfToWord';
import { wordToPDF } from './converters/wordToPDF';
import { markdownToHtml } from './converters/markdownToHtml';
import { htmlToPDF } from './converters/htmlToPDF';
import { videoToMp3 } from './converters/videoToMp3';
import { videoToAAC } from './converters/videoToAAC';
import { audioConvert } from './converters/audioConvert';
import { jsonToCsv, csvToJson } from './converters/csvJson';
import { zipFiles, unzipFiles } from './converters/zipFiles';
import { videoCompress } from './converters/videoCompress';
import { ocrExtract } from './converters/ocrExtract';
import { processFolderBatch } from './converters/folderBatch';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile']
  });
  return result.filePaths[0];
});

ipcMain.handle('select-files', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections']
  });
  return result.filePaths;
});

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  return result.filePaths[0];
});

ipcMain.handle('save-file', async (_, defaultPath: string) => {
  const result = await dialog.showSaveDialog({
    defaultPath
  });
  return result.filePath;
});

// Conversion handlers
ipcMain.handle('convert:image-to-pdf', async (_, inputPath: string, outputPath: string) => {
  return await imageToPDF(inputPath, outputPath);
});

ipcMain.handle('convert:image-resize', async (_, options) => {
  return await imageResize(options);
});

ipcMain.handle('convert:image-compress', async (_, options) => {
  return await imageCompress(options);
});

ipcMain.handle('convert:image-convert', async (_, inputPath: string, outputPath: string, format: string) => {
  return await imageConvert(inputPath, outputPath, format);
});

ipcMain.handle('convert:pdf-to-word', async (_, inputPath: string, outputPath: string) => {
  return await pdfToWord(inputPath, outputPath);
});

ipcMain.handle('convert:word-to-pdf', async (_, inputPath: string, outputPath: string) => {
  return await wordToPDF(inputPath, outputPath);
});

ipcMain.handle('convert:markdown-to-html', async (_, inputPath: string, outputPath: string) => {
  return await markdownToHtml(inputPath, outputPath);
});

ipcMain.handle('convert:html-to-pdf', async (_, inputPath: string, outputPath: string) => {
  return await htmlToPDF(inputPath, outputPath);
});

ipcMain.handle('convert:video-to-mp3', async (_, inputPath: string, outputPath: string) => {
  return await videoToMp3(inputPath, outputPath);
});

ipcMain.handle('convert:video-to-aac', async (_, inputPath: string, outputPath: string) => {
  return await videoToAAC(inputPath, outputPath);
});

ipcMain.handle('convert:audio-convert', async (_, inputPath: string, outputPath: string, format: string) => {
  return await audioConvert(inputPath, outputPath, format);
});

ipcMain.handle('convert:json-to-csv', async (_, inputPath: string, outputPath: string) => {
  return await jsonToCsv(inputPath, outputPath);
});

ipcMain.handle('convert:csv-to-json', async (_, inputPath: string, outputPath: string) => {
  return await csvToJson(inputPath, outputPath);
});

ipcMain.handle('convert:zip-files', async (_, inputPaths: string[], outputPath: string) => {
  return await zipFiles(inputPaths, outputPath);
});

ipcMain.handle('convert:unzip-files', async (_, inputPath: string, outputDir: string) => {
  return await unzipFiles(inputPath, outputDir);
});

ipcMain.handle('convert:video-compress', async (_, options) => {
  return await videoCompress(options);
});

ipcMain.handle('convert:ocr-extract', async (_, inputPath: string, outputPath: string) => {
  return await ocrExtract(inputPath, outputPath);
});

ipcMain.handle('convert:folder-batch', async (_, options) => {
  return await processFolderBatch(options);
});

ipcMain.handle('open-folder', async (_, folderPath: string) => {
  const { shell } = require('electron');
  shell.showItemInFolder(folderPath);
});
