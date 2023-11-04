import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ id, label, selected, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <DatePicker id={id} selected={selected} onChange={onChange} />
    </div>
  );
};

export default DateInput;
