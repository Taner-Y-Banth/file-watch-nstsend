import ws from 'ws';
import fs from 'fs';
import { NstrumentaClient } from 'nstrumenta';
import { readFile } from 'fs/promises';
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const wsUrl = argv.wsUrl;

const nstClient = new NstrumentaClient({
  apiKey: "",
  projectId: "",
  wsUrl,
});

const completed = [];

fs.watch('./images', async (eventType, filename) => {
  console.log(!completed.includes(filename) && `event type is: ${eventType}`);
  if (eventType == 'change' && !completed.includes(filename)) {
    completed.push(filename);
    console.log(`filename provided: ${filename}`);
    const buff = await readFile(`./images/${filename}`);

    nstClient.sendBuffer('ocr', buff);

  } else {
    console.log('filename not provided');
  }
});

nstClient.addListener("open", () => {
  console.log("websocket opened successfully");
});

console.log("nstrumenta init");

nstClient.init(ws);