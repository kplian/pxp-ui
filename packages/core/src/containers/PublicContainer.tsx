/**
 * Container for not logged in users
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React from 'react';

const PublicContainer = ({ children }) => {
  return (
    <div>
      <h1>Override your public container</h1>
      <main>{children}</main>
    </div>
  );
};

export default PublicContainer;
