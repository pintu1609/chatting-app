// MyProvider.js
import React from 'react';
import { MyProvider as ContextProvider } from './MyContext'; // Rename the import
import Chats from '../component/Chats';

const MyProviderWrapper = () => {  // Change the component name
  return (
    <ContextProvider>
      <Chats />
    </ContextProvider>
  );
};

export default MyProviderWrapper;  // Change the export name
