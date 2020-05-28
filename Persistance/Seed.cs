using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistance
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<User>{
                    new User{
                        Id="a",
                        FullName="Eric Wu",
                        UserName = "ericwu",
                        Email="eric@email.com"
                    },
                     new User{
                         Id="b",
                        FullName="Kevin Wu",
                        UserName = "kevinwu",
                        Email="kevin@email.com"
                    },
                    new User{
                        Id="c",
                        FullName="Oliver Wu",
                        UserName = "oliverwu",
                        Email="oliver@email.com"
                    }
                };
                foreach (var item in users)
                {
                    await userManager.CreateAsync(item, "Password123@");
                }
                context.SaveChanges();
            }
            if (!context.TrainingClasses.Any())
            {
                var trainingClasses = new List<TrainingClass> {
                    new TrainingClass {
                        Title = "Get Fit",
                            Time="12:00",
                            Description = "This is a great group training class for lose weight and get fit over all",
                            Category = "weight-loss",
                            DayOfWeek = 5,
                            City = "Surrey",
                            Address = "200-1938 152 St",
                            PostalCode = "V4A 4N6",
                            Province = "BC",
                            Country = "Canada",
                            TotalSpots = 3,
                            UserTrainingClasses = new List<UserTrainingClass>
                        {
                            new UserTrainingClass
                            {
                                UserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new TrainingClass {
                        Title = "Cross Fit",
                           Time="13:00",
                            Description = "Amazing Cross fit training for the age 18 - 35.",
                            Category = "general",
                            DayOfWeek = 2,
                            City = "Surrey",
                            Address = "200-1938 152 St",
                            PostalCode = "V4A 4N6",
                            Province = "BC",
                            Country = "Canada",
                            TotalSpots = 3,
                            UserTrainingClasses = new List<UserTrainingClass>
                        {
                            new UserTrainingClass
                            {
                                UserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-4)
                            }
                        }
                    },
                };
                context.TrainingClasses.AddRange(trainingClasses);
                context.SaveChanges(); //no need for async because there is no request when starts up
            }

        }
    }
}