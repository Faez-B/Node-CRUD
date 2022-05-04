const http = require('http');
const fs = require('fs');
const path = require('path');

const memoryDb = new Map(); // est global
let id = 0; // doit être global
memoryDb.set(id++, {nom: "Alice"}) // voici comment set une nouvelle entrée.
memoryDb.set(id++, {nom: "Bob"})
memoryDb.set(id++, {nom: "Charlie"})


const server = http.createServer( (req , res) => {

    if (req.url === "/api/names") {
        if (req.method === "GET") {
            const jsonText = JSON.stringify(Array.from(memoryDb.entries()));

            res.writeHead(200, { 'content-type': "application/json" });
            res.write(jsonText);

        }
    }

    res.end();
});

server.listen(8000);