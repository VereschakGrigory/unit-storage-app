using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitStorageApp.Data.Interfaces;

namespace UnitStorageApp.Data
{
    public class UnitStorageDatabaseSettings : IUnitStorageDatabaseSettings
    {
        public string UnitCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
