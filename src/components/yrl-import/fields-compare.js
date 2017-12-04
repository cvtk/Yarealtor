const moment = require('moment');

function _isEmpty(value) {
  return typeof(value) === 'undefined' || !value;
}

function _ct(city) {
  let ct = city.split(' ');
  this.name = function() { return ct[0] };
  this.type = function() {
    return ( typeof ct[1] === 'undefined' ) ? 'г.': ct[1];
  }
}

function _addr(address) {
  const _woLast = function(value) {
    if ( !value ) return '';
    let arr = value.split(' ');
    return arr.slice(0, arr.length - 1).join(' ')
  };
  const _onlyLast = function(value) {
    if ( !value ) return '';
    let arr = value.split(' ');
    return arr.slice(-1).join(' ')
  };
  let strt = address.split(', ')[0],
      bldng = address.split(', ')[1];

  this.street = function() { return _woLast(strt) };
  this.building = function() { return _onlyLast(bldng) };
  this.streetType = function() { return _onlyLast(strt) };
  this.buildingType = function() { return _woLast(bldng) };

}

export default function(offer) {
  let address = offer.location['address'];
  // lets fuckin dance with meta

  this.key = function() {
    return offer['_internal-id'];
  };

  this.created = function() {
    return _isEmpty(offer['creation-date']) ||
            moment(offer['creation-date']).unix();
  };
  this.modified = function() {
    return _isEmpty(offer['last-update-date']) ||
            moment(offer['last-update-date']).unix();
  };

  this.type = function() {
    return ( offer.type === 'продажа' )? 1: 2;
  };

  this.object = function() {
    let obj = {
      1: ['квартира', 'flat'],
      2: ['комната', 'room'],
      3: ['коммерческая', 'commercial'],
      4: ['дача', 'коттедж', 'cottage', 'дом', 'house',
            'дом с участком', 'house with lot', 'часть дома',
              'таунхаус', 'townhouse'],
      5: ['гараж', 'garage'],
      6: ['участок', 'lot'],
    };

    for ( let option in obj ) {
      if ( obj.hasOwnProperty(option) &&
          obj[option].some( e => offer.category === e ) ) return option;
    }
  };

  // now lets get some general shit
  this.price = function() {
    return offer.price.value;
  };

  this.agent_pay = function() {
    return offer['agent-fee'];
  };

  this.images = function() {
    return offer.image;
  };

  this.description = function() {
    return offer.description;
  };

  this.locality = function() {
    let city = new _ct( offer.location['locality-name'] );
    return city.name();
  };

  this.localityType = function() {
    let city = new _ct( offer.location['locality-name'] );
    return city.type();
  };

  this.street = function() {
    if ( !address ) return;
    return new _addr(address).street();
  };

  this.streetType = function() {
    if ( !address ) return;
    return new _addr(address).streetType();
  };

  this.building = function() {
    if ( !address ) return;
    return new _addr(address).building();
  };

  this.buildingType = function() {
    if ( !address ) return;
    return new _addr(address).buildingType();
  };

  this.district = function() {
    let dstr = {
      1: 'Дзержинский',
      2: 'Заволжский',
      3: 'Кировский',
      4: 'Красноперекопский',
      5: 'Ленинский',
      6: 'Фрунзенский',
      7: 'Ярославский',
      8: 'Ярославская область',
    }

    for ( let option in dstr ) {
      if ( dstr.hasOwnProperty(option) &&
          dstr[option] === offer.location['sub-locality-name'] )
        return option;
    }
  };

  this.building_type = function() {
    let obj = {
      1: ['прямая продажа', 'sale', 'первичная продажа вторички', 
            'primary sale of secondary', 'встречная продажа',
              'countersale'],
      2: ['первичная продажа', 'продажа от застройщика',
            'переуступка', 'reassignment'],
    };

    for ( let option in obj ) {
      if ( obj.hasOwnProperty(option) &&
          obj[option].some( e => offer['deal-status'] === e ) )
        return option;
    }
  };

  this.material = function() {
    let obj = {
      1: 'блочный',
      2: 'деревянный',
      3: 'кирпичный',
      4: 'монолит',
      5: 'панельный',
      6: 'кирпично-монолитный'
    };

    for ( let option in obj ) {
      if ( obj.hasOwnProperty(option) &&
          obj[option] === offer['building-type'] )
        return option;
    }
  };

  this.rooms = function() {
    if ( _isEmpty(offer.rooms) ) return;
    return parseInt(offer.rooms);
  };

  this.floor = function() {
    if ( _isEmpty(offer.floor) ) return;
    return parseInt(offer.floor);
  };

  this.floors = function() {
    if ( _isEmpty(offer['floors-total']) ) return;
    return parseInt(offer['floors-total']);
  };

  this.area_full = function() {
    let area = offer['area'] || offer['room-space'];
    if ( _isEmpty(area) ) return;
    return parseFloat(area.value);
  };

  this.area_living = function() {
    let area = offer['living-space'];
    if ( _isEmpty(area) ) return;
    return parseFloat(area.value);
  };

  this.area_kitchen = function() {
    let area = offer['kitchen-space'];
    if ( _isEmpty(area) ) return;
    return parseFloat(area.value);
  };

  this.furnish = function() {
    let obj = {
      1: ['требует ремонта'],
      2: ['черновая отделка'],
      3: ['с отделкой'],
      4: ['частичный ремонт'],
      5: ['хороший'],
      6: ['евро', 'дизайнерский']
    };

    for ( let option in obj ) {
      if ( obj.hasOwnProperty(option) &&
          obj[option].some( e => offer.renovation === e ) )
        return option;
    }
  };

  this.bath = function() {
    let obj = {
      1: ['требует ремонта'],
      2: ['раздельный'],
      3: ['совмещенный'],
      4: ['частичный ремонт']
    };

    for ( let option in obj ) {
      if ( obj.hasOwnProperty(option) &&
          obj[option].some( e => offer['bathroom-unit'] === e ) )
        return option;
    }
  };

  this.balcony = function() {
    return !!offer.balcony;
  };

  this.placement_type = function() {
    // !!!not avaible in YANDEX!!!
    return 2;
  };

  this.condition_room = function() {
    // !!!not avaible in YANDEX!!!
    let obj = {
      1: ['нормальное', 'плохое'],
      2: ['хорошее'],
      3: ['отличное']
    }
    for ( let option in obj ) {
      if ( obj.hasOwnProperty(option) &&
          obj[option].some( e => offer.quality === e ) )
        return option;
    }
  };

  this.condition_bath = function() {
    // !!!not avaible in YANDEX!!!
    let obj = {
      1: ['нормальное', 'плохое'],
      2: ['хорошее'],
      3: ['отличное']
    }
    for ( let option in obj ) {
      if ( obj.hasOwnProperty(option) &&
          obj[option].some( e => offer.quality === e ) )
        return option;
    }
  };
}