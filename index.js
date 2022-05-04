const http = require('http');
const fs = require('fs');
const path = require('path');

const memoryDb = new Map(); // est global
let id = 0; // doit être global
memoryDb.set(++id, {nom: "Alice"}) // voici comment set une nouvelle entrée.
memoryDb.set(++id, {nom: "Bob"})
memoryDb.set(++id, {nom: "Charlie"})

// console.log(memoryDb.get(1));

const server = http.createServer( (req , res) => {
    const jsonText = JSON.stringify(Array.from(memoryDb.entries()));

    if (req.url === "/api/names") {
        if (req.method === "GET") {

            res.writeHead(200, { 'content-type': "application/json" });
            res.write(jsonText);

        }
    }

    else if ( req.url.includes("/api/name/") ) {
        const arrayReq = req.url.split("/");
        const id = parseInt(arrayReq[arrayReq.length - 1]);

        // console.log(id, typeof id);

        // console.log(JSON.stringify(memoryDb.get(id)), typeof JSON.stringify(memoryDb.get(id)));
        res.writeHead(200, { 'content-type': "application/json" });
        res.write(JSON.stringify(memoryDb.get(id)));

    }

    res.end();
});

server.listen(8000);