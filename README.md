# Find Fitness Classess

> App for people to find their ideal fitness classess.

## URL

[YouTube App Demo](https://www.youtube.com/watch?v=SK9Kbaef79c)

## Tools

- C# ASP.NET Core
- Angular TS

## Setups & Run the app

```
1. Update Appsettings.json Cloudinary

2. Dotnet restore

3. cd api && dotnet watch run

4. cd.. && cd client && npm i

5. npm start

```

## Setup for Production

```
1. cd client && npm run build

2. npm run postpublish

3. cd .. && cd api && dotnet watch run

4. make sure app is functional on http://localhost:4000/

5. Change DB to a preferred data management system (MySQL, Postgres, SQL, etc.)

6. Optional: configure apache to use https ssl certification

7. Publish to Cloud or Linux server

```

## Run App

```
1. cd client && npm start
2. cd api && dotnet watch run or dotnet run
```

## Clean Architecture:

```
Why?
- Make Framework Independent
- Make our application testable
- Mainly for large/complex application

```

## Data Model

![Data Modeling](https://user-images.githubusercontent.com/54079742/85230083-8a06d980-b3a2-11ea-979f-4d50fae5ddad.PNG)

- Version: 1.0.0
- License: MIT
- Author: Eric
