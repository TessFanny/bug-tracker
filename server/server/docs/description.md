## traquer les problèmes dans la gestion des projets

- on veut créer un application qui va se charger d'enregistrer des projets, de repertorier les bugs qui y sont associés et les résoudre


## étapes pour réaliser l'application web:

- faire une user stories;
- faire un wireframe, un mcd;
- créer la base de données (créer toutes le tables et les associations) et faire le seeding;
- creer un server et connecter la base de données;
- faire les modeles(active record) et les controllers pour le REST API
- faire la documentation de l'API avec swagger;
- gerer la journalisateur des erreurs avec winston 
- faire la vérification des données avec Joi; 
- faire des tests unitaires avec Supertest; 
- faire la partie front avec react;


|en tant que |jai besoin de  ...|afin de   ...|commentaire|
|------|------|-----|-----|
|submitter| me connecter| rentrer un bug|-----|
|submitter| me connecter| ajouter un commentaire à un bug|-----|
|developpeur |connecter|mettre à jour les données d'un bug|---|
|developpeur |connecter|resoudre un bug|---|
|developpeur |connecter|ajouter un commentaire|---|
|dev manager|connecter| ajouter un projet|----| 
|dev manager|connecter| modifier un projet|----| 
|dev manager|connecter| ajouter un commentaire à un bug|----| 
|dev manager|connecter| modifier un bug|----| 
|dev manager|connecter| mettre à jour un bug|----| 
|assignee|connecter| modifier un projet|----| 
|admin| connecter| ajouter un projet | ---|
|admin| connecter| ajouter un bug |----|
|admin| connecter| ajouter un ou plusieurs memebres  à un projet|---|
|admin| connecter| assigner la résolution d'un bug à un membre|---|
|admin| connecter| gérer les roles des utilisateurs|---|
|admin| connecter| ajouter un commentaire|---|




Application de Suivi de Bugs
Une application de suivi de bugs qui aide les équipes de développement de logiciels à suivre et gérer les bugs dans leur logiciel. Avec cette application, vous pouvez suivre les rapports de bugs, attribuer des tâches à des membres de l'équipe et définir des délais pour corriger les bugs. L'application fournit une interface facile à utiliser pour signaler, suivre et résoudre les bugs.

Fonctionnalités
Interface conviviale pour signaler et suivre les bugs
Attribuer des tâches à des membres de l'équipe
Définir des délais pour corriger les bugs

Statut en temps réel des bugs
Notifications automatiques pour les mises à jour de bugs
Possibilité de joindre des captures d'écran et des fichiers pour une meilleure description du bug
Fonction de recherche pour retrouver facilement les bugs enregistrés
Historique complet des mises à jour de bugs
Possibilité de filtrer les bugs en fonction de différents critères tels que l'état, la priorité, le responsable, etc.
Comment utiliser
Inscrivez-vous pour obtenir un compte utilisateur
Créez un nouveau rapport de bug en fournissant les détails pertinents, tels que la description, la gravité et les captures d'écran associées.
Assignez la tâche de résolution de bug à un membre de l'équipe.
Suivez l'état du bug à mesure qu'il est corrigé.
Marquez le bug comme résolu lorsque la correction est terminée.
Prise en charge
