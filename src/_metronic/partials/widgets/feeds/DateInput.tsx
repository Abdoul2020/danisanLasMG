import React from 'react';
import InputMask from 'react-input-mask';

const DateInput: React.FC = () => {
    return (

        <InputMask
        mask="99/99"
        className="form-control form-control-solid"
        placeholder="MM/DD"
    />


    )
  
};

export default DateInput;