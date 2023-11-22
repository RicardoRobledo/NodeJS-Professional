const fs = require("fs");
const printPixels = require("./bmpPixelPrinter");

const readableStream = fs.createReadStream("./zero.bmp");
const writeableStream = fs.createWriteStream("./outputImage.bmp");

readableStream.on("data", (chunk) => {
  // console.log(chunk);
  //printPixels(chunk);
  writeableStream.write(chunk);
});

readableStream.on("end", () => {
  console.log("Fin de lectura del archivo");
  writeableStream.end();
});

writeableStream.on("finish", ()=>{
  console.log("Fin de escritura del archivo");
});

readableStream.on("error", () => {
  console.log("Error en la lectura");
});

writeableStream.on("error", ()=>{
  console.log("Error en la escritura");
});