/**
 * Pages Context to make available all lazy loaded pages
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { createContext, useState } from 'react';
import iconsPxp from '../icons';

const PagesContext = createContext({
  pages: {},
  savePages: (updatedPages) => {
    this.pages = updatedPages;
  },
  icons: {},
});

export function PagesProvider({ pages, icons, children }) {
  const [currentPages, setCurrentPages] = useState(pages || {});
  const currentIcons = { ...iconsPxp, ...icons };

  const handleSavePages = (updatedPages = {}) => {
    const mergedPages = { ...currentPages, ...updatedPages };
    setCurrentPages(mergedPages);
  };

  return (
    <PagesContext.Provider
      value={{
        pages: currentPages,
        savePages: handleSavePages,
        icons: currentIcons,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
}

export const PagesConsumer = PagesContext.Consumer;

export default PagesContext;
