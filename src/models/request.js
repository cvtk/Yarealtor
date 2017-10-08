const fields = {};

fields.meta = {
  author: { title: 'Автор', default: '', options: [] },
  key: { title: 'Ключ базы', default: '', options: [] },
  company: { title: 'Компания', default: '', options: [] },
  created: { title: 'Дата создания', default: 0, options: [] },
  modified: { title: 'Изменен', default: 0, options: [] },
}

fields.general = {
  op: { title: 'Тип заявки', default: [],
    options: [
      { value: 1, label: 'Покупка' },
      { value: 2, label: 'Аренда' },
    ]
  },
  object: { title: 'Тип объекта', default: { value: 1, label: 'Квартира' },
    options: [
      { value: 1, label: 'Квартира' },
      { value: 2, label: 'Комната' },
      { value: 3, label: 'Коммерческая недвижимость' },
      { value: 4, label: 'Дом или дача' },
      { value: 5, label: 'Гараж или хозблок' },
      { value: 6, label: 'Земельный участок' },
    ]
  },
  price_from: { title: 'Цена от', default: null, options: [] },
  price_to: { title: 'до', default: null, options: [] },
  description: { title: 'Дополнительное описание', default: '', options: [] },
};


fields.apartment = {
  locality: { title: 'Населенный пункт', default: '', options: [] },
  localityType: { title: 'Тип населенного пункта', default: '', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', default: '', options: [] },
  district: { title: 'Район', default: [], 
    options: [
      { value: 1, label: 'Дзержинский' },
      { value: 2, label: 'Заволжский' },
      { value: 3, label: 'Кировский' },
      { value: 4, label: 'Красноперекопский' },
      { value: 5, label: 'Ленинский' },
      { value: 6, label: 'Ярославский' },
      { value: 7, label: 'Ярославская область' },
    ]
  },
  rooms: { title: 'Комнат', default: [], 
    options: [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6' },
      { value: 8, label: '>7' },
    ]
  },

  area_from: { title: 'Площадь от', default: null, options: [] },

  area_to: { title: 'до', default: null, options: [] },

  type: { title: 'Тип дома', default: [], 
    options: [
      { value: 1, label: 'вторичное' },
      { value: 2, label: 'новостройка' }
    ]
  },
  material: { title: 'Материал дома', default: [], 
    options: [
      { value: 1, label: 'блочный' },
      { value: 2, label: 'деревянный' },
      { value: 3, label: 'кирпич' },
      { value: 4, label: 'монолит' },
      { value: 5, label: 'монолит' },
    ]
  },
  furnish: { title: 'Тип отделки', default: [], 
    options: [
      { value: 1, label: 'требует ремонта' },
      { value: 2, label: 'черновая' },
      { value: 3, label: 'от застройщика' },
      { value: 4, label: 'жилое состояние' },
      { value: 5, label: 'косметика' },
      { value: 6, label: 'евро' }
    ]
  },
  bath: { title: 'Санузел', default: [], 
    options: [
      { value: 1, label: 'без удобств' },
      { value: 2, label: 'раздельный' },
      { value: 3, label: 'совмещенный' },
      { value: 4, label: 'только душ / ванна' }
    ]
  },
  floor: { title: 'Этаж', default: [], 
    options: [
      { value: 1, label: 'первый' },
      { value: 2, label: 'не первый' },
      { value: 3, label: 'не последний' },
      { value: 4, label: 'кроме крайних' }
    ]
  },
}

fields.room = {
  locality: { title: 'Населенный пункт', default: '', options: [] },
  localityType: { title: 'Тип населенного пункта', default: '', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', default: '', options: [] },
  district: { title: 'Район', default: [], 
    options: [
      { value: 1, label: 'Дзержинский' },
      { value: 2, label: 'Заволжский' },
      { value: 3, label: 'Кировский' },
      { value: 4, label: 'Красноперекопский' },
      { value: 5, label: 'Ленинский' },
      { value: 6, label: 'Ярославский' },
      { value: 7, label: 'Ярославская область' },
    ]
  },
  rooms: { title: 'Всего комнат', default: [], 
    options: [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6' },
      { value: 7, label: '7' },
      { value: 8, label: '>7' },
    ]
  },

  area_from: { title: 'Площадь от', default: null, options: [] },

  area_to: { title: 'до', default: null, options: [] },

  type: { title: 'Тип помещения', default: [], 
    options: [
      { value: 1, label: 'в доме' },
      { value: 2, label: 'в квартире' },
      { value: 3, label: 'в коммуналке' },
      { value: 4, label: 'в общежитии' },
      { value: 5, label: 'коридорного типа' }
    ]
  },
  material: { title: 'Материал дома', default: [], 
    options: [
      { value: 1, label: 'блочный' },
      { value: 2, label: 'деревянный' },
      { value: 3, label: 'кирпич' },
      { value: 4, label: 'монолит' },
      { value: 5, label: 'монолит' },
    ]
  },
  furnish: { title: 'Тип отделки', default: [], 
    options: [
      { value: 1, label: 'требует ремонта' },
      { value: 2, label: 'черновая' },
      { value: 3, label: 'от застройщика' },
      { value: 4, label: 'жилое состояние' },
      { value: 5, label: 'косметика' },
      { value: 6, label: 'евро' }
    ]
  },
  bath: { title: 'Санузел', default: [], 
    options: [
      { value: 1, label: 'без удобств' },
      { value: 2, label: 'раздельный' },
      { value: 3, label: 'совмещенный' },
      { value: 4, label: 'только душ / ванна' }
    ]
  },
  floor: { title: 'Этаж', default: [], 
    options: [
      { value: 1, label: 'первый' },
      { value: 2, label: 'не первый' },
      { value: 3, label: 'не последний' },
      { value: 4, label: 'кроме крайних' }
    ]
  },
}

fields.commercial = {
  locality: { title: 'Населенный пункт', default: '', options: [] },
  localityType: { title: 'Тип населенного пункта', default: '', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', default: '', options: [] },
  district: { title: 'Район', default: [], 
    options: [
      { value: 1, label: 'Дзержинский' },
      { value: 2, label: 'Заволжский' },
      { value: 3, label: 'Кировский' },
      { value: 4, label: 'Красноперекопский' },
      { value: 5, label: 'Ленинский' },
      { value: 6, label: 'Ярославский' },
      { value: 7, label: 'Ярославская область' },
    ]
  },

  area_from: { title: 'Площадь от', default: null, options: [] },

  area_to: { title: 'до', default: null, options: [] },

  type: { title: 'Вид', default: [], 
    options: [
      { value: 1, label: 'торговое' },
      { value: 2, label: 'офисное' },
      { value: 3, label: 'производственное' },
      { value: 4, label: 'складское' },
      { value: 5, label: 'готовый бизнес' },
      { value: 6, label: 'земельный участок' },
      { value: 7, label: 'квартиры под перевод' }
    ]
  },
  floor: { title: 'Этаж', default: [], 
    options: [
      { value: 1, label: 'первый' },
      { value: 2, label: 'не первый' },
      { value: 3, label: 'не последний' },
      { value: 4, label: 'кроме крайних' }
    ]
  }
}

fields.cottage = {
  locality: { title: 'Населенный пункт', default: '', options: [] },
  localityType: { title: 'Тип населенного пункта', default: '', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', default: '', options: [] },
  district: { title: 'Район', default: [], 
    options: [
      { value: 1, label: 'Дзержинский' },
      { value: 2, label: 'Заволжский' },
      { value: 3, label: 'Кировский' },
      { value: 4, label: 'Красноперекопский' },
      { value: 5, label: 'Ленинский' },
      { value: 6, label: 'Ярославский' },
      { value: 7, label: 'Ярославская область' },
    ]
  },

  area_from: { title: 'Общая площадь от', default: null, options: [] },

  area_to: { title: 'до', default: null, options: [] },

  floor_from: { title: 'Этажность от', default: null, options: [] },

  floor_to: { title: 'до', default: null, options: [] },

  cottage_area_from: { title: 'Площадь участка от', default: null, options: [] },

  cottage_area_to: { title: 'до', default: null, options: [] },

  rooms: { title: 'Комнат в доме', default: [], 
    options: [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6' },
      { value: 8, label: '>7' },
    ]
  },
  type: { title: 'Тип', default: [], 
    options: [
      { value: 1, label: 'дача' },
      { value: 2, label: 'дом' },
      { value: 3, label: 'таунхаус' }
    ]
  },
  material: { title: 'Материал дома', default: [], 
    options: [
      { value: 1, label: 'блочный' },
      { value: 2, label: 'деревянный' },
      { value: 3, label: 'кирпич' },
      { value: 4, label: 'монолит' },
      { value: 5, label: 'монолит' },
    ]
  },
  furnish: { title: 'Тип отделки', default: [], 
    options: [
      { value: 1, label: 'требует ремонта' },
      { value: 2, label: 'черновая' },
      { value: 3, label: 'от застройщика' },
      { value: 4, label: 'жилое состояние' },
      { value: 5, label: 'косметика' },
      { value: 6, label: 'евро' }
    ]
  },
  infra: { title: 'Инфраструктура', default: [], 
    options: [
      { value: 1, label: 'газ' },
      { value: 2, label: 'электричество' },
      { value: 3, label: 'водоснабжение' },
      { value: 4, label: 'канализация' },
      { value: 5, label: 'охрана' },
      { value: 6, label: 'лес рядом' },
      { value: 7, label: 'круглогодичный подъезд' },
      { value: 8, label: 'рядом остановка' },
    ]
  },
  direction: { title: 'Направление', default: [], 
    options: [
      { value: 1, label: 'Ярославль' },
      { value: 2, label: 'Костромское' },
      { value: 3, label: 'Бурмакинское' },
      { value: 4, label: 'Ивановское' },
      { value: 5, label: 'Московское' },
      { value: 6, label: 'Курбское' },
      { value: 7, label: 'Угличское' },
      { value: 8, label: 'Рыбинское' },
      { value: 9, label: 'Тутаевское' },
      { value: 10, label: 'Даниловское' },
      { value: 11, label: 'Любимское' },
      { value: 12, label: 'Красный Профинтерн' },
      { value: 13, label: 'Диево-городище' },
      { value: 14, label: 'Прусовское' },
    ]
  }
}

fields.garage = {
  locality: { title: 'Населенный пункт', default: '', options: [] },
  localityType: { title: 'Тип населенного пункта', default: '', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', default: '', options: [] },
  district: { title: 'Район', default: [], 
    options: [
      { value: 1, label: 'Дзержинский' },
      { value: 2, label: 'Заволжский' },
      { value: 3, label: 'Кировский' },
      { value: 4, label: 'Красноперекопский' },
      { value: 5, label: 'Ленинский' },
      { value: 6, label: 'Ярославский' },
      { value: 7, label: 'Ярославская область' },
    ]
  },

  area_from: { title: 'Площадь от', default: null, options: [] },

  area_to: { title: 'до', default: null, options: [] },

  type: { title: 'Тип', default: [], 
    options: [
      { value: 1, label: 'в ГСК' },
      { value: 2, label: 'в жилом доме' },
      { value: 3, label: 'отдельно стоящее' },
      { value: 4, label: 'парковочное место' }
    ]
  },

  material: { title: 'Материал', default: [], 
    options: [
      { value: 1, label: 'блоки' },
      { value: 2, label: 'кирпич' },
      { value: 3, label: 'металл' }
    ]
  }
}

fields.land = {
  locality: { title: 'Населенный пункт', default: '', options: [] },
  localityType: { title: 'Тип населенного пункта', default: '', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', default: '', options: [] },
  district: { title: 'Район', default: [], 
    options: [
      { value: 1, label: 'Дзержинский' },
      { value: 2, label: 'Заволжский' },
      { value: 3, label: 'Кировский' },
      { value: 4, label: 'Красноперекопский' },
      { value: 5, label: 'Ленинский' },
      { value: 6, label: 'Ярославский' },
      { value: 7, label: 'Ярославская область' },
    ]
  },
  type: { title: 'Тип', default: [], 
    options: [
      { value: 1, label: 'под ИЖС' },
      { value: 2, label: 'под ком. объекты' },
      { value: 3, label: 'сельхозназначения' }
    ]
  },

  cottage_area_from: { title: 'Площадь участка от', default: null, options: [] },

  cottage_area_to: { title: 'до', default: null, options: [] },

  infra: { title: 'Инфраструктура', default: [], 
    options: [
      { value: 1, label: 'газ' },
      { value: 2, label: 'электричество' },
      { value: 3, label: 'водоснабжение' },
      { value: 4, label: 'канализация' },
      { value: 5, label: 'охрана' },
      { value: 6, label: 'лес рядом' },
      { value: 7, label: 'круглогодичный подъезд' },
      { value: 8, label: 'рядом остановка' },
    ]
  },
  direction: { title: 'Направление', default: [], 
    options: [
      { value: 1, label: 'Ярославль' },
      { value: 2, label: 'Костромское' },
      { value: 3, label: 'Бурмакинское' },
      { value: 4, label: 'Ивановское' },
      { value: 5, label: 'Московское' },
      { value: 6, label: 'Курбское' },
      { value: 7, label: 'Угличское' },
      { value: 8, label: 'Рыбинское' },
      { value: 9, label: 'Тутаевское' },
      { value: 10, label: 'Даниловское' },
      { value: 11, label: 'Любимское' },
      { value: 12, label: 'Красный Профинтерн' },
      { value: 13, label: 'Диево-городище' },
      { value: 14, label: 'Прусовское' },
    ]
  },
}


export default {

  model(modelsSet) {
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

  objectTypes() {
    return ['none', 'apartment', 'room', 'commercial', 'cottage', 'garage', 'land'];
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
  }
}