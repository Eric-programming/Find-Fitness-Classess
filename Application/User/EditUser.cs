using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.DTO;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.User
{
    public class EditUser
    {
        public class EditUserCommand : IRequest<OutputEditUser>
        {
            [Required]
            public string FullName { get; set; }

            [Required]
            public string Bio { get; set; }
        }

        public class Handler : IRequestHandler<EditUserCommand, OutputEditUser>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<OutputEditUser> Handle(EditUserCommand request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                if (user == null)
                    throw new ErrorException(HttpStatusCode.Unauthorized);
                user.FullName = request.FullName;
                user.Bio = request.Bio;
                if (await _context.SaveChangesAsync() > 0)
                    return new OutputEditUser
                    {
                        fullName = user.FullName,
                        bio = user.Bio
                    };
                throw new Exception("Problem edit user");
            }
        }
    }
}