namespace UnitStorageApp.Data.Interfaces
{
    public interface IUnitStorageDatabaseSettings
    {
        string UnitCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
