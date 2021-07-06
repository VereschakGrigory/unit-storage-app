import React, { FC, useEffect, useState } from 'react';
import { UnitData, getUnits, removeUnit } from '../services/unitService';
import { UnitTable } from './UnitTable';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from './Header';

export const Units: FC<RouteComponentProps> = ({ history }) => {
  const [units, setUnits] = useState<UnitData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    retrieveUnits();
  }, []);

  const retrieveUnits = async () => {
    const receivedUnits: UnitData[] = await getUnits();
    setUnits(receivedUnits);
    setLoading(false);
  };

  const handleRemoveClick = (id: string) => {
    removeUnit(id);

    const filteredUnits = units.filter((u) => u.id !== id);
    setUnits(filteredUnits);
  };

  const handleCreateUnitClick = () => {
    history.push('/create');
  };

  const renderUnits = () => {
    return units.length ? (
      <UnitTable handleRemoveClick={handleRemoveClick} units={units} />
    ) : (
      <div className="alert alert-warning">Список юнитов пуст.</div>
    );
  };

  return (
    <div>
      <Header />
      <div className="container mt-3">
        <div className="row">
          <button
            type="button"
            className="btn btn-success btn-lg form-control mt-3 mb-3"
            onClick={handleCreateUnitClick}
          >
            Создать юнит
          </button>
        </div>
        {loading ? (
          <p>
            <em>Загрузка данных...</em>
          </p>
        ) : (
          renderUnits()
        )}
      </div>
    </div>
  );
};
