import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

interface DropdownComponentProps {
  options: string[];
  updateData: any

}

const DropdownWithoutSearch: React.FC<DropdownComponentProps> = ({ options, updateData }) => {

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggle = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  // set new select Type of data  & sen to parent 


  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey !== null) {
      setSelectedOption(selectedKey);
      setDropdownOpen(false);
      updateData(selectedKey);
    }
  };
  


  // const handleSelect = (selectedKey: string | null) => {
  //   if (selectedKey !== null) {

  //     setSelectedOption(selectedKey);
  //     setDropdownOpen(false);
  //     updateData(selectedOption);
  //   }
  // };





  return (
    <Dropdown show={isDropdownOpen} onToggle={handleToggle} onSelect={handleSelect}>
      <Dropdown.Toggle variant="" id="dropdown-custom-components" className="form-control-lg form-control-solid mb-3 mb-lg-0 text-start form-control">
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: "100%" }}>
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
