import { Typography } from '@material-ui/core';
import React, { useState } from 'react';

function Logo() {
  const [title] = useState('Coin keeper');

  return <Typography variant="h4">{title}</Typography>;
}

export default Logo;
