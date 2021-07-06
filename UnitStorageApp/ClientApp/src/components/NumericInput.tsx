import React, { FC } from 'react';

interface Props {
  value: number;
  label: string;
  placeHolder: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumericInput: FC<Props> = ({
  value,
  label,
  placeHolder,
  name,
  onChange,
}) => {
  return (
    <div className="form-group mb-2">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        value={value}
        type="number"
        pattern="[0-9]"
        placeholder={placeHolder}
        name={name}
        onChange={onChange}
        className="form-control"
        min="0"
      />
    </div>
  );
};
