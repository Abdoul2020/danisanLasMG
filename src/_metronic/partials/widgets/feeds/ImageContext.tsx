import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

interface ImageContextProps {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
}

const defaultState: ImageContextProps = {
  imageUrl: '',
  setImageUrl: () => {}, // an empty function, won't do anything if called
};

export const ImageContext = createContext<ImageContextProps>(defaultState);

export const ImageProvider: React.FC = ({ children }:any) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  return (
    <ImageContext.Provider value={{ imageUrl, setImageUrl }}>

      {children}
      
    </ImageContext.Provider>
  );
};


export default ImageContext;