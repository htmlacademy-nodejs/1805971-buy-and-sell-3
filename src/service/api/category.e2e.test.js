'use strict';

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./category`);
const DataService = require(`../data-service/category`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `ylK4NO`,
    "category": [
      `Посуда`
    ],
    "description": `Таких предложений больше нет! Пользовались бережно и только по большим праздникам. Не пытайтесь торговаться. Цену вещам я знаю. Две страницы заляпаны свежим кофе.`,
    "picture": `item03.jpg`,
    "title": `Куплю антиквариат.`,
    "type": `sale`,
    "sum": 79944,
    "comments": [
      {
        "id": `uLN1vR`,
        "text": `Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? А где блок питания?`
      },
      {
        "id": `asZf7K`,
        "text": `Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте?`
      },
      {
        "id": `-N1hDp`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Совсем немного... Почему в таком ужасном состоянии?`
      }
    ]
  },
  {
    "id": `sPjHhy`,
    "category": [
      `Игры`
    ],
    "description": `Две страницы заляпаны свежим кофе. При покупке с меня бесплатная доставка в черте города. Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки.`,
    "picture": `item04.jpg`,
    "title": `Продам советскую посуду. Почти не разбита.`,
    "type": `offer`,
    "sum": 57545,
    "comments": [
      {
        "id": `u0lNqu`,
        "text": `Почему в таком ужасном состоянии? Вы что?! В магазине дешевле.`
      },
      {
        "id": `ks0qpE`,
        "text": `Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `MG8fkc`,
        "text": `А сколько игр в комплекте? Почему в таком ужасном состоянии? Совсем немного...`
      }
    ]
  },
  {
    "id": `j62PNe`,
    "category": [
      `Животные`
    ],
    "description": `Таких предложений больше нет! Товар в отличном состоянии. Это настоящая находка для коллекционера! При покупке с меня бесплатная доставка в черте города.`,
    "picture": `item16.jpg`,
    "title": `Продам новую приставку Sony Playstation 5.`,
    "type": `sale`,
    "sum": 98762,
    "comments": [
      {
        "id": `CWV4DM`,
        "text": `Совсем немного... С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `ymd7x2`,
        "text": `Неплохо, но дорого. Совсем немного...`
      },
      {
        "id": `bevWUR`,
        "text": `Оплата наличными или перевод на карту?`
      }
    ]
  },
  {
    "id": `yUTu4v`,
    "category": [
      `Животные`
    ],
    "description": `Если найдёте дешевле — сброшу цену. Бонусом отдам все аксессуары. При покупке с меня бесплатная доставка в черте города. Пользовались бережно и только по большим праздникам.`,
    "picture": `item01.jpg`,
    "title": `Продам отличную подборку фильмов на VHS.`,
    "type": `sale`,
    "sum": 50572,
    "comments": [
      {
        "id": `U9_cy8`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. Неплохо, но дорого.`
      }
    ]
  },
  {
    "id": `mTRTPF`,
    "category": [
      `Игры`
    ],
    "description": `Если товар не понравится — верну всё до последней копейки. Не пытайтесь торговаться. Цену вещам я знаю. Товар в отличном состоянии. Бонусом отдам все аксессуары.`,
    "picture": `item15.jpg`,
    "title": `Продам коллекцию журналов «Огонёк».`,
    "type": `offer`,
    "sum": 14830,
    "comments": [
      {
        "id": `hB6hTm`,
        "text": `А сколько игр в комплекте? С чем связана продажа? Почему так дешёво? А где блок питания?`
      }
    ]
  },
  {
    "id": `CsCzw-`,
    "category": [
      `Книги`
    ],
    "description": `Мой дед не мог её сломать. Если найдёте дешевле — сброшу цену. Две страницы заляпаны свежим кофе. Это настоящая находка для коллекционера!`,
    "picture": `item13.jpg`,
    "title": `Продам советскую посуду. Почти не разбита.`,
    "type": `sale`,
    "sum": 97996,
    "comments": [
      {
        "id": `kzbRBL`,
        "text": `Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?`
      }
    ]
  },
  {
    "id": `JEWi6O`,
    "category": [
      `Игры`
    ],
    "description": `Пользовались бережно и только по большим праздникам. Таких предложений больше нет! Мой дед не мог её сломать. Кажется, что это хрупкая вещь.`,
    "picture": `item12.jpg`,
    "title": `Куплю детские санки.`,
    "type": `sale`,
    "sum": 93950,
    "comments": [
      {
        "id": `KP79dc`,
        "text": `Оплата наличными или перевод на карту? Вы что?! В магазине дешевле. Совсем немного...`
      }
    ]
  },
  {
    "id": `-yJTAK`,
    "category": [
      `Книги`
    ],
    "description": `Если товар не понравится — верну всё до последней копейки. Товар в отличном состоянии. Это настоящая находка для коллекционера! Не пытайтесь торговаться. Цену вещам я знаю.`,
    "picture": `item05.jpg`,
    "title": `Продам коллекцию журналов «Огонёк».`,
    "type": `sale`,
    "sum": 43256,
    "comments": [
      {
        "id": `BXE89B`,
        "text": `Неплохо, но дорого. А где блок питания?`
      },
      {
        "id": `NpbINn`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту? С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `9USrPF`,
        "text": `Неплохо, но дорого.`
      },
      {
        "id": `KUO6FF`,
        "text": `Совсем немного...`
      }
    ]
  },
  {
    "id": `thAfbs`,
    "category": [
      `Игры`
    ],
    "description": `Не пытайтесь торговаться. Цену вещам я знаю. При покупке с меня бесплатная доставка в черте города. Продаю с болью в сердце... Товар в отличном состоянии.`,
    "picture": `item13.jpg`,
    "title": `Куплю антиквариат.`,
    "type": `offer`,
    "sum": 81942,
    "comments": [
      {
        "id": `fEVTR9`,
        "text": `Неплохо, но дорого. Почему в таком ужасном состоянии? Совсем немного...`
      },
      {
        "id": `50EV6a`,
        "text": `Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
      },
      {
        "id": `VI1-39`,
        "text": `Неплохо, но дорого. А где блок питания? Оплата наличными или перевод на карту?`
      },
      {
        "id": `D8Miq8`,
        "text": `Вы что?! В магазине дешевле. Почему в таком ужасном состоянии? А где блок питания?`
      }
    ]
  },
  {
    "id": `89yyT0`,
    "category": [
      `Книги`
    ],
    "description": `Даю недельную гарантию. Бонусом отдам все аксессуары. Не пытайтесь торговаться. Цену вещам я знаю. Кажется, что это хрупкая вещь.`,
    "picture": `item02.jpg`,
    "title": `Куплю антиквариат.`,
    "type": `sale`,
    "sum": 99526,
    "comments": [
      {
        "id": `RjpQC1`,
        "text": `А сколько игр в комплекте?`
      },
      {
        "id": `nnnzTT`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. А где блок питания?`
      },
      {
        "id": `EN9DoR`,
        "text": `Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `TYM8xb`,
        "text": `А сколько игр в комплекте?`
      }
    ]
  }
];

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API returns category list`, () => {

  let response;

  beforeAll(async () => {

    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 4 categories`, () => expect(response.body.length).toBe(4));

  test(`Category names are "Журналы", "Игры", "Животные"`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([`Посуда`, `Игры`, `Животные`, `Книги`])
      )
  );

});
