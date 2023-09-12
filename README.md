# Bug Tracker App
Bienvenue dans l'application Bug Tracker ! Cette application a été développée en utilisant Node.js pour le backend et React pour le frontend. Elle vous permet de suivre les problèmes, les bogues  de développement de vos projets.

## Installation
Suivez ces étapes pour installer l'application sur votre machine :

1. Assurez-vous d'avoir Node.js et npm installés. Vous pouvez les télécharger depuis nodejs.org.

2. Clonez ce dépôt sur votre ordinateur en utilisant la commande suivante :

```bash
git clone https://github.com/votre-utilisateur/bug-tracker.git
```
3. Accédez au répertoire du projet :
```bash
cd bug-tracker
```
4. Installez les dépendances du backend en exécutant la commande suivante :
```bash
cd server
```
```bash
npm install
```

5. Accédez au répertoire client pour installer les dépendances du frontend :

```bash
cd client
```
```bash
npm install
```
### <u>Configuration</u>
1. Créez un fichier:
 ```bash 
.env
```  
dans le répertoire du backend pour configurer les variables d'environnement nécessaires. Vous pouvez vous inspirer du fichier .env.example.

2. Configurez votre base de données, par exemple en utilisant __Postgresql__ et mettez à jour les informations de connexion dans le fichier __.env__.

### <u>Démarrage de l'application</u>
Une fois que vous avez installé et configuré l'application, vous pouvez la démarrer avec les commandes suivantes :

1. Démarrer le backend (dans le répertoire principal du projet) :


```sql
npm run start
```
2. Démarrer le frontend (dans le répertoire client) :

```sql
npm run start
```
L'application sera accessible dans votre navigateur à l'adresse :  http://localhost:3000.

### <u>Utilisation</u>
Vous pouvez vous enregistrer et vous connecter à l'application en utilisant vos identifiants préalablement crées.

Une fois connecté, vous pouvez ajouter de nouveaux bugs et projets, afficher la liste des bugs existants, les mettre à jour et les supprimer.

L'application offre également des fonctionnalités avancées telles que la recherche de bugs et des projets, le tri par statut, la création de tâches et bien d'autres.

### <u>Contribution</u>
Nous sommes ouverts aux contributions ! Si vous souhaitez contribuer à l'amélioration de cette application, suivez ces étapes :

Créez une branche pour votre contribution :


```git
git checkout -b nom-de-votre-branche
```
Faites vos modifications, puis soumettez une demande de fusion (Pull Request) vers la branche principale.

Nous examinerons votre contribution et la fusionnerons si elle est approuvée.

### <u>Problèmes connus</u>
...
### <u>Licence</u>
Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.

N'hésitez pas à explorer le code source de l'application et à contribuer pour l'améliorer. Si vous avez des questions ou des problèmes, veuillez ouvrir une nouvelle issue sur GitHub. Je serai ravie de vous aider !

__Bon suivi de bugs !__