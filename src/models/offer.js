let defs = {
  offerType : {
    current: null,
    title: 'Тип предложения',
    items: [
      { value: 1, title: 'Продажа' },
      { value: 2, title: 'Аренда' }
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

let templates = {
  address(object) {
    switch(object) {
      case 4: return ['locality', 'street', 'building', 'district', 'waymark', 'direction', 'distance', 'cadastral_number' ]; break;
      case 5: return ['locality', 'street', 'disposition' ]; break;
      case 6: return ['locality', 'district', 'waymark', 'direction', 'distance', 'cadastral_number' ]; break;
      default: return ['locality', 'street', 'building', 'district', 'waymark' ];
    }
  }
};

let fields = {};

fields.offer = {
  type: { title: 'Тип предложения', 
    options: [
      { value: 1, title: 'Продажа' },
      { value: 2, title: 'Аренда' }
    ]
  },
  object: { title: 'Тип объекта',
    options: [
      { value: 1, title: 'Квартира' },
      { value: 2, title: 'Комната' },
      { value: 3, title: 'Коммерческая недвижимость' },
      { value: 4, title: 'Дом или дача' },
      { value: 5, title: 'Гараж или хозблок' },
      { value: 6, title: 'Земельный участок' }
    ]
  }
};

fields.general = {
  price: { title: 'Цена', options: [] },
  images: { title: 'Изображения', options: [] },
  description: { title: 'Дополнительное описание', options: [] },
};

fields.address = {
  locality: { title: 'Населенный пункт', options: [] },
  localityType: { title: 'Тип населенного пункта', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', options: [] },
  street: { title: 'Улица', options: [] },
  streetType: { title: 'Тип улицы', options: [] },
  streetId: { title: 'Идентификатор улицы', options: [] },
  building: { title: 'Строение', options: [] },
  buildingId: { title: 'Идентификатор строение', options: [] },
  buildingType: { title: 'Тип строения', options: [] },
  district : { title: 'Район',
    options: [
      { value: 1, title: 'Дзержинский' },
      { value: 2, title: 'Заволжский' },
      { value: 3, title: 'Кировский' },
      { value: 4, title: 'Красноперекопский' },
      { value: 5, title: 'Ленинский' },
      { value: 6, title: 'Ярославский' },
      { value: 7, title: 'Ярославская область' },
    ]
  },
  waymark: { title: 'Ориентир', options: [] },
  direction: { title: 'Направление', 
    options: [
      { value: 1, title: 'Ярославль' },
      { value: 2, title: 'Костромское' },
      { value: 3, title: 'Бурмакинское' },
      { value: 4, title: 'Ивановское' },
      { value: 5, title: 'Московское' },
      { value: 6, title: 'Курбское' },
      { value: 7, title: 'Угличское' },
      { value: 8, title: 'Рыбинское' },
      { value: 9, title: 'Тутаевское' },
      { value: 10, title: 'Даниловское' },
      { value: 11, title: 'Любимское' },
      { value: 12, title: 'Красный Профинтерн' },
      { value: 13, title: 'Диево-городище' },
      { value: 14, title: 'Прусовское' },
    ]
  },
  distance: { title: 'До города, км', options: [] },
  cadastral_number : { title: 'Кадастровый номер', options: [] },
  disposition: { title: 'Расположение', 
    options: [
      { value: 1, title: 'в ГСК' },
      { value: 2, title: 'в жилом доме' },
      { value: 3, title: 'отдельно стоящее' },
      { value: 4, title: 'парковочное место' }
    ]
  }
}

fields.params = {
  //Продать квартиру НАЧАЛО
  building_type: { title: 'Тип дома',
    options: [
      { value: 1, title: 'вторичное' },
      { value: 2, title: 'новостройка' }
    ]
  },
  material: { title: 'Материал',
    options: [
      { value: 1, title: 'блочный' },
      { value: 2, title: 'деревянный' },
      { value: 3, title: 'кирпич' },
      { value: 4, title: 'монолит' },
      { value: 5, title: 'монолит' },
    ]
  },
  rooms: { title: 'Комнат', options: [] },
  floor: { title: 'Этаж', options: [] },
  floors: { title: 'Этажность', options: [] },
  area_full: { title: 'Общая, м²', options: [] },
  area_living: { title: 'Жилая, м²', options: [] },
  area_kitchen: { title: 'Кухня, м²', options: [] },
  furnish: { title: 'Тип отделки', 
    options: [
      { value: 1, title: 'требует ремонта' },
      { value: 2, title: 'черновая' },
      { value: 3, title: 'от застройщика' },
      { value: 4, title: 'жилое состояние' },
      { value: 5, title: 'косметика' },
      { value: 6, title: 'евро' }
    ]
  },
  bath: { title: 'Санузел',
    options: [
      { value: 1, title: 'без удобств' },
      { value: 2, title: 'раздельный' },
      { value: 3, title: 'совмещенный' },
      { value: 4, title: 'только душ / ванна' }
    ]
  },
  balcony: { title: 'Балкон или лоджия',
    options: [
      { value: true, title: 'есть' },
      { value: false, title: 'нет' }
    ]
  },
  //Продать квартиру КОНЕЦ
  //Продать комнату НАЧАЛО
  placement_type: { title: 'Тип',
    options: [
      { value: 1, title: 'в доме' },
      { value: 2, title: 'в квартире' },
      { value: 3, title: 'в коммуналке' },
      { value: 4, title: 'в общежитии' },
      { value: 5, title: 'коридорного типа' }
    ]
  },
  // rooms +
  // material +
  // floor +
  // floors +
  // area_full
  condition_room: { title: 'Состояние комнаты',
    options: [
      { value: 1, title: 'удовлетворительное' },
      { value: 2, title: 'хорошее' },
      { value: 3, title: 'отличное' }
    ]
  },
  condition_bath: { title: 'Состояние мест общ. польз.',
    options: [
      { value: 1, title: 'удовлетворительное' },
      { value: 2, title: 'хорошее' },
      { value: 3, title: 'отличное' }
    ]
  },
  // bath
  //Продать комнату КОНЕЦ
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

  getModel(modelsSet) {
    return modelsSet.reduce( (result, field) => {
      if ( typeof fields[field] !== 'undefined' ) {
        Object.assign(result, fields[field]);
        return result
      }
    }, {})
  },

  getFields(obj) {
    return templates.address(obj);

  },
  getObject() {
    let result = {};
    for ( let field in fields ) {
      if ( typeof fields[field] !== 'undefined' ) {
        Object.keys(fields[field]).forEach( item => {
          result[item] = '';
        })
      }
    }
    return result;
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