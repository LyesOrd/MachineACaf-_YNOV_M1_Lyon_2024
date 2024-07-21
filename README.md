![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)


# Methodo TU/TF

Projet de test d'une machine à café en appliquant les méthodes vus en cours


## Lancer les Tests

Récupérer ce qui a été fait sur le repo via fork de Monsieur Enzo Sandré. Une fois dans le répo du projet :

```bash
  npm i
  npm run build
  npm run test
```

## Note prises lors des discussions avec le client (Le prof)

#### Informations et questions divers pour gérer le SUCRE dans une machine à café : 

	Question 1 : la machine peut elle servir du café si le reservoir de sucre est vide ?

	Réponse 1 : oui, mais pas sucré, et on ne prévient pas l’utilisateur (géré par le hardware)
	
	Question 2 : que ce passe t’il si l’utilisateur bourrine le bouton de selection ?

	Réponse 2 : switch -> si l'appuie sur le bouton est impair alors mettre du sucre si pair alors ne pas mettre de sucre
	
	Question 3 : que ce passe t’il si le client ne selectionne pas de quantité de sucre ? annuler la commande ? ou lancer une quantité par défaut ?
    
    Réponse 3 : il faut selectionner le sucre avant de lancer la café


#### Informations et questions divers pour Gérer la dose de sucre : 

```
- Les doses varie de 1 à 5 dose possible

- 2 par défaut de dose de sucre

Si le nombre de sucre disponible à la demande est inférieur à celle demandée par l'utilisateur il faut servir tout le sucre qu'il nous reste

Question 1 : Est ce que l'on propose la dose 0 pour annuler la demande de sucre ou pas ? 

Réponse 1 : Non, puisque le choix du nombre de sucre ce fait de manière physique et pas logiciel

- Comment vérifier que la dose servie est bien la bonne ?

Réponse : On ne peut pas faire ça, ça fait partis des limites entre le métier et le tests
```

## Authors

- [@Lyes Ourred]()
- [@Mehdi Seddik]()
- [@Ilyes Deochandiano]()
