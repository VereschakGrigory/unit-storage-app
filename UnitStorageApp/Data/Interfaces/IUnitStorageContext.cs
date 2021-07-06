using MongoDB.Driver;
using UnitStorageApp.Data.Models;

namespace UnitStorageApp.Data.Interfaces
{
    public interface IUnitStorageContext
    {
        IMongoCollection<Unit> Units { get; }
    }
}
