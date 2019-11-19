import React from 'react';
import { hydrate } from 'react-dom';

import { DBNormalized } from '../typings';
import { Folder } from '../components/Folder/Folder';

interface ExtendedWindow extends Window {
  __initialState__?: DBNormalized;
}

const { __initialState__ } = window as ExtendedWindow;

hydrate(__initialState__
  ? <Folder store={__initialState__} />
  : <>Please provide initial state</>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
