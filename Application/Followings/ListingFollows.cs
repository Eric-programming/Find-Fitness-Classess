using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.DTO;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Followings {
    public class ListingFollows {

        public class List {
            public class Query : IRequest<List<OutputUserProfile>> {
                public string Username { get; set; }
                public string Predicate { get; set; }
            }

            public class Handler : IRequestHandler<Query, List<OutputUserProfile>> {
                private readonly DataContext _context;
                private readonly IProfileReader _profileReader;
                public Handler (DataContext context, IProfileReader profileReader) {
                    _profileReader = profileReader;
                    _context = context;
                }

                public async Task<List<OutputUserProfile>> Handle (Query request, CancellationToken cancellationToken) {
                    var queryable = _context.Followings.Include (x => x.Observer).Include (x => x.Target).AsQueryable ();

                    var userFollowings = new List<UserFollowing> ();
                    var profiles = new List<OutputUserProfile> ();

                    switch (request.Predicate.ToLower ()) {
                        case "followers":
                            {
                                // var list = await _context.Followings.Where (x => x.Target.UserName == request.Username).ToListAsync ();
                                userFollowings = await queryable.Where (x =>
                                    x.Target.UserName == request.Username).ToListAsync ();

                                foreach (var follower in userFollowings) {
                                    profiles.Add (await _profileReader.ReadProfile (follower.Observer.UserName));
                                }
                                break;
                            }
                        case "following":
                            {
                                userFollowings = await queryable.Where (x =>
                                    x.Observer.UserName == request.Username).ToListAsync ();

                                foreach (var follower in userFollowings) {
                                    profiles.Add (await _profileReader.ReadProfile (follower.Target.UserName));
                                }
                                break;
                            }
                    }
                    return profiles;
                }
            }
        }
    }
}