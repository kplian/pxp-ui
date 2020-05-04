/**
 * Pages Context to make available all lazy loaded pages
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { createContext, useState } from 'react';

const PagesContext = createContext({
  pages: {},
  savePages: (updatedPages) => {
    this.pages = updatedPages;
  },
});

export function PagesProvider({ pages, children }) {
  const [currentPages, setCurrentPages] = useState(pages || {});

  const handleSavePages = (updatedPages = {}) => {
    const mergedPages = { ...currentPages, ...updatedPages };
    setCurrentPages(mergedPages);
  };

  return (
    <PagesContext.Provider
      value={{
        pages: currentPages,
        savePages: handleSavePages,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
}

export const PagesConsumer = PagesContext.Consumer;

export default PagesContext;
