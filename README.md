## Méthode de travail — Envoyer et Recevoir du JSON via méthodes POST

Rappel: le snippet pour gérer la réception de contenu JSON se trouve ici [https://nodejs.dev/learn/get-http-request-body-data-using-nodejs](https://nodejs.dev/learn/get-http-request-body-data-using-nodejs)

```jsx
// ... code omis 
const server = http.createServer((req, res) => {
	// ... code omis ...
  if (routeCondition) { 
		// ici démarrer votre route
		let data = '';
	  req.on('data', chunk => {
	    data += chunk;
	  });
	  req.on('end', () => {
	    data = JSON.parse(data); // ici vous récupérez le JSON sous forme d'un objet Javascript 
			// INCLURE VOTRE LOGIQUE DE ROUTE ICI
	    res.end(); // ici termine votre route
	  });
	}
});
// ... code omis 
```

Pour travailler avec du JSON et effectuer des requêtes POST et lire des réponses POST vous pouvez : 

- depuis une interface graphique vous pouvez utiliser un utilitaire desktop comme POSTMAN, (seulement si vous connaissez déjà)
- depuis la command line et effectuer des requêtes POST :
    - vous pouvez utiliser soit curl (seulement si vous connaissez déjà)

MAIS **JE VOUS RECOMMANDE httpie,** qui fonctionne depuis la ligne de commande et que vous pouvez installer dans votre subsystem linux avec `sudo apt-get install httpie`

httpie est plus simple que CURL pour notre usage (ex: [https://httpie.io/docs/cli/optional-get-and-post](https://httpie.io/docs/cli/optional-get-and-post) .)

Pour notre usage, pour envoyer le nombre 2 ainsi qu’un champ clef/valeur arbitraire à notre serveur `http POST localhost:5000/{{endpoint}} nombre=2 {{CLEF}}={{VALEUR}}`

Vous aurez besoin de cette méthode du module de base JSON: [https://www.w3schools.com/js/js_json_stringify.asp](https://www.w3schools.com/js/js_json_stringify.asp)

Vous aurez aussi besoin des HASHMAPS JS, les `Map` : [https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Map#exemples](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Map#exemples)

## Section 4 — Votre première CRUD API

Créer une DB en mémoire avec un système de clef primaire qui s’incrémente toujours de un

```jsx
const memoryDb = new Map(); // est global
let id = 0; // doit être global
memoryDb.set(id++, {nom: "Alice"}) // voici comment set une nouvelle entrée.
memoryDb.set(id++, {nom: "Bob"})
memoryDb.set(id++, {nom: "Charlie"})
```

Q11. 1 POINT — Créer aussi une route `GET /api/names` qui retourne l’intégralité de la database sous forme de JSON. Vous pouvez utiliser par exemple : [https://stackoverflow.com/a/53461519](https://stackoverflow.com/a/53461519) pour faire ce peu

Q12. 1 POINT — Créer une route `GET /api/name/{{id}}` qui retourne en JSON l’objet d’ID `{{id}}` avec le status code et le content type adequat. 

Q13. 1 POINT — Créer une route `POST /api/names` qui accepte un objet `{ name: {{payload}} }` et l’intégre à la base de donnée avec un ID unique. Renvoyez le status code et la réponse adequat.

Q14. 1 POINT — Implémentez `DELETE /api/name/{{id}}` et `PUT /api/name/{{id}}` qui vont respectivement supprimer et modifier l’objet d’ID `{{id}}` et retournez le status code et le content type adequat.

Q15. 1 POINT — Gérer les cas où on essaye d’accéder à une ressource dont l’ID n’existe pas ou n’existe plus.
