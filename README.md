# DT210G Fördjupad frontend-utveckling - Moment 2

## Projektbeskrivning - Todo-applikation
Detta är en React-applikation byggd med TypeScript där användare kan skapa uppgifter som samlas i en lista. Projektet har skapats som en del av kursen DT210G Fördjupad frontend-utveckling och fokuserar på tillståndshantering, formulärhantering samt integration med ett backend-API.

## Funktionalitet
- Hämta och visa en lista över befintliga uppgifter
- Lägga till nya uppgifter i listan
- Uppdatera status på en uppgift
- Ta bort en uppgift efter bekräftelse
- Uppgifter sorteras efter status Ej startad, Pågående, Avslutad
- Laddningshantering vid inläsning av data från API-anrop
- Formulärvalidering där titel är obligatoriskt (minst 3 tecken) samt beskrivning max 200 tecken
- Felhantering med tydliga felmeddelanden samt bekräftelser vid skapande, uppdatering och borttagning av uppgifter
- Responsiv design för både desktop och mobila enheter

## Tekniker
### Frontend
- **React**
- **TypeScript**
- **JSX/TSX**
- **CSS**
- **Vite**
- **Yup**
- **Fetch API**
### Backend
- **Hapi.js**
- **MongoDB**
- **Mongoose**

## Backend-API
Projektet kräver ett backend-API för att hantera uppgifter (CRUD-operationer). API:et som skapats stödjer följande:
- Hämta alla uppgifter
- Skapa en ny uppgift
- Uppdatera en specifik uppgift
- Ta bort en specifik uppgift

Backend är byggt med Hapi.js och ansluter till en MongoDB-databas med hjälp av Mongoose. Servern hanterar API-anrop och validering av data innan det lagras i databasen. 

## Om
- **Av:** Isa Westling  
- **Kurs:** DT210G Fördjupad frontend-utveckling  
- **Program:** Webbutvecklingsprogrammet  
- **År:** 2025  
- **Termin:** 4 (VT)  
- **Skola:** Mittuniversitetet