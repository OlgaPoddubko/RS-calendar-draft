import React from 'react';
import { render } from 'react-dom';

import serviceResponse from './serviceResponse';
import makeDB from './makeDB';
import Calendar from './components/Calendar';

function makeQuery() {
  serviceResponse().then((response) => {
    let DB = makeDB(response);
    console.log(DB);

    render(
      <Calendar dataBase = {DB} />,
      document.querySelector('#root')
    );
  }).catch((error) => {
    console.warn(error);
  });
}

makeQuery();
