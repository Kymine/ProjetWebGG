# Cahier des charges MVP

### Check list pour MVP

| Objectif                                    | Achevé  |
| :------------------------------------------ |:-------:|
| Découpage de la page en composants          | 100%    |
| Envoyer un message dans le channel général  | 100%    |
| Changement de channel                       | 100%    |
| Envoi de message dans chaque channel        | 100%    |
| Création d’un channel                       | 100%    |
| Pouvoir accéder à l'historique d'un channel | 100%    |

#### Changement de channel

-- (_Service, pipes, components, html, css_) --

Pour changer de channel, dans un premier temps :

1. On récupère la liste de tous les channels dans disponibles sur le serveur.
2. On fait en sorte que lorsque l'on clique sur un des channels disponibles affiché dans la liste de gauche, on puisse "se connecter" à se channel pour y envoyer des messages (voir objectif _**Pouvoir accéder à l'historique d'un channel**_ pour récupérer l'historique du channel sur lequel on vient de se connecter).
3. (Amélioration) Donner la possibilité à l'utilisateur de "s'abonner" à un channel.
4. (Amélioration) Permettre à l'utilisateur de consulter sa liste de channel favoris.
5. (Amélioration) Implémenter la suppression de channels auquel l'utilisateur est "abonné".

#### Envoi de message dans chaque channel

-- (_Service, pipes_) --

Objectif implicite au _**Changement de channel**_. Une fois que le changement de channel est établi, implicitement cela signifie que l'on peut envoyer des messages sur le channel correspondant.

#### Changement de channel

-- (_Service, pipes, components, html, css_) --

Nous savons comment créer un channel par un commande post. Il s'agit maintenant de mettre en place la partie HTML/CSS qui permet l'ajout dynamique d'un nouveau channel par l'utilisateur.

**/!\\ Les id de channels sont automatiquement créés et attribués par le serveur le seule renseignement à effectuer est le nom du channel. **

#### Pouvoir accéder à l'historique d'un channel

-- (_Service, pipes_) --

Implémenter cet objectif de sorte à ce que sur n'importe quel channel sur lequel on se connecte, on récupère la liste de tous les messages qui ont été postés dessus depuis le début (possible ?).

Si jamais il n'est pas possible de tout récupérer depuis le début, ou bien qu'il y a trop de messages à charger, fixer arbitrairement les modalités de récupération de l'historique, soit par rapport à un nombre de messages maximum ou encore par la date de dernier poste de message.
