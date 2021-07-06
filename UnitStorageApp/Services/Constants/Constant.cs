using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UnitStorageApp.Services.Constants
{
    public static class Constant
    {
        public const double closeCombatDistance = 10;
        public const double distantBattleDistance = 350;
        public const double magicFightDistance = 150;
        public const double baseHit = 10;

        public enum CombatType
        {
            CloseCombat,
            DistantBattle,
            MagicFight
        }

        public enum UnitClassType
        {
            Warrior,
            Archer,
            Wizard
        }
    }
}
