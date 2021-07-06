using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitStorageApp.Data.Models;

namespace UnitStorageApp.Data.Interfaces
{
    public interface IUnitRepository
    {
        Task<IEnumerable<Unit>> GetAll();
        Task<Unit> GetById(string id);
        Task Create(Unit unit);
        Task Update(Unit unit);
        Task Remove(string id);
    }
}
