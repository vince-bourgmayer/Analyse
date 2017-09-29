Node.js, Express.js, MongoDB

Pour lancer le projet:
Ouvrir un terminal à la racine du projet et entrer la commande:
`SET DEBUG=chartApp:* & npm start`



# Description du projet et du besoin:
Le cahier des charges est un document formulant le besoin du client, au moyen de fonctions détaillant les services rendus par le produit et les contraintes auxquelles il est soumis.

## Information sur ce document :
Date de création : 02 janvier 2016
Date de dernière modification : Dernière modification : 17 avril 2016

## Besoins :
Cet outil a des objectifs multiples.
Premièrement, cet outil a pour objectif de permettre la réalisation d’enquête (ou études).
+ Il doit permettre la collecte facile et rapide de données. Les données collectées correspondent à des mesures et peuvent porter sur tout et n’importe quoi (ex : acidité, prix, taille, distance, mesure temporelle, mesure spatiale, volume, poids, …). La simplicité et la rapidité de saisie sont des éléments clefs. Le fonctionnement doit être ergonomique et intuitif.
+ L’outil doit permettre, dans un premier temps, la consultation de ces données sous forme de tableaux manipulables (masquer/afficher des colonnes, réorganisations de colonnes, colorations de cellules, …) puis, dans un second temps, sous forme de graphiques, statistiques et/ou indicateurs.

Par exemple : on doit pouvoir consulter l’évolution du prix au litre de l’essence à partir des données collectées dans une étude collectant des informations tel que le prix au litre de l’essence à une date donnée.


Dans un deuxième temps, cet outil doit permettre la centralisation des enquêtes et données des utilisateurs en permettant la collecte d’information à partir de systèmes tiers tel qu’une maison connectée ou une banque. A l’heure actuelle, chaque société propose son propre service de « tableau de bord » concernant son service et ses données. Ce qui implique pour l’utilisateur de naviguer sur un grand nombre de site pour obtenir toutes ses informations (ce qui ajoute un cout environnemental que l’on pourrait éviter). Ces informations ne sont pas toujours simples à comprendre. L’idée est de permettre la centralisation de ces données pour que l’utilisateur gagne du temps et de la lisibilité. Il faut également pouvoir croiser des données de différentes enquêtes.


La troisième fonctionnalité du produit, est de pouvoir partager ses statistiques et indicateurs à qui l’ont veut. On pourra, par exemple, si l’on suit sa consommation alimentaire, son nombre de pas par jour et son rythme cardiaque, présenter ces informations à son médecin qui pourront peut-être l’aider dans son diagnostic.
Une quatrième fonctionnalité, bien que facultative, est quelque peu similaire à la troisième. J’envisage de pouvoir diffuser ou vendre des données (anonymes) pour permettre à des tiers d’établir des modèles. Cela devrait permettre d’autofinancer le projet.


En définitive, cet outil se présente comme un tableau de bord personnalisable et global disponible pour tout le monde (les entreprises comme les particuliers, le publique comme le privé).
En ne ciblant personne et en généralisant la démarche, j’ai pris conscience qu’un tel outil pourra servir sur de nombreux plans, en voici quelques exemples: 
+ communication des entreprises, transparence, marketing : communication de résultat, …
+ médecine : aide au diagnostic, au suivi de patient, …
+ politique, sociologique : Sondage, relevé d’opinions, suivi démographique, …
+ écologique : carte de pollution des sols, de l’air, progression d’espèces invasives, évolutions de la température…
+ économique : gestion et suivis de budget, répartition des ressources, …

## Contraintes :
Les données doivent être anonymes. Un compte utilisateur ne doit pas permettre de savoir de qui il s’agit. Cela me paraît être une condition critique pour que le projet soit utilisé à grande échelle pour deux raisons :
+ Inciter les personnes à se servir de l’outil sans se sentir surveillé.
+ Cela évite d’avoir à déclarer la base de données à la CNIL (facultatif). Attention, je ne souhaite pas que ce projet devienne une échappatoire à la CNIL pour des entreprises peu scrupuleuses.


Pour être anonyme, elles ne doivent contenir aucun élément permettant d’identifier clairement un utilisateur (sauf si celui-ci le désir). Lors d’une création d’enquête, l’utilisateur devra être prévenu lorsque son identité est potentiellement déductible de ses données. On peut, de manière non obligatoire, envisager la possibilité d’encoder les données dans la base de données pour les rendre illisibles directement.


N’importe quels types de mesure doit pouvoir être effectué. Attention, cependant, ce projet garde une finalité sociale et environnementale plus importante que sa finalité monétaire. Je veux donc qu’il y ait des sécurités contre l’utilisation de ce projet à des fins contraires à l’éthique. Il faut donc envisager la possibilité d’un contrôle sur les enquêtes effectuées.
Il apparait également de manière évidente que la sécurité d’une telle application sera une cible potentiel pour des pirates, … La sécurité sera alors un aspect tout aussi critique que l’anonymat des données.

## Solution envisagée :
La solution envisagée est une application web en ligne complété par une application pour Smartphones et tablettes. Le grand nombre potentiel de donnée me pousse à m’orienter vers les bases de données de type « Big Data ». Plus concrètement une base de donnée orientée document tel que MongoDB semble être nécessaire pour sa souplesse. Car la structure d’un document n’est pas aussi rigide/fixe qu’une table dans une base de donnée relationnelle classique comme MySQL.
