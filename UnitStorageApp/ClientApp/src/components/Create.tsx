import React, { FC, useState } from 'react';
import { UnitData, createUnit } from '../services/unitService';
import { Form } from './Form';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from './Header';

export const Create: FC<RouteComponentProps> = ({ history }) => {
  const initialUnitState: UnitData = {
    id: '',
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
      createNewUnit();
      setSubmitted(true);
    }
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUnitState(initialUnitState);
    setErrors([]);
    setShowErrors(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUnitState({ ...unitState, [name]: Number(value) });
    setShowErrors(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUnitState({ ...unitState, [name]: Number(value) });
    setShowErrors(false);
  };

  const handleNewUnitClick = () => {
    setUnitState(initialUnitState);
    setSubmitted(false);
    setErrors([]);
    setShowErrors(false);
  };

  const handleReturnToUnitListClick = () => {
    history.push('/list');
  };

  const createNewUnit = async () => {
    await createUnit(unitState);
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
        {submitted ? (
          <div>
            <div className="alert alert-success mt-3 mb-3">Юнит создан</div>
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-primary form-control"
                  onClick={handleReturnToUnitListClick}
                >
                  К списку юнитов
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-success form-control"
                  onClick={handleNewUnitClick}
                >
                  Создать новый юнит
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Form
            unit={unitState}
            isEditing={false}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onReset={handleReset}
            onSubmit={handleSubmit}
          />
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
