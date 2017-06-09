import React from 'react';

export default class WeekDays extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    let that = this,
      haystack = Array.apply(null, { length: 7 }).map(Number.call, Number);
    return React.createElement(
      'div',
      { className: 'r-row r-weekdays' },
      (() => {
        if (that.props.weekNumbers) {
          return React.createElement(
            'div',
            { className: 'r-cell r-weeknum' },
            'wn'
          );
        }
      })(),
      haystack.map(function (item, i) {
        return React.createElement(
          'div',
          { className: 'r-cell' },
          that.props.dayNames[(that.props.startDay + i) % 7]
        );
      })
    );
  }
}
