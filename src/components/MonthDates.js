import React from 'react';

export default class MonthDates extends React.Component {

  constructor (props) {
    super (props);

    // необходимо разобраться с state - props, т.к. месяц не обновляется, все по today

    this.today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.year = this.props.year/*.getFullYear()*/;
    this.month = this.props.month/*today.getMonth()*/;

/*
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
   // this.date = new Date().getDate(); // не используется
    this.today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    */
  }

  render () {
    let haystack,
      day,
      d,
      current,
      onClick,
      isDate,
      className,
      weekStack = Array.apply(null, { length: 7 }).map(Number.call, Number),
      that = this,
      startDay = this.props.firstOfMonth.getUTCDay(),
      first = this.props.firstOfMonth.getDay(),
      janOne = new Date(that.year, 0, 1),
      rows = 5,
      RSEvent;

    if (startDay == 5 && this.props.daysInMonth == 31 || startDay == 6 && this.props.daysInMonth > 29) {
      rows = 6;
    }

    className = rows === 6 ? 'r-dates' : 'r-dates r-fix';
    haystack = Array.apply(null, { length: rows }).map(Number.call, Number);
    day = this.props.startDay + 1 - first;
    while (day > 1) {
      day -= 7;
    }
    day -= 1;
    return React.createElement(
      'div',
      { className: className },
      haystack.map(function (item, i) {
        d = day + i * 7;
        return React.createElement(
          'div',
          { className: 'r-row' },
          (() => {
            if (that.props.weekNumbers) {
              let wn = Math.ceil(((new Date(that.year, that.month, d) - janOne) / 86400000 + janOne.getDay() + 1) / 7);
              return React.createElement(
                'div',
                { className: 'r-cell r-weeknum' },
                wn
              );
            }
          })(),
          weekStack.map(function (item, i) {
            d += 1;
            isDate = d > 0 && d <= that.props.daysInMonth;

            if (isDate) {
              current = new Date(that.year, that.month, d);
              className = current.valueOf() != that.today.valueOf() ? 'r-cell r-date' : 'r-cell r-date r-today'; // при смене месяца все равно подсвечивается дата

              //console.log(that.props.dataBase);
              let key = current.valueOf();
              if(key in that.props.dataBase) {
                //console.log(that.props.dataBase);
                RSEvent = that.props.dataBase[key][0].type; //forEach( i => RSEvents.push(i.type));

                switch(RSEvent) {
                  case 'lecture': className = className + ' lecture';
                  break;
                  case 'webinar': className = className + ' webinar';
                    break;
                  case 'workshop': className = className + ' workshop';
                    break;
                  case 'event': className = className + ' event';
                    break;
                  case 'deadline': className = className + ' deadline';
                    break;
                }

              } else {
                console.log('no coincidence');
                RSEvent = '';
                className = className + ' empty';
              }

              return React.createElement(
                'div',
                { className: className, /*id: current, */role: 'button', tabIndex: '0', onClick: that.props.onSelect.bind(that, that.year, that.month, d) },
                d + RSEvent
              );
            }

            return React.createElement('div', { className: 'r-cell' });
          })
        );
      })
    );
  }
}
