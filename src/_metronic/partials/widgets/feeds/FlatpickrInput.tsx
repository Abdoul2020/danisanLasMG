import React, { useEffect, useRef, useState } from 'react';
import flatpickr from 'flatpickr';
import { Turkish } from 'flatpickr/dist/l10n/tr.js';

interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentValue, setCurrentValue] = useState<string | undefined>(value);

  useEffect(() => {
    const timeInput = inputRef.current;

    if (timeInput) {
      // Initialize Flatpickr as a time picker
      const flatpickrInstance = flatpickr(timeInput, {
        enableTime: true, // Enable time selection
        noCalendar: true, // Disable date selection
        dateFormat: 'H:i', // Set the time format
        locale: Turkish,
        // Other options...
        onChange: (selectedDates: Date[], dateString: string) => {
          setCurrentValue(dateString);
          if (onChange) {
            onChange(dateString);
          }
        },
      });

      // Set the initial value
      if (currentValue) {
        flatpickrInstance.setDate(currentValue, false, 'H:i');
      }

      // Type assertion to allow accessing _flatpickr property
      (timeInput as any)._flatpickr = flatpickrInstance;
    }

    return () => {


        console.log("okkYuuu::", value)
      // Destroy Flatpickr instance when the component unmounts
      if (timeInput && (timeInput as any)._flatpickr) {
        (timeInput as any)._flatpickr.destroy();
        
      }
    };
  }, [value, onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      className="form-control form-control-solid"
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
    />
  );
};

export default TimePicker;
