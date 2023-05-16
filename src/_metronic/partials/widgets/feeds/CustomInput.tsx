import React from 'react'
import { InputProps } from 'react-select';

type Props = {
	value: any,
	
}

const CustomInput:any = (props:any) => {

    return (
      <input
        {...props}
        className="form-control form-control-lg form-control-solid w-full"
      />
    );
  };

  export default CustomInput