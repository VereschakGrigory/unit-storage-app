using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitStorageApp.Data.Interfaces;
using UnitStorageApp.Data.Models;
using MongoDB.Driver;

namespace UnitStorageApp.Data
{
    public class UnitRepository : IUnitRepository
    {
        private readonly IUnitStorageContext _context;

        public UnitRepository(IUnitStorageContext context)
        {
            _context = context;
        }

        public async Task Create(Unit unit)
        {
            await _context.Units.InsertOneAsync(unit);
        }

        public async Task<IEnumerable<Unit>> GetAll()
        {
            return await _context.Units.Find(u => true).ToListAsync();
        }

        public async Task<Unit> GetById(string id)
        {
            return await _context.Units.Find(u => u.Id == id).FirstOrDefaultAsync();
        }

        public async Task Remove(string id)
        {
            await _context.Units.DeleteOneAsync(u => u.Id == id);
        }

        public async Task Update(Unit unit)
        {
            await _context.Units.ReplaceOneAsync(u => u.Id == unit.Id, unit);
        }
    }
}
