import React, { useEffect, useRef, ChangeEvent } from 'react';
import $ from 'jquery';


interface Option {
  value: string;
  label: string;
}

interface Select2Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const Select2: React.FC<Select2Props> = ({ options, value, onChange }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const select = $(selectRef.current!);
    (select as any).select2({
      theme: 'bootstrap',
      placeholder: 'Select an option',
    });

    select.val(value).trigger('change');

    select.on('change', (event: Event) => {
      const selectedValue = (event.target as HTMLSelectElement).value;
      onChange(selectedValue);
    });

    return () => {
      (select as any).select2('destroy');
    };
  }, [value, onChange]);

  return (
    <select ref={selectRef} className="form-control custom-select">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select2;
