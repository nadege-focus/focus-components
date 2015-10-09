// Components

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputDate = FocusComponents.components.input.Date;

var locale = {
    format: 'L',
    months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Aujourd\'hui à] LT',
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'dans %s',
        past: 'il y a %s',
        s: 'quelques secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
    },
    ordinalParse: /\d{1,2}(er|)/,
    ordinal: function ordinal(number) {
        return number + (number === 1 ? 'er' : '');
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};

var InputDateSample = (function (_React$Component) {
    _inherits(InputDateSample, _React$Component);

    function InputDateSample(props) {
        var _this = this;

        _classCallCheck(this, InputDateSample);

        _React$Component.call(this, props);

        this.changeHandler = function (id) {
            return function (value) {
                var _setState;

                var _refs$validate = _this.refs['date' + id].validate(value);

                var isValid = _refs$validate.isValid;
                var message = _refs$validate.message;

                _this.setState((_setState = {}, _setState['date' + id] = value, _setState['error' + id] = isValid ? null : message, _setState));
            };
        };

        this.render = function () {
            var _state = _this.state;
            var date1 = _state.date1;
            var error1 = _state.error1;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h3',
                    null,
                    'With value'
                ),
                React.createElement(InputDate, { error: error1, locale: locale, name: 'date1', onChange: _this.changeHandler(1), ref: 'date1', value: date1 })
            );
        };

        this.state = {
            date1: moment().toISOString()
        };
    }

    return InputDateSample;
})(React.Component);

return React.createElement(InputDateSample, null);