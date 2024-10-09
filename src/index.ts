import { stripColors } from "colors";
import server from "./server";

const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(stripColors('REST API DESDE PUERTO 4000').cyan.bold)
})

