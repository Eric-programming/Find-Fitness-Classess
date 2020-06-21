# Find Fitness Classess
> App for people to find their ideal fitness classess.
## Tools
C# ASP.NET Core & Angular TS

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
    "CloudName": "df4wo0lfq",
    "ApiKey": "557275171173912",
    "ApiSecret": "LEY_5Tk4iA56YYyv_d1X6FCFvdg"
  }
}

2. Dotnet restore
3. cd client && npm i
```
## Run App
1. cd client && npm start
2. cd api && dotnet watch run or dotnet run
```

- Version: 1.0.0
- License: MIT
- Author: Eric


