var moment = require('moment');
moment.locale('ru');

export default {
  price: function ( _number ) {
    _number = _number.toString();
    _number = typeof _number != "undefined" && _number > 0 ? _number : "";
    _number = _number.replace(new RegExp("^(\\d{" + (_number.length%3? _number.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
    if(typeof _sep != "undefined" && _sep != " ") {
        _number = _number.replace(/\s/g, _sep);
    }
    return _number;
  },
  unixToDate: function( _timestamp ) {
    return moment(_timestamp).utcOffset('+0300').calendar();
  },
  moment() {
    return moment;
  }
}
