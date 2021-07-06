export interface UnitData {
  id: string;
  maxHp: number;
  maxMana: number;
  currentHp: number;
  currentMana: number;
  armor: number;
  magResist: number;
  unitClass: number;
  xPosition: number;
  yPosition: number;
}

export const unitClasses: string[] = ['Воин', 'Лучник', 'Волшебник'];

export const getUnits = async (): Promise<UnitData[]> => {
  try {
    const result = await fetch('/api/unit/list');
    return result.json();
  } catch (ex) {
    console.error(ex);
    return [];
  }
};

export const removeUnit = async (id: string): Promise<void> => {
  try {
    await fetch(`api/unit/remove/${id}`, { method: 'delete' });
  } catch (ex) {
    console.error(ex);
  }
};

export const createUnit = async (unit: UnitData): Promise<void> => {
  try {
    await fetch('/api/unit/create', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(unit),
    });
  } catch (ex) {
    console.error(ex);
  }
};

export const getUnit = async (id: string): Promise<UnitData | null> => {
  try {
    const result = await fetch(`/api/unit/edit/${id}`);
    return result.json();
  } catch (ex) {
    console.error(ex);
    return null;
  }
};

export const saveUnit = async (unit: UnitData): Promise<void> => {
  try {
    await fetch('/api/unit/edit', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(unit),
    });
  } catch (ex) {
    console.error(ex);
  }
};
