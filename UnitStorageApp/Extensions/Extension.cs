using UnitStorageApp.Data.Models;
using UnitStorageApp.Services.DTO;

namespace UnitStorageApp.Extensions
{
    public static class Extension
    {
        public static UnitDTO ToDto(this Unit unit)
        {
            return new UnitDTO
            {
                Id = unit.Id,
                MaxHp = unit.MaxHp,
                MaxMana = unit.MaxMana,
                CurrentHp = unit.CurrentHp,
                CurrentMana = unit.CurrentMana,
                Armor = unit.Armor,
                MagResist = unit.MagResist,
                UnitClass = unit.UnitClass,
                XPosition = unit.XPosition,
                YPosition = unit.YPosition
            };
        }

        public static Unit ToEntity(this UnitDTO unitDto)
        {
            return new Unit
            {
                Id = unitDto.Id,
                MaxHp = unitDto.MaxHp,
                MaxMana = unitDto.MaxMana,
                CurrentHp = unitDto.CurrentHp,
                CurrentMana = unitDto.CurrentMana,
                Armor = unitDto.Armor,
                MagResist = unitDto.MagResist,
                UnitClass = unitDto.UnitClass,
                XPosition = unitDto.XPosition,
                YPosition = unitDto.YPosition
            };
        }
    }
}
