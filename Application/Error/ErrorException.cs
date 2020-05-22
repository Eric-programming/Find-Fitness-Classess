using System;
using System.Net;

namespace Application.Errors
{
    public class ErrorException : Exception
    {
        public ErrorException(HttpStatusCode code, object errors = null)
        {
            Code = code;
            Errors = errors;
        }

        public HttpStatusCode Code { get; }
        public object Errors { get; }
    }
}