let defs = {
  offerType : {
    current: null,
    title: 'Тип предложения',
    items: [
      { value: 1, title: 'Продать недвижимость' },
      { value: 2, title: 'Сдать в аренду' }
    ]
  },
  objType : {
    current: null,
    title: 'Тип объекта',
    items: [
      { value: 1, title: 'Квартира' },
      { value: 2, title: 'Комната' },
      { value: 3, title: 'Коммерческая недвижимость' },
      { value: 4, title: 'Дом или дача' },
      { value: 5, title: 'Гараж или хозблок' },
      { value: 6, title: 'Земельный участок' }
    ]
  },
  district : {
    current: null,
    title: 'Район',
    items: [
      { value: 1, title: 'Дзержинский район' },
      { value: 2, title: 'Заволжский район' },
      { value: 3, title: 'Кировский район' },
      { value: 4, title: 'Красноперекопский район' },
      { value: 5, title: 'Ленинский район' },
      { value: 6, title: 'Ярославский район' },
      { value: 7, title: 'Ярославская область' },
    ]
  },
  houseType : {
    current: null,
    title: 'Тип жилья',
    items: [
      { value: 1, title: 'вторичное' },
      { value: 2, title: 'новостройка' },
    ]
  },
  
  materialType : {
    current: null,
    title: 'Материал',
    items: [
      { value: 1, title: 'блочный' },
      { value: 2, title: 'деревянный' },
      { value: 3, title: 'кирпич' },
      { value: 4, title: 'монолит' },
      { value: 5, title: 'панель' }
    ]
  },
  furnishType : {
    current: null,
    title: 'Отделка',
    items: [
      { value: 1, title: 'требует ремонта' },
      { value: 2, title: 'черновая' },
      { value: 3, title: 'от застройщика' },
      { value: 4, title: 'жилое состояние' },
      { value: 5, title: 'косметика' },
      { value: 6, title: 'евро' }
    ]
  },
  
  bathType : {
    current: null,
    title: 'Санузел',
      items: [
      { value: 1, title: 'без удобств' },
      { value: 2, title: 'раздельный' },
      { value: 3, title: 'совмещенный' },
      { value: 4, title: 'только душ / ванна' }
    ]
  },
  balcony : {
    current: false,
    title: 'Балкон',
      items: [
      { value: true, title: 'есть' },
      { value: false, title: 'нет' }
    ]
  }
}

let model = {
  type: { type: Number, default: defs.offerType },
  price: { type: Number, default: { current: null, title: 'Цена' } },
  object: { type: Number, default: defs.objType },
  description: { type: String, default: { current: '', title: 'Дополнительная информация' } },
  images: { type: Array, default: { current: [], title: 'Изображения' } },
  house_city: { type: String, default: { current: '', title: 'Населенный пункт' } },
  house_address: { type: String, default: { current: '', title: 'Улица' } },
  house_number: { type: String, default: { current: '', title: 'Дом' } },
  house_district: { type: Number, default: defs.district },
  house_waymark: { type: String, default: { current: '', title: 'Дополнительные ориентиры' } },
  house_type: { type: Number, default: defs.houseType },
  house_material: { type: Number, default: defs.materialType },
  apartment_rooms: { type: Number, default: { current: null, title: 'Комнат' } },
  apartment_floor: { type: Number, default: { current: null, title: 'Этаж' } },
  house_floors: { type: Number, default: { current: null, title: 'Этажей' } },
  apartments_full_area: { type: Number, default: { current: null, title: 'Общая площадь' } },
  apartments_living_area: { type: Number, default: { current: null, title: 'Жилая площадь' } },
  apartment_furnish: { type: Number, default: defs.furnishType },
  apartment_bathroom: { type: Number, default: defs.bathType },
  apartment_balcony: { type: Boolean, default: defs.balcony }
}

function is(type, value) {
  if ( typeof type === 'undefined' || typeof value === 'undefined' ) return false;

  if ( type.toLowerCase === 'number' && !isNaN(parseFloat(value)) && isFinite(value) ) return true
  else return false;

  if ( type.toLowerCase === 'boolean' ) 
    return typeof(value) === 'boolean' || ( value == 'true' || value == 'false' );

  if ( type.toLowerCase === 'string' ) 
    return ( typeof value === 'string' || value instanceof String );
  
  if ( type.toLowerCase === 'array' ) return value.constructor === Array;
}

export default {
  init: ()=> {
    let mdl = {};
    for ( let obj in model ) {
      mdl[obj] = model[obj].default;
    }
    return mdl;
  },
  getOptionTitle(key, item) {
    if ( typeof model[key] === 'undefined'
        || typeof item === 'undefined'
        || typeof model[key].default.items === 'undefined' ) return false;

    let items = model[key].default.items;
    return items.reduce( ( acc, el ) => (el.value === item) ? el.title : acc, '') || false;
  },
  check(mdl) {
    if ( typeof mdl === 'undefined' ) return false;
    for ( let obj in model) {
      if ( typeof mdl[obj] === 'undefined' ) return false;
      let value = mdl[obj].current;
      if ( !is( model[obj].type, value ) && !value ) return obj;
    }
    return true;
  }
}