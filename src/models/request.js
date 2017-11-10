const fields = {};

fields.meta = {
  author: { title: 'Автор', default: '', options: [] },
  key: { title: 'Ключ базы', default: '', options: [] },
  company: { title: 'Компания', default: '', options: [] },
  created: { title: 'Дата создания', default: 0, options: [] },
  modified: { title: 'Изменен', default: 0, options: [] },
}

fields.general = {
  op: { title: 'Тип заявки', default: '',
    options: [
      { label: 'Покупка', value: 1 },
      { label: 'Аренда', value: 2 },
    ]
  },
  object: { title: 'Тип объекта', default: '',
    options: [
      { label: 'Квартира', value: 1 },
      { label: 'Комната', value: 2 },
      { label: 'Коммерческая недвижимость', value: 3 },
      { label: 'Дом или дача', value: 4 },
      { label: 'Гараж или хозблок', value: 5 },
      { label: 'Земельный участок', value: 6 },
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
  district: { title: 'Район', default: '', 
    options: [
      { label: 'Дзержинский', value: 1 },
      { label: 'Заволжский', value: 2 },
      { label: 'Кировский', value: 3 },
      { label: 'Красноперекопский', value: 4 },
      { label: 'Ленинский', value: 5 },
      { label: 'Ярославский', value: 6 },
      { label: 'Ярославская область', value: 7 },
      { label: 'Фрунзенский', value: 8 }
    ]
  },
  rooms: { title: 'Комнат', default: '', 
    options: [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '>7', value: 7 },
    ]
  },

  area_from: { title: 'Площадь от', default: null, options: [] },

  area_to: { title: 'до', default: null, options: [] },

  type: { title: 'Тип дома', default: '', 
    options: [
      { label: 'вторичное', value: 1 },
      { label: 'новостройка', value: 2 }
    ]
  },
  material: { title: 'Материал дома', default: '', 
    options: [
      { label: 'блочный', value: 1 },
      { label: 'деревянный', value: 2 },
      { label: 'кирпич', value: 3 },
      { label: 'монолит', value: 4 },
    ]
  },
  furnish: { title: 'Тип отделки', default: '', 
    options: [
      { label: 'требует ремонта', value: 1 },
      { label: 'черновая', value: 2 },
      { label: 'от застройщика', value: 3 },
      { label: 'жилое состояние', value: 4 },
      { label: 'косметика', value: 5 },
      { label: 'евро', value: 6 }
    ]
  },
  bath: { title: 'Санузел', default: '', 
    options: [
      { label: 'без удобств', value: 1 },
      { label: 'раздельный', value: 2 },
      { label: 'совмещенный', value: 3 },
      { label: 'только душ / ванна', value: 4 }
    ]
  },
  floor: { title: 'Этаж', default: '', 
    options: [
      { label: 'первый', value: 1 },
      { label: 'не первый', value: 2 },
      { label: 'не последний', value: 3 },
      { label: 'кроме крайних', value: 4 }
    ]
  },
}

fields.room = {
  locality: { title: 'Населенный пункт', default: '', options: [] },
  localityType: { title: 'Тип населенного пункта', default: '', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', default: '', options: [] },
  district: { title: 'Район', default: [], 
    options: [
      { label: 'Дзержинский', value: 1 },
      { label: 'Заволжский', value: 2 },
      { label: 'Кировский', value: 3 },
      { label: 'Красноперекопский', value: 4 },
      { label: 'Ленинский', value: 5 },
      { label: 'Ярославский', value: 6 },
      { label: 'Ярославская область', value: 7 },
      { label: 'Фрунзенский', value: 8 }
    ]
  },
  rooms: { title: 'Всего комнат', default: [], 
    options: [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '>7', value: 7 },
    ]
  },

  area_from: { title: 'Площадь от', default: null, options: [] },

  area_to: { title: 'до', default: null, options: [] },

  type: { title: 'Тип помещения', default: [], 
    options: [
      { label: 'в доме', value: 1 },
      { label: 'в квартире', value: 2 },
      { label: 'в коммуналке', value: 3 },
      { label: 'в общежитии', value: 4 },
      { label: 'коридорного типа', value: 5 }
    ]
  },
  material: { title: 'Материал дома', default: [], 
    options: [
      { label: 'блочный', value: 1 },
      { label: 'деревянный', value: 2 },
      { label: 'кирпич', value: 3 },
      { label: 'монолит', value: 4 },
    ]
  },
  furnish: { title: 'Тип отделки', default: [], 
    options: [
      { label: 'требует ремонта', value: 1 },
      { label: 'черновая', value: 2 },
      { label: 'от застройщика', value: 3 },
      { label: 'жилое состояние', value: 4 },
      { label: 'косметика', value: 5 },
      { label: 'евро', value: 6 }
    ]
  },
  bath: { title: 'Санузел', default: [], 
    options: [
      { label: 'без удобств', value: 1 },
      { label: 'раздельный', value: 2 },
      { label: 'совмещенный', value: 3 },
      { label: 'только душ / ванна', value: 4 }
    ]
  },
  floor: { title: 'Этаж', default: [], 
    options: [
      { label: 'первый', value: 1 },
      { label: 'не первый', value: 2 },
      { label: 'не последний', value: 3 },
      { label: 'кроме крайних', value: 4 }
    ]
  },
}

fields.commercial = {
  locality: { title: 'Населенный пункт', default: '', options: [] },
  localityType: { title: 'Тип населенного пункта', default: '', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', default: '', options: [] },
  district: { title: 'Район', default: [], 
    options: [
      { label: 'Дзержинский', value: 1 },
      { label: 'Заволжский', value: 2 },
      { label: 'Кировский', value: 3 },
      { label: 'Красноперекопский', value: 4 },
      { label: 'Ленинский', value: 5 },
      { label: 'Ярославский', value: 6 },
      { label: 'Ярославская область', value: 7 },
      { label: 'Фрунзенский', value: 8 }
    ]
  },

  area_from: { title: 'Площадь от', default: null, options: [] },

  area_to: { title: 'до', default: null, options: [] },

  type: { title: 'Вид', default: '', 
    options: [
      { label: 'торговое', value: 1 },
      { label: 'офисное', value: 2 },
      { label: 'производственное', value: 3 },
      { label: 'складское', value: 4 },
      { label: 'готовый бизнес', value: 5 },
      { label: 'земельный участок', value: 6 },
      { label: 'квартиры под перевод', value: 7 }
    ]
  },
  floor: { title: 'Этаж', default: '', 
    options: [
      { label: 'первый', value: 1 },
      { label: 'не первый', value: 2 },
      { label: 'не последний', value: 3 },
      { label: 'кроме крайних', value: 4 }
    ]
  }
}

fields.cottage = {
  locality: { title: 'Населенный пункт', default: '', options: [] },
  localityType: { title: 'Тип населенного пункта', default: '', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', default: '', options: [] },
  district: { title: 'Район', default: [], 
    options: [
      { label: 'Дзержинский', value: 1 },
      { label: 'Заволжский', value: 2 },
      { label: 'Кировский', value: 3 },
      { label: 'Красноперекопский', value: 4 },
      { label: 'Ленинский', value: 5 },
      { label: 'Ярославский', value: 6 },
      { label: 'Ярославская область', value: 7 },
      { label: 'Фрунзенский', value: 8 }
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
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '>7', value: 7 },
    ]
  },
  type: { title: 'Тип', default: [], 
    options: [
      { label: 'дача', value: 1 },
      { label: 'дом', value: 2 },
      { label: 'таунхаус', value: 3 }
    ]
  },
  material: { title: 'Материал дома', default: [], 
    options: [
      { label: 'блочный', value: 1 },
      { label: 'деревянный', value: 2 },
      { label: 'кирпич', value: 3 },
      { label: 'монолит', value: 4 },
    ]
  },
  furnish: { title: 'Тип отделки', default: [], 
    options: [
      { label: 'требует ремонта', value: 1 },
      { label: 'черновая', value: 2 },
      { label: 'от застройщика', value: 3 },
      { label: 'жилое состояние', value: 4 },
      { label: 'косметика', value: 5 },
      { label: 'евро', value: 6 }
    ]
  },
  infra: { title: 'Инфраструктура', default: [], 
    options: [
      { label: 'газ', value: 1 },
      { label: 'электричество', value: 2 },
      { label: 'водоснабжение', value: 3 },
      { label: 'канализация', value: 4 },
      { label: 'охрана', value: 5 },
      { label: 'лес рядом', value: 6 },
      { label: 'круглогодичный подъезд', value: 7 },
      { label: 'рядом остановка', value: 8 },
    ]
  },
  direction: { title: 'Направление', default: [], 
    options: [
      { label: 'Ярославль', value: 1 },
      { label: 'Костромское', value: 2 },
      { label: 'Бурмакинское', value: 3 },
      { label: 'Ивановское', value: 4 },
      { label: 'Московское', value: 5 },
      { label: 'Курбское', value: 6 },
      { label: 'Угличское', value: 7 },
      { label: 'Рыбинское', value: 8 },
      { label: 'Тутаевское', value: 9 },
      { label: 'Даниловское', value: 10 },
      { label: 'Любимское', value: 11 },
      { label: 'Красный Профинтерн', value: 12 },
      { label: 'Диево-городище', value: 13 },
      { label: 'Прусовское', value: 14 },
    ]
  }
}

fields.garage = {
  locality: { title: 'Населенный пункт', default: '', options: [] },
  localityType: { title: 'Тип населенного пункта', default: '', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', default: '', options: [] },
  district: { title: 'Район', default: [], 
    options: [
      { label: 'Дзержинский', value: 1 },
      { label: 'Заволжский', value: 2 },
      { label: 'Кировский', value: 3 },
      { label: 'Красноперекопский', value: 4 },
      { label: 'Ленинский', value: 5 },
      { label: 'Ярославский', value: 6 },
      { label: 'Ярославская область', value: 7 },
      { label: 'Фрунзенский', value: 8 }
    ]
  },

  area_from: { title: 'Площадь от', default: null, options: [] },

  area_to: { title: 'до', default: null, options: [] },

  type: { title: 'Тип', default: [], 
    options: [
      { label: 'в ГСК', value: 1 },
      { label: 'в жилом доме', value: 2 },
      { label: 'отдельно стоящее', value: 3 },
      { label: 'парковочное место', value: 4 }
    ]
  },

  material: { title: 'Материал', default: [], 
    options: [
      { label: 'блоки', value: 1 },
      { label: 'кирпич', value: 2 },
      { label: 'металл', value: 3 }
    ]
  }
}

fields.land = {
  locality: { title: 'Населенный пункт', default: '', options: [] },
  localityType: { title: 'Тип населенного пункта', default: '', options: [] },
  localityId: { title: 'Идентификатор населенного пункта', default: '', options: [] },
  district: { title: 'Район', default: [], 
    options: [
      { label: 'Дзержинский', value: 1 },
      { label: 'Заволжский', value: 2 },
      { label: 'Кировский', value: 3 },
      { label: 'Красноперекопский', value: 4 },
      { label: 'Ленинский', value: 5 },
      { label: 'Ярославский', value: 6 },
      { label: 'Ярославская область', value: 7 },
      { label: 'Фрунзенский', value: 8 }
    ]
  },
  type: { title: 'Тип', default: [], 
    options: [
      { label: 'под ИЖС', value: 1 },
      { label: 'под ком. объекты', value: 2 },
      { label: 'сельхозназначения', value: 3 }
    ]
  },

  cottage_area_from: { title: 'Площадь участка от', default: null, options: [] },

  cottage_area_to: { title: 'до', default: null, options: [] },

  infra: { title: 'Инфраструктура', default: [], 
    options: [
      { label: 'газ', value: 1 },
      { label: 'электричество', value: 2 },
      { label: 'водоснабжение', value: 3 },
      { label: 'канализация', value: 4 },
      { label: 'охрана', value: 5 },
      { label: 'лес рядом', value: 6 },
      { label: 'круглогодичный подъезд', value: 7 },
      { label: 'рядом остановка', value: 8 },
    ]
  },
  direction: { title: 'Направление', default: [], 
    options: [
      { label: 'Ярославль', value: 1 },
      { label: 'Костромское', value: 2 },
      { label: 'Бурмакинское', value: 3 },
      { label: 'Ивановское', value: 4 },
      { label: 'Московское', value: 5 },
      { label: 'Курбское', value: 6 },
      { label: 'Угличское', value: 7 },
      { label: 'Рыбинское', value: 8 },
      { label: 'Тутаевское', value: 9 },
      { label: 'Даниловское', value: 10 },
      { label: 'Любимское', value: 11 },
      { label: 'Красный Профинтерн', value: 12 },
      { label: 'Диево-городище', value: 13 },
      { label: 'Прусовское', value: 14 },
    ]
  },
}


export default {

  model(modelsSet) {
    if ( typeof modelsSet === 'undefined' ) {
      let r = {};
      for ( let field in fields ) {
        if ( typeof fields[field] !== 'undefined' ) {
          Object.assign(r, fields[field]);
        }
      }
      return r;
    } else {
      return modelsSet.reduce( (result, field) => {
        if ( typeof fields[field] !== 'undefined' ) {
          Object.assign(result, fields[field]);
          return result
        }
    }, {})
    }
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