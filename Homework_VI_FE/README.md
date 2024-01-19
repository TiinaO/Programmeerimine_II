# API tutvustus
Tegemist on To Do APIga, kus sisse logitud kasutaja saab endale luua ülesandeid, sellele määrata prioriteeti, kategooriat ning lisada sellele alamülesandeid.

API koosneb viiest resursist: users, tasks, priorities, categories, subtasks.

# Nõuded API kasutamiseks
Node.js on vajalik.
## Enne käivitamist
Installida kõik vajalikud noded ja dependency'd
```
npm i
```
Rakenduse käivitamiseks
```
npm start
```

# End-poindid
```/users``` - kasutajad. Olemas on nii Admin kui ka Tavakasutaja rollid.

```/tasks``` - ülesanded, mis kuuluvad kindlale kasutajale

```/categories``` - kategooriad, mida saab lisada ülesandele

```/priorities``` - prioriteet, mida saab lisada ülesandele

```/subtasks``` - alamülesanded, mida lisatakse ülesandele

## Autentimine on vajalik end-pointidele
Kasutajal on vaja sisse logida enne kui ta saab enda taskidele ligi ja nendega midagi peale hakata. Logimiseta ei ole võimalik tegevusi sooritada. 

Kasutaja loomine ja login on ainukesed endpoint, kus ei kontrollita, kas ollakse sisse logitud.

## Kasutaja loomine
Kasutajat saab luua POST /users 
Vaja sisestada firstName, lastName, email, password.

## Autentimise juhend
### Enda audentimine
Autentida saab ennast tehes POST ```/login```
Selle jaoks on vaja sisestada email, parool

### Tokeni kasutamine
Tokeni tuleb Headeris kaasa anda, et saaks kontrollida, mis rolliga on kasutaja ning mis kasutajaga on tegemist
Selle jaoks, et anda Thunder Clientis kaasa Bearer token tuleb teha järgmised sammud:
1. Minna tegema requesti, millel on vaja sisse logimist
2. Lisada headerisse Authorization: Bearer Token
3. Auth alt valida tab Bearer Token
4. Lisada sinna logimisel saadud JWT token

## Muudatuste sissetoomise juhend
### Kasutajaga seotud muudatused
Taskidega seotud muudatused tuleb teha failides, mis asuvad kasutas src/components/users
### Taskidega seotud muudatused
Taskidega seotud muudatused tuleb teha failides, mis asuvad kasutas src/components/tasks

## Dockeri käivitamise
Käsk 
```
docker run -p 3306:3306 -d -v data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=*SIIAPASSWORD* mysql
```
Dockeris toimetamiseks - andmebaasi logimine: mysql -u root -p
