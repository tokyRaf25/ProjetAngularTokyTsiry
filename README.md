# Projet Angular de gestion des assignments
Projet Frontend Angular

# Lien du projet sur heroku
https://angularfronttokytsiry.herokuapp.com/

# Membres du groupe
- RAFIDIMANANA Toky Ny Aina Num-19
- ANDRIAMAHAFALY Tsiry Abdou Axel Num-01

# Démarrage du projet
Pour lancer le projet en local, il faut:
- Faire un "npm install" pour les nodes modules
(On a pas besoin de lancer l'api node en local car nous utilisons les liens de l'api herbergé sur heroku)
- Faire un "ng serve" pour lancer l'application

# Login de l'application
Pour admin:
 -  Username: toky
 -  Password: toky

# Fonctionnalités détaillées du projet
- Ajout des collections utilisateurs et matières
- Amélioration de l'interface du projet
- Authentification avec un compte admin de l'application:
  - Nous avons utilisé LocalStorage de angular pour sauvegarder l'état et les informations de l'individu connecté
- Dans la liste des assignments:
  - Nous avons divisé la liste en deux parties assignments rendus et non rendus afin d'effectuer un "Drag and Drop" entre les deux
  - Nous pouvons voir les détails de l'assignment avec le bouton détail.
- Ajout d'un assignment avec un formulaire de type Stepper  
- Dans détail d'un assignment:
  - Nous pouvons supprimer, modifier un assignment ou l'atrribuer une note afin de rendre un assignment
- Gestion des erreurs:
  - Login incorrect
  - Lorsqu'on rend un assignment sans note (utilisation des SnackBar pour les messages)

# Remarque
Quand vous allez ajouter un nouveau assignment, veuillez vous mettre à la fin de la paggination pour le voir 

# Webographie
- https://medium.com/@tiagovalverde/how-to-save-your-app-state-in-localstorage-with-angular-ce3f49362e31
- https://material.angular.io/components/stepper/examples
- https://material.angular.io/components/snack-bar/examples
- https://v7.material.angular.io/cdk/drag-drop/examples
- https://material.angular.io/components/toolbar/examples
