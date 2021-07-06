using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UnitStorageApp.Services.DTO
{
    public class UnitDTO
    {
        public string Id { get; set; }
        public int MaxHp { get; set; }
        public int MaxMana { get; set; }
        public int CurrentHp { get; set; }
        public int CurrentMana { get; set; }
        public int Armor { get; set; }
        public int MagResist { get; set; }
        public int UnitClass { get; set; }
        public int XPosition { get; set; }
        public int YPosition { get; set; }
    }
}
