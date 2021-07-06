import React, { FC } from 'react';
import { UnitData } from '../services/unitService';
import { UnitTableRow } from './UnitTableRow';

interface Props {
  units: UnitData[];
  handleRemoveClick: (id: string) => void;
}

export const UnitTable: FC<Props> = ({ units, handleRemoveClick }) => {
  return (
    <table className="table table-borderless">
      <tbody>
        {units.map((unit) => (
          <UnitTableRow
            key={unit.id}
            unit={unit}
            handleRemoveClick={handleRemoveClick}
          />
        ))}
      </tbody>
    </table>
  );
};
