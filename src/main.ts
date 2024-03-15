import AppDataSource from "./db/app_datasource"

AppDataSource.query(`SHOW TABLES;`).then((response)=>console.log(response)).catch(err => console.log(err))
console.log(`Docker is working`)