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

  }
  // author: 'required',
  // key: 'required',
  // company: 'required',
  // created: 'creation-date',
  // modified: 'last-update-date',
  // type: 'required',
  // object: 'required',
  // price: 'required',
  // agent_pay: 'optional',
  // images: 'optional',
  // description: 'optional',
  // locality: 'required',
  // localityType: 'optional',
  // localityId: 'optional',
  // street: 'required',
  // streetType: 'optional',
  // streetId: 'optional',
  // building: 'required',
  // buildingId: 'optional',
  // buildingType: 'optional',
  // district : 'required', 
  // waymark: 'optional',
  // building_type: 'required',
  // material: 'required',
  // rooms: 'required',
  // floor: 'required',
  // floors: 'required',
  // area_full: 'required',
  // area_living: 'required',
  // area_kitchen: 'required',
  // furnish: 'optional',
  // bath: 'required',
  // balcony: 'required'
}