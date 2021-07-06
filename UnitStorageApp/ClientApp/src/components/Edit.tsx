import React, { FC, useEffect, useState } from 'react';
import { UnitData, getUnit, saveUnit } from '../services/unitService';
import { Form } from './Form';
import 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from './Header';

interface RouteProps {
  unitId: string;
}

interface Props extends RouteComponentProps<RouteProps> {}

export const Edit: FC<Props> = ({ match }) => {
  const unitId = match.params.unitId;

  const initialUnitState: UnitData = {
    id: unitId,
    maxHp: 0,
    maxMana: 0,
    currentHp: 0,
    currentMana: 0,
    armor: 0,
    magResist: 0,
    unitClass: 0,
    xPosition: 0,
    yPosition: 0,
  };

  useEffect(() => {
    retrieveUnit(match.params.unitId);
  }, [match.params.unitId]);

  const [unitState, setUnitState] = useState<UnitData>(initialUnitState);
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorMessages = validateForm();

    if (errorMessages.length) {
      setShowErrors(true);
      setErrors(errorMessages);
    } else {
      updateUnit(unitState);
      setSubmitted(true);
    }
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUnitState(initialUnitState);
    setSubmitted(false);
    setErrors([]);
    setShowErrors(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUnitState({ ...unitState, [name]: Number(value) });
    setSubmitted(false);
    setShowErrors(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUnitState({ ...unitState, [name]: Number(value) });
    setShowErrors(false);
    setSubmitted(false);
  };

  const retrieveUnit = async (id: string) => {
    const receivedUnit = await getUnit(id);

    if (receivedUnit) {
      setUnitState(receivedUnit);
    }
  };

  const updateUnit = (unit: UnitData) => {
    return saveUnit(unit);
  };

  const validateForm = () => {
    const errorMessages: string[] = [];

    if (unitState.maxHp <= 0) {
      errorMessages.push('Максимальное здоровье должно быть больше 0.');
    }

    if (unitState.currentHp > unitState.maxHp) {
      errorMessages.push(
        'Текущее здоровье не должно быть больше максимального здоровья.',
      );
    }

    if (unitState.currentMana > unitState.maxMana) {
      errorMessages.push(
        'Текущая мана не может быть больше максимальной маны.',
      );
    }

    return errorMessages;
  };

  return (
    <div>
      <Header />
      <div className="container mt-3">
        <div className="form-group mb-2">
          <label htmlFor="unitId">Идентификатор юнита</label>
          <input
            id="unitId"
            disabled={true}
            value={unitState.id}
            placeholder="Идентификатор юнита"
            name="unitId"
            className="form-control"
          />
        </div>
        <Form
          unit={unitState}
          isEditing={true}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onReset={handleReset}
          onSubmit={handleSubmit}
        />
        {submitted && (
          <div className="alert alert-success mt-3 mb-3">
            Изменения сохранены.
          </div>
        )}
        {showErrors && (
          <div className="alert alert-danger mt-3 mb-3">
            <ul>
              {errors.map((er) => (
                <li key={er}>{er}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
