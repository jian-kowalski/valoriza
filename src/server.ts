import express, { request, response } from "express";

const app = express();


app.get("/teste", (request, response)=> {
    return response.send("Olá pessoal");
});

app.listen(3000, () => console.log("Server is runner..."));
