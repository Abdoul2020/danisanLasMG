import React, { useState,useEffect } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';

interface DropdownComponentProps {
  options: string[];
  updateDataChange:any;
  selectedOptionChoose:any
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ options,updateDataChange, selectedOptionChoose  }) => {

    console.log("wichOption", options)
    console.log("chooseOptionnn", selectedOptionChoose)

   
    

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSelectedOption(selectedOptionChoose!=="" ? selectedOptionChoose : options[0])
  }, [options])


  useEffect(() => {
    console.log("seleceted", selectedOption )
  }, [selectedOption])
  


  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey !== null) {
      setSelectedOption(selectedKey);
      updateDataChange(selectedKey)
    }
    
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().startsWith(searchValue.toLowerCase())
  );

  const handleSearchInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="" id="dropdown-custom-components" className="form-control-lg form-control-solid mb-3 mb-lg-0 text-start form-control">
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: "100%",maxHeight: "200px", overflowY: "auto" }}>
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
              className={selectedOption === option ? 'active' : ''}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item disabled>Seçenek bulunamadı</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;
