import React from 'react';

import CalendarHeader from './CalendarHeader';
import WeekDays from './WeekDays';
import MonthDates from './MonthDates';

export default class Calendar extends React.Component {
  constructor (props) {
    super (props);
    let date = new Date();
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth(),
      selectedYear: date.getFullYear(),
      selectedMonth: date.getMonth(),
      selectedDate: date.getDate(),
      selectedDt: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      startDay: 1,
      weekNumbers: false,
      dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      monthNamesFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      firstOfMonth: null,
      daysInMonth: null
    };

    this.calc = this.calc.bind(this);
    this.getPrev = this.getPrev.bind(this);
    this.getNext = this.getNext.bind(this);
    this.selectDate = this.selectDate.bind(this);

  }

  calc (year, month) {
    if (this.state.selectedElement) {
      if (this.state.selectedMonth != month || this.state.selectedYear != year) {
        this.state.selectedElement.classList.remove('r-selected');
      } else {
        this.state.selectedElement.classList.add('r-selected');
      }
    }
    return {
      firstOfMonth: new Date(year, month, 1), // почему тут просто month?
      daysInMonth: new Date(year, month + 1, 0).getDate() // а тут month + 1 ?
    };

  }

  componentWillMount () {
    this.setState(this.calc(this.state.year, this.state.month));
  }

  //componentDidMount () {}
 /* componentDidUpdate (prevProps, prevState) {
    if (this.props.onSelect && prevState.selectedDt != this.state.selectedDt) {
      this.props.onSelect.call(this.getDOMNode(), this.state); // придется удалить, т.к. getDOMNode() deprecated
    }
  }
*/
  getPrev () {
    let state = {};
    if (this.state.month > 0) {
      state.month = this.state.month - 1;
      state.year = this.state.year;
    } else {
      state.month = 11;
      state.year = this.state.year - 1;
    }
    Object.assign(state, this.calc.call(null, state.year, state.month));
    this.setState(state);
  }
  getNext () {
    let state = {};
    if (this.state.month < 11) {
      state.month = this.state.month + 1;
      state.year = this.state.year;
    } else {
      state.month = 0;
      state.year = this.state.year + 1;
    }
    Object.assign(state, this.calc.call(null, state.year, state.month));
    this.setState(state);
  }
  selectDate (year, month, date, element) {
    if (this.state.selectedElement) {
      this.state.selectedElement.classList.remove('r-selected');
    }
    element.target.classList.add('r-selected');
    this.setState({
      selectedYear: year,
      selectedMonth: month,
      selectedDate: date,
      selectedDt: new Date(year, month, date),
      selectedElement: element.target
    });
    alert('Hello!'); // место для вашей рекламы :)
    /*
    // неверно
    render () {

      return React.createElement(
       'div',
        { className: 'r-description' },
        'Here is description'
      )
    }
    */
  }

  render () {

    return React.createElement(
      'div',
      { className: 'r-calendar' },
      React.createElement(
        'div',
        { className: 'r-inner' },

        React.createElement(CalendarHeader, { monthNames: this.state.monthNamesFull, month: this.state.month, year: this.state.year, onPrev: this.getPrev, onNext: this.getNext }),
        React.createElement(WeekDays, { dayNames: this.state.dayNames, startDay: this.state.startDay, weekNumbers: this.state.weekNumbers }),
        React.createElement(MonthDates, {dataBase: this.props.dataBase, month: this.state.month, year: this.state.year, daysInMonth: this.state.daysInMonth, firstOfMonth: this.state.firstOfMonth, startDay: this.state.startDay, onSelect: this.selectDate, weekNumbers: this.state.weekNumbers })
      )/*,
      React.createElement(
        'div',
        {},
        this.props.events
      )*/
    );

  }
}
