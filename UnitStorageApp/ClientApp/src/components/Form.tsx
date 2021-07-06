import React, { FC } from 'react';
import { UnitData, unitClasses } from '../services/unitService';
import { NumericInput } from './NumericInput';

interface Props {
  unit: UnitData;
  isEditing: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onReset: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: FC<Props> = ({
  unit,
  isEditing,
  onInputChange,
  onSelectChange,
  onSubmit,
  onReset,
}) => {
  return (
    <div className="edit-form">
      <form onSubmit={onSubmit} onReset={onReset}>
        <div className="row">
          <div className="col">
            <NumericInput
              value={unit.currentHp}
              label="Текущее здоровье"
              placeHolder="Текущее здоровье"
              name="currentHp"
              onChange={onInputChange}
            />
          </div>
          <div className="col">
            <NumericInput
              value={unit.maxHp}
              label="Максимальное здоровье"
              placeHolder="Максимальное здоровье"
              name="maxHp"
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <NumericInput
              value={unit.currentMana}
              label="Текущая мана"
              placeHolder="Текущая мана"
              name="currentMana"
              onChange={onInputChange}
            />
          </div>
          <div className="col">
            <NumericInput
              value={unit.maxMana}
              label="Максимальная мана"
              placeHolder="Максимальная мана"
              name="maxMana"
              onChange={onInputChange}
            />
          </div>
        </div>

        <NumericInput
          value={unit.armor}
          label="Броня"
          placeHolder="Броня"
          name="armor"
          onChange={onInputChange}
        />

        <NumericInput
          value={unit.magResist}
          label="Магическое сопротивление"
          placeHolder="Магическое сопротивление"
          name="magResist"
          onChange={onInputChange}
        />

        <div className="form-control">
          <select
            value={unit.unitClass}
            className="form-select"
            onChange={onSelectChange}
            name="unitClass"
          >
            {unitClasses.map((unitClass, index) => (
              <option key={unitClass} value={index}>
                {unitClass}
              </option>
            ))}
          </select>
        </div>

        <NumericInput
          value={unit.xPosition}
          label="Координата X"
          placeHolder="Координата X"
          name="xPosition"
          onChange={onInputChange}
        />

        <NumericInput
          value={unit.yPosition}
          label="Координата Y"
          placeHolder="Координата Y"
          name="yPosition"
          onChange={onInputChange}
        />

        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-success form-control">
              {isEditing ? 'Сохранить изменения' : 'Создать юнит'}
            </button>
          </div>
          <div className="col">
            <button type="reset" className="btn btn-danger form-control">
              Сбросить значения
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
