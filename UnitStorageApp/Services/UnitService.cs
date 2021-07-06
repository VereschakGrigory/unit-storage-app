using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitStorageApp.Services.DTO;
using UnitStorageApp.Services.Interfaces;
using UnitStorageApp.Data.Interfaces;
using UnitStorageApp.Data.Models;
using UnitStorageApp.Extensions;
using UnitStorageApp.Data;
using UnitStorageApp.Services.Constants;
using UnitStorageApp.Services.Infrastructure;
using MongoDB.Driver;

namespace UnitStorageApp.Services
{
    public class UnitService : IUnitService
    {
        private readonly IUnitRepository _repository;

        public UnitService(IUnitRepository repository)
        {
            _repository = repository;
        }

        public async Task Create(UnitDTO unitDto)
        {
            var unit = unitDto.ToEntity();
            await _repository.Create(unit);
        }

        public async Task<IEnumerable<UnitDTO>> GetAll()
        {
            var units = await _repository.GetAll();
            return units.Select(u => u.ToDto());
        }

        public async Task<UnitDTO> GetById(string id)
        {
            var unit = await _repository.GetById(id);

            if (unit == null)
            {
                throw new ValidationException("Юнит с указанным идентификатором не найден", "");
            }

            return unit.ToDto();
        }

        public async Task Remove(string id)
        {
            await _repository.Remove(id);
        }

        public async Task Update(UnitDTO unitDto)
        {
            var unit = unitDto.ToEntity();
            await _repository.Update(unit);
        }

        public async Task<IEnumerable<UnitDTO>> Attack(string attackerId, string defenderId)
        {
            var attacker = await GetById(attackerId);
            var defender = await GetById(defenderId);

            var distance = GetDistanceBetweenEnemies(attacker, defender);

            if (IsUnitAbleToAttack(attacker, distance))
            {
                var combatType = GetCombatType(attacker);

                switch (combatType)
                {
                    case Constant.CombatType.CloseCombat:
                        MakeCloseAttack(attacker, defender);
                        break;

                    case Constant.CombatType.DistantBattle:
                        MakeDistantAttack(attacker, defender, distance);
                        break;

                    case Constant.CombatType.MagicFight:
                        MakeMagicAttack(attacker, defender);
                        break;
                }

                if (combatType == Constant.CombatType.MagicFight)
                {
                    await Update(attacker);
                }

                await Update(defender);
            }
            
            return new List<UnitDTO>() { attacker, defender};
        }

        private static void MakeCloseAttack(UnitDTO attacker, UnitDTO defender)
        {
            var attackerHit = CalculateWarriorHit(attacker);
            DefendFromPhysicalHit(attackerHit, defender);
        }

        private static void MakeDistantAttack(UnitDTO attacker, UnitDTO defender, double distance)
        {
            var attackerHit = CalculateArcherHit(attacker, distance);
            DefendFromPhysicalHit(attackerHit, defender);
        }

        private static void MakeMagicAttack(UnitDTO attacker, UnitDTO defender)
        {
            var attackerHit = CalculateWizardHit(attacker);
            DefendFromMagicalHit(attackerHit, defender);

        }

        private static void DefendFromMagicalHit(int hit, UnitDTO defender)
        {
            var receivedDamage = hit - defender.MagResist;
            CalculateReceivedDamage(receivedDamage, defender);
        }

        private static void DefendFromPhysicalHit(int hit, UnitDTO defender)
        {
            var receivedDamage = hit - defender.Armor;
            CalculateReceivedDamage(receivedDamage, defender);
        }

        private static void CalculateReceivedDamage(int receivedDamage, UnitDTO defender)
        {
            var hp = defender.CurrentHp - receivedDamage;

            if (hp < 1)
            {
                defender.CurrentHp = 0;
            }
            else
            {
                defender.CurrentHp = hp;
            }
        }

        private static bool IsUnitAbleToAttack(UnitDTO unitDto, double distance)
        {
            switch ((Constant.UnitClassType)unitDto.UnitClass)
            {
                case Constant.UnitClassType.Warrior:
                    return distance <= Constant.closeCombatDistance;
                case Constant.UnitClassType.Archer:
                    return distance <= Constant.distantBattleDistance;
                case Constant.UnitClassType.Wizard:
                    return distance <= Constant.magicFightDistance;
                default:
                    return false;
            }
        }

        private static double GetDistanceBetweenEnemies(UnitDTO firstEnemy, UnitDTO secondEnemy)
        {
            var xDiff = secondEnemy.XPosition - firstEnemy.XPosition;
            var yDiff = secondEnemy.YPosition - firstEnemy.YPosition;
            return Math.Sqrt(Math.Pow(xDiff, 2) + Math.Pow(yDiff, 2));
        }

        private static int CalculateWarriorHit(UnitDTO warrior)
        {
            var missingHealth = warrior.MaxHp - warrior.CurrentHp;
            return (int)Math.Floor(Constant.baseHit +
                missingHealth / warrior.MaxHp * Constant.baseHit);
        }

        private static int CalculateArcherHit(UnitDTO unit, double distance)
        {
            return (int)Math.Floor(Constant.baseHit +
                distance / Constant.distantBattleDistance * Constant.baseHit);
        }

        private static int CalculateWizardHit(UnitDTO wizard)
        {
            int hit;
            if (wizard.CurrentMana > 1)
            {
                hit = (int)Math.Floor(Constant.baseHit * 2);
                wizard.CurrentMana /= 2;
            }
            else
            {
                hit = (int)Math.Floor(Constant.baseHit / 2);
            }

            return hit;
        }

        private static Constant.CombatType GetCombatType(UnitDTO unit)
        {
            return (Constant.CombatType)unit.UnitClass;
        }
    }
}
