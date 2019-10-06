import React, { Fragment } from 'react';

import loader from './loader.gif';

const Loader = ({ width = 100}) => (
  <Fragment>
    <img src={loader} alt='Loading' style={{ width: `${width}px`, display: 'block', margin: 'auto', marginTop: '60px' }} />
  </Fragment>
)

export default Loader;