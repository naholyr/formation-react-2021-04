## Serveur Motux

Un jeu type "Motus"

![image](https://user-images.githubusercontent.com/214067/84530406-662cff00-ace3-11ea-88a8-08d9ae5899d3.png)

Pré-requis :

- Node
- Serveur Redis
  - Pour Windows [voir ServiceStack/redis-windows](https://github.com/ServiceStack/redis-windows)
  - Avec Docker : `docker run --name redis-formation -p 6379:6379 redis -d` puis `docker [start|stop|rm] redis-formation`

### Démarrage

- Installation des dépendances : `npm install`
- Initialisation des données : `node bin/init-data`
  - Taille de la DB Redis après initialisation : ~19Mib
- Démarrage du serveur :
  - Mode prod : `npm start`
  - Mode dev : `npm run watch`
  - Cluster : `node server-cluster` (cassé, pour illustration) et `node server-cluster-sticky` (fonctionnel, mais pas "_production ready_")

### Idées d'évolution

- ~~Trouver une vraie liste de mots valides de la langue française, ou une API permettant de faire le test~~ (merci [Christophe Pallier](http://www.pallier.org/liste-de-mots-francais.html))
- Afficher un compte à rebours lorsque l'input est _disabled_ côté front (ce qui permet de réfléchir à toutes les problématiques de synchronisation client/serveur, prise en compte du lag, tolérance, etc…)
- Implémenter une authentification par mot de passe, ou ‑ plus fort ‑ en utilisant un service tiers oauth (github par exemple) avec par exemple [Passport.js](http://www.passportjs.org/) (avec _`{session:false}`_, cf. la doc)
- La grosse évol : permettre d'héberger plusieurs parties en simultané
