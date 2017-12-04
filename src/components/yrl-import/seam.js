import Stapler from './fields-compare.js';

let models = {};

const isRequired = function(field) {
  return field === 'required';
};

const isEmpty = function(value) {
  return typeof(value) === 'undefined' || !value;
};


const getMdlFilename = function(offer) {
  const object = function(category) {
    let obj = {
      apartment: ['квартира', 'flat'],
      room: ['комната', 'room'],
      commercial: ['коммерческая', 'commercial'],
      cottage: ['дача', 'коттедж', 'cottage', 'дом', 'house',
            'дом с участком', 'house with lot', 'часть дома',
              'таунхаус', 'townhouse'],
      garage: ['гараж', 'garage'],
      land: ['участок', 'lot'],
    };
    for ( let option in obj ) {
      if ( obj.hasOwnProperty(option) &&
          obj[option].some( e => category === e ) ) return option;
    }
  }
  let type = ( offer.type === 'продажа' )? 'sale': 'lease',
      obj = object( offer.category );

  return `${obj}-${type}.js`
};
export default function(offer, callback) {
  //const model = require(`./models/${ getMdlFilename(offer) }`).default;
  const model = require('./models/apartment-sale.js').default;
  let result = {},
      err = [],
      stapler = new Stapler(offer);

  for ( let field in model ) {
    if ( model.hasOwnProperty(field) &&
          typeof stapler[field] === 'function' ) {
      // if ( isRequired( model[field] ) && isEmpty( stapler[field]() ) ) {
      //   err.push({
      //     message: 'Поле ' + field + ' является обязательным, объект не будет импортирован.',
      //     field
      //   });
      //   continue;
      // }
      result[field] = stapler[field]();
    }
    
  }
  callback(result, err);
  return result.length;
}