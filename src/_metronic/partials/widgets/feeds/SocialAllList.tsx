import React, { useState } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';

interface DropdownComponentProps {
  options: string[];
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [searchValue, setSearchValue] = useState('');
  const [hoveredOption, setHoveredOption] = useState('');

  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey !== null) {
      setSelectedOption(selectedKey);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleMouseEnter = (option: string) => {
    setHoveredOption(option);
  };

  const handleMouseLeave = () => {
    setHoveredOption('');
  };

  const handleSearchInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().startsWith(searchValue.toLowerCase())
  );

  const getOptionIcon = (option: string) => {
    if (option === 'facebook') {
      return <i className="fab fa-facebook"></i>; // Replace with the appropriate Facebook icon component or SVG
    } else if (option === 'instagram') {
      return <i className="fab fa-instagram"></i>; // Replace with the appropriate Instagram icon component or SVG
    } else if (option === 'Twitter') {
      return <i className="fab fa-twitter"></i>; // Replace with the appropriate Twitter icon component or SVG
    }
    return null;
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        variant=""
        id="dropdown-custom-components"
        className="form-control-lg form-control-solid mb-3 mb-lg-0 text-start form-control"
      >
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: "100%" }}>
        <FormControl
          autoFocus
          className=""
          placeholder="Ara..."
          value={searchValue}
          onChange={handleInputChange}
          onClick={handleSearchInputClick}
        />
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <Dropdown.Item
              key={option}
              eventKey={option}
              className={`${selectedOption === option ? 'active' : ''} ${hoveredOption === option ? 'hovered' : ''
                }`}
              onClick={() => setSelectedOption(option)}
              onMouseEnter={() => handleMouseEnter(option)}
              onMouseLeave={handleMouseLeave}
            >
              {option} {hoveredOption === option && getOptionIcon(option)}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item disabled>No options found</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;
