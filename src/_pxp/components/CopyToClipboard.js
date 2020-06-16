/**
 * Render prop component that wraps element in a Tooltip that shows "Copied to clipboard!" when the
 * copy function is invoked
 */
import Tooltip from '@material-ui/core/Tooltip';
import copy from 'clipboard-copy';
import React, { useState } from 'react';

const CopyToClipboard = ({ children, TooltipProps }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const onCopy = (content) => {
    copy(content);
    setShowTooltip(true);
  };
  const handleOnTooltipClose = () => {
    setShowTooltip(false);
  };
  return (
    <Tooltip
      open={showTooltip}
      title="Copied to clipboard!"
      leaveDelay={1500}
      onClose={handleOnTooltipClose}
      {...(TooltipProps || {})}
    >
      {children({ copy: onCopy })}
    </Tooltip>
  );
};

export default CopyToClipboard;
