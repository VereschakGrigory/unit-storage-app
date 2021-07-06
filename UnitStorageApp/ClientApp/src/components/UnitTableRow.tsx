import React, { FC } from 'react';
import { UnitData, unitClasses } from '../services/unitService';
import { Link } from 'react-router-dom';

interface Props {
  unit: UnitData;
  handleRemoveClick: (id: string) => void;
}

export const UnitTableRow: FC<Props> = ({ unit, handleRemoveClick }) => {
  const hpString = `${unit.currentHp}/${unit.maxHp}`;
  const manaString = `${unit.currentMana}/${unit.maxMana}`;

  return (
    <>
      <tr className="bg-light rounded">
        <td className="col-3">UnitId: {unit.id}</td>
        <td className="col-1">
          <span className="bg-danger text-center rounded p-1">{hpString}</span>
        </td>
        <td className="col-1">
          <span className="bg-info text-center rounded p-1">{manaString}</span>
        </td>
        <td className="col-6">
          <span className="bg-primary text-center rounded p-1 text-white">
            {unitClasses[unit.unitClass]}
          </span>
        </td>
        <td>
          <Link to={`/edit/${unit.id}`}>
            <button className="btn btn-warning form-control btn-sm">
              Редактировать
            </button>
          </Link>
        </td>
        <td>
          <button
            className="btn btn-danger form-control btn-sm"
            onClick={() => handleRemoveClick(unit.id)}
          >
            Удалить
          </button>
        </td>
      </tr>
    </>
  );
};
