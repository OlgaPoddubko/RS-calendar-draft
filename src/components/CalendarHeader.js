import React from 'react';

export default class CalendarHeader extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return React.createElement(
      'div',
      { className: 'r-row r-head' },
      React.createElement('div', { className: 'r-cell r-prev', onClick: this.props.onPrev, role: 'button', tabIndex: '0' }),
      React.createElement(
        'div',
        { className: 'r-cell r-title' },
        this.props.monthNames[this.props.month],
        ' ',
        this.props.year
      ),
      React.createElement('div', { className: 'r-cell r-next', onClick: this.props.onNext, role: 'button', tabIndex: '0' })
    );
  }
}
