import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";



type Props = {
    value: any,
    onChange: any,

}


const MetronicPhoneInput: React.FC<Props> = ({ value, onChange, ...props }) => {
    const handleChange = (phone: any) => {
        if (onChange) {
            onChange(phone);
        }
    };

    const inputStyle = {
        width: "100%",
    };

    return (

<PhoneInput
            {...props}
            value={value}
            country={"tr"}
            countryCodeEditable={false}
            onChange={handleChange}
            inputStyle={inputStyle}
            containerStyle={{ width: "100%", }}
            placeholder="Telefon Numaranız"
            inputClass="form-control form-control-lg form-control-solid"

        />
       
    );
};

export default MetronicPhoneInput;
