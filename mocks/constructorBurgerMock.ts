import { TConstructorIngredient, TIngredient } from '../src/utils/types';

// Базовые ингредиенты
export const mockBun: TIngredient = {
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
};

export const mockMain: TIngredient = {
  _id: '60d3b41abdacab0026a733cb',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png'
};

export const mockSauce: TIngredient = {
  _id: '60d3b41abdacab0026a733cc',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
};

export const mockConstructorMain: TConstructorIngredient = {
  ...mockMain,
  id: 'constructor-main-1'
};

export const mockConstructorSauce: TConstructorIngredient = {
  ...mockSauce,
  id: 'constructor-sauce-1'
};

// Начальное состояние конструктора
export const emptyConstructorState = {
  items: {
    bun: null,
    ingredients: [] as TConstructorIngredient[]
  }
};

export const fullConstructorState = {
  items: {
    bun: mockBun,
    ingredients: [mockConstructorMain, mockConstructorSauce]
  }
};

export const constructorWithMultipleIngredients = {
  items: {
    bun: mockBun,
    ingredients: [
      { ...mockConstructorMain, id: 'ingredient-1' },
      { ...mockConstructorSauce, id: 'ingredient-2' },
      {
        ...mockMain,
        _id: '60d3b41abdacab0026a733c8',
        name: 'Филе Люминесцентного тетраодонтимформа',
        id: 'ingredient-3'
      }
    ]
  }
};
