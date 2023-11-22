const fs = require('fs/promises');
const EventEmitter = require('events');

class FileReadEmitter extends EventEmitter{
    async readFile(file){

        this.emit("beforeRead", file);

        try{
            const data = await fs.readFile(file, 'utf8');
            this.emit('read', file, data);
            this.emit("afterRead", file);
        }catch(error){
            this.emit('error', error);
        }
    }
}

const fileReadEmitter = new FileReadEmitter();

fileReadEmitter.on("read", (file, data)=>{
    console.log(`File ${file} read successfully`, data);
});

fileReadEmitter.on("error", (error)=>{
    console.error(`error ${error}`)
});

fileReadEmitter.on("beforeRead", (error)=>{
    console.error(`Reading file ${error}`)
});

fileReadEmitter.on("afterRead", (error)=>{
    console.error(`Finishing reading ${error}`)
});

(async()=>{
    await fileReadEmitter.readFile("archivo.txt");
    await fileReadEmitter.readFile("archivo2.txt");
    await fileReadEmitter.readFile("archivo3.txt");
})();