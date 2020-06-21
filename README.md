# Find Fitness Classess
> App for people to find their ideal fitness classess.
## Tools
- C# ASP.NET Core 
- Angular TS

## Setups

```
1.Add Appsetting.json
{
  "ConnectionStrings": {
    "DefaultCOnnection": "Data source=find-trainer.db"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*",
  "CloudinarySettings": {
    "CloudName": "YOUR-CLOUDNAME",
    "ApiKey": "YOUR-APIKEY",
    "ApiSecret": "YOUR-APISECRET"
  }
}

2. Dotnet restore
3. cd client && npm i
```
## Run App
```
1. cd client && npm start
2. cd api && dotnet watch run or dotnet run
```
## Clean Architecture:
```
Client (React App) depends on API, API(Handle Http request & response) depends on Application, Application (Handle all operations of the app) depends on Domains(Contains all business logic).
```
## Data Model
![Data Modeling](https://user-images.githubusercontent.com/54079742/85230083-8a06d980-b3a2-11ea-979f-4d50fae5ddad.PNG)
- Version: 1.0.0
- License: MIT
- Author: Eric


