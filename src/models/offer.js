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
      { value: 8, title: 'Фрунзенский район' }
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
      { value: 5, title: 'панель' },
      { value: 6, title: 'монолитно-кирпичный' }
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

fields.meta = {
  author: { title: 'Автор', default: '', options: [] },
  key: { title: 'Ключ базы', default: '', options: [] },
  company: { title: 'Компания', default: '', options: [] },
  created: { title: 'Дата создания', default: null, options: [] },
  modified: { title: 'Изменен', default: null, options: [] },
}

fields.offer = {
  type: { title: 'Тип предложения', default: null,
    options: [
      { value: 1, title: 'Продажа' },
      { value: 2, title: 'Аренда' }
    ]
  },
  object: { title: 'Тип объекта', default: null,
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
  price: { title: 'Цена', default: null, options: [] },
  agent_pay: { title: 'Оплата посреднику', default: '', options: [] },
  images: { title: 'Изображения', default: [], options: [] },
  description: { title: 'Дополнительное описание', default: '', options: [] },
};

fields.address = {
  locality: { title: 'Населенный пункт', default: '', options: [] },
  localityType: { title: 'Тип населенного пункта', default: '', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', default: '', options: [] },
  street: { title: 'Улица', default: '', options: [] },
  streetType: { title: 'Тип улицы', default: '', options: [] },
  streetId: { title: 'Идентификатор улицы', default: '', options: [] },
  building: { title: 'Строение', default: '', options: [] },
  buildingId: { title: 'Идентификатор строение', default: '', options: [] },
  buildingType: { title: 'Тип строения', default: '', options: [] },
  district : { title: 'Район', default: null, 
    options: [
      { value: 1, title: 'Дзержинский' },
      { value: 2, title: 'Заволжский' },
      { value: 3, title: 'Кировский' },
      { value: 4, title: 'Красноперекопский' },
      { value: 5, title: 'Ленинский' },
      { value: 6, title: 'Ярославский' },
      { value: 7, title: 'Ярославская область' },
      { value: 8, title: 'Фрунзенский' }
    ]
  },
  waymark: { title: 'Ориентир', default: '', options: [] },
  direction: { title: 'Направление', default: null, 
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
  distance: { title: 'До города, км', default: null, options: [] },
  cadastral_number : { title: 'Кадастровый номер', default: '', options: [] },
  disposition: { title: 'Расположение', default: null, 
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
  building_type: { title: 'Тип дома', default: null, 
    options: [
      { value: 1, title: 'вторичное' },
      { value: 2, title: 'новостройка' }
    ]
  },
  material: { title: 'Материал', default: null, 
    options: [
      { value: 1, title: 'блочный' },
      { value: 2, title: 'деревянный' },
      { value: 3, title: 'кирпич' },
      { value: 4, title: 'монолит' },
      { value: 5, title: 'панель' },
      { value: 6, title: 'монолитно-кирпичный' }
    ]
  },
  rooms: { title: 'Комнат', default: null, options: [] },
  floor: { title: 'Этаж', default: null, options: [] },
  floors: { title: 'Этажность', default: null, options: [] },
  area_full: { title: 'Общая пл., м²', default: null, options: [] },
  area_living: { title: 'Жилая пл., м²', default: null, options: [] },
  area_kitchen: { title: 'Кухня, м²', default: null, options: [] },
  furnish: { title: 'Тип отделки', default: null, 
    options: [
      { value: 1, title: 'требует ремонта' },
      { value: 2, title: 'черновая' },
      { value: 3, title: 'от застройщика' },
      { value: 4, title: 'жилое состояние' },
      { value: 5, title: 'косметика' },
      { value: 6, title: 'евро' }
    ]
  },
  bath: { title: 'Санузел', default: null, 
    options: [
      { value: 1, title: 'без удобств' },
      { value: 2, title: 'раздельный' },
      { value: 3, title: 'совмещенный' },
      { value: 4, title: 'только душ / ванна' }
    ]
  },
  balcony: { title: 'Балкон или лоджия', default: false, 
    options: [
      { value: true, title: 'есть' },
      { value: false, title: 'нет' }
    ]
  },
  //Продать квартиру КОНЕЦ
  //Продать комнату НАЧАЛО
  placement_type: { title: 'Тип помещения', default: null, 
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
  condition_room: { title: 'Состояние комнаты', default: null, 
    options: [
      { value: 1, title: 'удовлетворительное' },
      { value: 2, title: 'хорошее' },
      { value: 3, title: 'отличное' }
    ]
  },
  condition_bath: { title: 'Состояние мест общ. польз.', default: null, 
    options: [
      { value: 1, title: 'удовлетворительное' },
      { value: 2, title: 'хорошее' },
      { value: 3, title: 'отличное' }
    ]
  },
  // bath
  //Продать комнату КОНЕЦ
  //Продать коммерческую НАЧАЛО
  price_permeter: { title: 'Цена за м²', default: null, options: [] },

  commercial_retail: { title: 'торговое', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  commercial_office: { title: 'офисное', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  commercial_industrial: { title: 'производственное', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  commercial_warehouse: { title: 'складское', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  commercial_business: { title: 'готовый бизнес', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  commercial_land: { title: 'земельный участок', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  commercial_apartments: { title: 'квартиры под перевод', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  commercial_material: { title: 'Материал', default: null, 
    options: [
      { value: 1, title: 'кирпич' },
      { value: 2, title: 'метало каркас' },
      { value: 3, title: 'временное сооружение' },
      { value: 4, title: 'капитальное сооружение' }
    ]
  },
  // floor +
  special_floor: { title: 'Спец. этаж', default: null, 
    options: [
      { value: 1, title: 'цоколь' },
      { value: 2, title: 'подвал' },
      { value: 3, title: 'мансарда' }
    ]
  },
  // floors +
  // area_full +
  minimal_area: { title: 'Минимальная площадь продажи/аренды', default: null, options: [] },

  line: { title: 'Линия', default: null, 
    options: [
      { value: 1, title: 'первая' },
      { value: 2, title: 'вторая' },
    ]
  },
  // furnish +
  planning: { title: 'Планировка', default: null, 
    options: [
      { value: 1, title: 'открытая' },
      { value: 2, title: 'кабинетная' },
      { value: 3, title: 'смешанная' }
    ]
  },
  ceilings_height: { title: 'Высота потолков, м', default: null, options: [] },

  power: { title: 'Электричество, кВт', default: null, options: [] },

  internet: { title: 'Интернет', default: false, 
    options: [
      { value: true, title: 'Да' },
      { value: false, title: 'Нет' },
    ]
  },
  security_alarm: { title: 'Сигнализация охранная', default: false, 
    options: [
      { value: true, title: 'Да' },
      { value: false, title: 'Нет' },
    ]
  },
  fire_alarm: { title: 'Пожарная охранная', default: false, 
    options: [
      { value: true, title: 'Да' },
      { value: false, title: 'Нет' },
    ]
  },
  shutters: { title: 'Роль ставни', default: false, 
    options: [
      { value: true, title: 'Да' },
      { value: false, title: 'Нет' },
    ]
  },
  monument: { title: 'Памятник архитектуры', default: false, 
    options: [
      { value: true, title: 'Да' },
      { value: false, title: 'Нет' },
    ]
  },
  windows: { title: 'Окна', default: null, 
    options: [
      { value: 1, title: 'витринные' },
      { value: 2, title: 'стандартные' }
    ]
  },
  owner: { title: 'Собственник', default: null, 
    options: [
      { value: 1, title: 'физическое лицо' },
      { value: 2, title: 'организация' },
      { value: 3, title: 'ИП' },
      { value: 4, title: 'государство' },
    ]
  },
  //Продать коммерческую КОНЕЦ
  //Продать дом дачу НАЧАЛО
  cottage_type: { title: 'Тип', default: null, 
    options: [
      { value: 1, title: 'дача' },
      { value: 2, title: 'дом' },
      { value: 3, title: 'таунхаус' }
    ]
  },
  cottage_area: { title: 'Площадь участка, соток', default: null, options: [] },
  // material + 
  // rooms +
  // floors +
  // area_full +
  // furnish +
  cottage_gas: { title: 'Газ', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  cottage_power: { title: 'Электричество', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  cottage_water: { title: 'Водоснабжение', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  cottage_sewer: { title: 'Канализация', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  // internet
  cottage_security: { title: 'Охрана', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  cottage_forest: { title: 'Лес рядом', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  cottage_entrance: { title: 'Круглогодичный подъезд', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  cottage_bus: { title: 'Рядом остановка', default: false, 
    options: [
      { value: true, title: 'да' },
      { value: false, title: 'нет' }
    ]
  },
  //Продать дом дачу КОНЕЦ
  //Продать гараж НАЧАЛО
  //area_full
  garage_material: { title: 'Материал', default: null, 
    options: [
      { value: 1, title: 'блоки' },
      { value: 2, title: 'кирпич' },
      { value: 3, title: 'металл' }
    ]
  },
  //Продать гараж КОНЕЦ
  //Продать участок НАЧАЛО
  land_type: { title: 'Тип', default: null, 
    options: [
      { value: 1, title: 'под ИЖС' },
      { value: 2, title: 'под ком. объекты' },
      { value: 3, title: 'сельхозназначения' }
    ]
  },
  //cottage_area
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
  init(group) {
    let result = {};
    if ( typeof group !== 'undefined' && typeof fields[group] !== 'undefined' ) {
      Object.keys(fields[group]).forEach( field => {
          result[field] = fields[group][field].default;
        })
      return result;
    }
    
    for ( let group in fields ) {
      if ( typeof fields[group] !== 'undefined' ) {
        Object.keys(fields[group]).forEach( field => {
          result[field] = fields[group][field].default;
        })
      }
    }
    return result;
  },

  getOptionTitle(key, value) {
    for ( let group in fields ) {
      if ( typeof fields[group][key] !== 'undefined' ) {
        let options = fields[group][key].options;
        for ( let i = 0; i < options.length; i++ ) {
          if ( options[i].value === value ) {
            return options[i].title
          };
        }
      }
    }
    return value;

    // if ( typeof fields[key] === 'undefined'
    //     || typeof item === 'undefined'
    //     || typeof model[key].default.items === 'undefined' ) return false;

    // let items = model[key].default.items;
    // return items.reduce( ( acc, el ) => (el.value === item) ? el.title : acc, '') || false;
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