using System;
using AutoMapper;
using Domain;

namespace Application.DTO
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<TrainingClass, OutputTrainingClass>();
            CreateMap<UserTrainingClass, OutputUserTrainingClass>()
                .ForMember(destinationMember => destinationMember.userName, OperatingSystem => OperatingSystem.MapFrom(sourceMember => sourceMember.User.UserName))
                .ForMember(destinationMember => destinationMember.fullName, OperatingSystem => OperatingSystem.MapFrom(sourceMember => sourceMember.User.FullName))
                .ForMember(destinationMember => destinationMember.image, OperatingSystem => OperatingSystem.MapFrom(sourceMember => sourceMember.User.photoUrl))
                ;

            // CreateMap<ICollection<Domain.UserTrainingClass>, ICollection<OutputUserTrainingClass>> ();
            // CreateMap<ICollection<Domain.TrainingClass>, ICollection<OutputTrainingClass>> ();

        }
    }
}
// using System;
// using AutoMapper;
// using Domain;

// namespace Application.DTO {
//     public class MappingProfile : Profile {
//         public MappingProfile () {
//             CreateMap<TrainingClass, OutputTrainingClass> ();
//             CreateMap<UserTrainingClass, OutputUserTrainingClass> ()
//                 .ForMember (destinationMember => destinationMember.userName, OperatingSystem => OperatingSystem.MapFrom (sourceMember => "ericwu"))
//                 .ForMember (destinationMember => destinationMember.fullName, OperatingSystem => OperatingSystem.MapFrom (sourceMember => "Eric Wu"));

//             // CreateMap<ICollection<Domain.UserTrainingClass>, ICollection<OutputUserTrainingClass>> ();
//             // CreateMap<ICollection<Domain.TrainingClass>, ICollection<OutputTrainingClass>> ();

//         }
//     }
// }