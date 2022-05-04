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
    
    if (req.url === "/api/names") {
        
        if (req.method === "GET") {
            const jsonText = JSON.stringify(Array.from(memoryDb.entries()));
            res.writeHead(200, { 'content-type': "application/json" });
            res.write(jsonText);

        }

        if (req.method === "POST") {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });
            req.on('end', () => {
                // INCLURE VOTRE LOGIQUE DE ROUTE ICI
                
                // ici vous récupérez le JSON sous forme d'un objet Javascript 
                data = JSON.parse(data); 
                memoryDb.set(++id, data);

                res.end();
            });

        }
    }

    else if ( req.url.includes("/api/name/") ) {
        if (req.method === "GET") {
            const arrayReq = req.url.split("/");
            const id = parseInt(arrayReq[arrayReq.length - 1]);
    
            // console.log(id, typeof id);
            if (id) { // Si un id a été entré
                
                if (memoryDb.get(id) != null) { // si l'id est dans la BDD
                    // console.log(JSON.stringify(memoryDb.get(id)), typeof JSON.stringify(memoryDb.get(id)));
                    res.writeHead(200, { 'content-type': "application/json" });
                    res.write(JSON.stringify(memoryDb.get(id)));
                }
    
                else { // Si l'utilisateur n'existe pas
                    res.write("<h1>Cet utilisateur n'existe pas</h1>");
                    res.writeHead(404, { 'content-type': "text/html" });
                }
            }
            else{ // Si aucun id n'a été entré
                res.writeHead(404, { 'content-type': "text/html" });
                res.write("<h1>Cet utilisateur n'existe pas</h1>");
            }
            
        }

    }

    res.end();
});

server.listen(8000);