using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistance
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.TrainingClasses.Any())
            {
                System.Console.WriteLine("Yesssssss");
                var trainingClasses = new List<TrainingClass>
                {
                    new TrainingClass{
                        Title = "Get Fit",
                        Time = DateTime.Now.TimeOfDay,
                        Description = "This is a great group training class for lose weight and get fit over all",
                        Category = "Lose Weight",
                        DayOfWeek = DayOfWeek.Friday,
                        City = "Surrey",
                        Address="200-1938 152 St",
                        PostalCode = "V4A 4N6",
                        Province="BC",
                        Country="Canada",
                        TotalSpots=3
                    },
                    new TrainingClass{
                        Title = "Cross Fit",
                        Time = DateTime.Now.TimeOfDay,
                        Description = "Amazing Cross fit training for the age 18 - 35.",
                        Category = "General Fitness",
                        DayOfWeek = DayOfWeek.Thursday,
                        City = "Surrey",
                        Address="200-1938 152 St",
                        PostalCode = "V4A 4N6",
                        Province="BC",
                        Country="Canada",
                        TotalSpots=3
                    },
                };
                context.TrainingClasses.AddRange(trainingClasses);
                context.SaveChanges();//no need for async because there is no request when starts up
            }
        }
    }
}