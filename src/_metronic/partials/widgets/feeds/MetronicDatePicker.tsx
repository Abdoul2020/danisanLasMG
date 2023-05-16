import React, { useState } from "react";
import DatePicker,{ registerLocale } from "react-datepicker";
import { format } from "date-fns";
import { tr } from "date-fns/locale"; // Import Turkish locale
import "react-datepicker/dist/react-datepicker.css";
//import "./MetronicDatePicker.css"; // Import Metronic theme's custom styling
registerLocale("tr", tr); // Register Turkish locale


type Props = {
    label: any,
    onChange:any,
    value:any,
    language:any
    
  }

const MetronicDatePicker:React.FC<Props> = ({ label, onChange, value, language }) => {
  const [startDate, setStartDate] = useState(value || new Date());

  const handleDateChange = (date:any) => {
    setStartDate(date);
    onChange && onChange(date);
  };

  return (
    <div className="metronic-date-picker">
      <DatePicker
        className="form-control form-control-lg form-control-solid"
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="dd-MM-yyyy"
        locale={language === "tr" ? "tr" : undefined} // Use Turkish locale if language prop is set to "tr"
      />
    </div>
  );
};

export default MetronicDatePicker;
