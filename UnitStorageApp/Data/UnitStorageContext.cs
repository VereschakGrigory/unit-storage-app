using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitStorageApp.Data.Interfaces;
using UnitStorageApp.Data.Models;
using MongoDB.Driver;

namespace UnitStorageApp.Data
{
    public class UnitStorageContext : IUnitStorageContext
    {
        public UnitStorageContext(IUnitStorageDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            Units = database.GetCollection<Unit>(settings.UnitCollectionName);
        }

        public IMongoCollection<Unit> Units { get; }
    }
}
