1. Initialise dependencies
npm install
2. Run server
node server.js

# Routes
## Trening
1. GET	    /api/trening        Get all from trening
2. GET	    /api/trening/[id]	Get trening by id
3. POST    /api/trening        Add trening
```json
{
  "id_t": 2,
  "opis_t": "Opis treninga",
  "naziv_t": "Naziv treninga",
  "kapacitet": 10
}
```
4. PUT	    /api/trening/[id]	- Update trening by id
5. DELETE	/api/trening/[id]	Delete trening
## Termin
1. GET     /api/termin         -  Get all from termin
2. GET /api/termin/[id]        - Get termin by id
3. POST /api/termin            - Add termin
```json
{
  "id_t": 2,
  "datum": "2025-06-10",
  "vrijeme": "15:00:00"
}
```
4. PUT     /api/termin/[id]   - Update termin by id
5. DELETE  /api/termin/[id]   -  Delete termin by id
## Korisnik
1. GET     /api/korisnik          -  Get all users
2. GET     /api/korisnik/:oib     - Get user by OIB
3. POST    /api/korisnik          -  Add new user
```json
{
  "oib": "12345678901",
  "ime": "Ana",
  "prezime": "Anić",
  "email": "ana@example.com",
  "lozinka": "password123"
}
```
4. PUT /api/korisnik/:oib      -  Update user by OIB
5. DELETE /api/korisnik/:oib   - Delete user by OIB

## Trener/Instruktor

1. GET     /api/trener          - Get all treneri
2. GET     /api/trener/:oib     - Get trener by OIB
3. POST    /api/trener          -  Add new trener
```json
{
  "oib": "12345678901"
}
```
4. DELETE /api/trener/:oib     - Delete trener by OIB
5. PUT /api/trener/:oib/treninzi  - Update trainings for coach by OIB

## Korisnički profil
1. GET /api/profil/:oib        -  Get profil by OIB
