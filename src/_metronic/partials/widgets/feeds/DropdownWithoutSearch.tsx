import React, { useState } from 'react';
import { Dropdown, DropdownProps } from 'react-bootstrap';

interface DropdownComponentProps {
  options: string[];
  updateData: any;
}

const DropdownWithoutSearch: React.FC<DropdownComponentProps> = ({ options, updateData }) => {

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggle = (isOpen: boolean, meta: any) => {
    // close dropdown when an item is selected
    if (meta.source === 'select') {
      setDropdownOpen(false);
    } else {
      setDropdownOpen(isOpen);
    }
  };

  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey !== null) {
      setSelectedOption(selectedKey);
      updateData(selectedKey);
    }
  };

  return (
    <Dropdown show={isDropdownOpen} onToggle={handleToggle} onSelect={handleSelect}>
      <Dropdown.Toggle variant="" id="dropdown-custom-components" className="form-control-lg form-control-solid mb-3 mb-lg-0 text-start form-control">
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: "100%", maxHeight: '200px', overflow: 'auto' }}>
        {options.map((option) => (
          <Dropdown.Item
            key={option}
            eventKey={option}
            className={selectedOption === option ? 'active' : ''}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownWithoutSearch;