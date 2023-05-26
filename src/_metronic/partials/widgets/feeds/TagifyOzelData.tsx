import React, { useRef, useEffect } from 'react';
//@ts-ignore
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css'; // Import Tagify CSS for default styling



type Props = {
    value: any,
    onChange:any,
    suggestions:any
    
  }

const MetronicTagifyPrivate:React.FC<Props>  = ({ value, onChange, suggestions }) => {



    useEffect(() => {

    console.log("whateyu", value)

    }, [value])
    

    
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const tagify = new Tagify(inputRef.current, {
        // Tagify configuration options go here
        delimiters: ',',
        maxTags: 100,
        whitelist: suggestions, // Add suggestions for the dropdown
        enforceWhitelist: true,
        dropdown: {
          maxItems: 100,
          enabled: 0, // Show the dropdown immediately on focus
          closeOnSelect: false, // Keep dropdown open after selecting an item
        },
      });

      // Define the change event callback
      const handleChange = (e:any) => {
        if (onChange) {
          onChange(e.detail.value.split(',').filter((tag:any) => tag.trim() !== ''));
        }
      };

      // Add event listener for tag changes
      tagify.on('change', handleChange);

      // Clean up the event listener when the component is unmounted
      return () => {

        tagify.off('change', handleChange);
        tagify.destroy();
      };

    }

    
  }, []);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={() => {}}
      style={{ display: 'none' }} // Hide the actual input field
      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0 px-4'

    />
  );
};

export default MetronicTagifyPrivate;
