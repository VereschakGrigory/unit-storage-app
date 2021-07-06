using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitStorageApp.Services.DTO;

namespace UnitStorageApp.Services.Interfaces
{
    public interface IUnitService
    {
        Task<IEnumerable<UnitDTO>> GetAll();
        Task<UnitDTO> GetById(string id);
        Task Create(UnitDTO unitDto);
        Task Update(UnitDTO unitDto);
        Task Remove(string id);
        Task<IEnumerable<UnitDTO>> Attack(string attackerId, string defenderId);
    }
}
