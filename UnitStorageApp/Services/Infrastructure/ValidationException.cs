using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UnitStorageApp.Services.Infrastructure
{
    public class ValidationException: Exception
    {
        public string Property { get; protected set; }
        public ValidationException(string message, string property) : base(message)
        {
            Property = property;
        }
    }
}
