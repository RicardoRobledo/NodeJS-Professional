const fs = require("fs/promises");

async function readFile(){
    try{
        const data = await fs.readFile("./archivo.txt", "utf8")
        console.log("Contenido de archivo.txt", data)

        const data2 = await fs.readFile("./archivo2.txt", "utf8")
        console.log("Contenido de archivo.txt", data2)

        const data3 = await fs.readFile("./archivo3.txt", "utf8")
        console.log("Contenido de archivo.txt", data3)
    }catch(error){
        console.error("Error leyendo el archivo", error);
    }
}