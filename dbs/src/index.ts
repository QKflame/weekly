import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(async () => {
    process.exit(0);
}).catch(error => {
    console.log(error);
    process.exit(1);
})
