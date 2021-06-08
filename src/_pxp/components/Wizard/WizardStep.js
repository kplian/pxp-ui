import React from 'react';
import PropTypes from 'prop-types';

const WizardStep = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
};


WizardStep.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.any.isRequired,
    valid: PropTypes.bool.isRequired,
    onNext: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
  };
  
  // WizardStep.defaultProps = {
  //   valid: true,
  // };

export default WizardStep;
