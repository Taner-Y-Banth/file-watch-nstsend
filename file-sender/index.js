import ws from 'ws';
import fs from 'fs';
import { NstrumentaClient } from 'nstrumenta';
import { readFile } from 'fs/promises';

const nstrumenta = new NstrumentaClient({ hostUrl: 'ws://localhost:8088' });
const completed = [];

fs.watch('./images', async (eventType, filename) => {
  console.log(!completed.includes(filename) && `event type is: ${eventType}`);
  if (eventType == 'change' && !completed.includes(filename)) {
    completed.push(filename);
    console.log(`filename provided: ${filename}`);
    const imageFile = await readFile(`./images/${filename}`);
    console.log(imageFile);

    nstrumenta.sendBuffer('ocr', buff);

  } else {
    console.log('filename not provided');
  }
});

nstrumenta.addListener("open", () => {
  console.log("websocket opened successfully");
});

console.log("nstrumenta init");

nstrumenta.init(ws);