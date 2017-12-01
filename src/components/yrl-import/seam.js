import Stapler from './fields-compare.js';

let models = {};
models.apartmentSale = require('./models/apartment-sale.js').default;

export default function(offer) {
  let result = {},
      stapler = new Stapler(offer);

  for ( let field in models.apartmentSale ) {
    if ( models.apartmentSale.hasOwnProperty(field) &&
          typeof stapler[field] === 'function' ) {
      result[field] = stapler[field]();
    }
    
  }
  return result;
}