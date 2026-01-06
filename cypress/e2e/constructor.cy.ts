import { ingredientsMock } from '../../mocks/ingredientsMock';
import { userMock } from '../../mocks/userMock';
import { setCookie, getCookie, deleteCookie } from '../../src/utils/cookie';
import { orderMock } from '../../mocks/orderMock';

describe('Burger Constructor', () => {
  const mockRefreshToken = 'mocked-refresh-token';
  const mockAccessToken = 'mocked-access-token';

  const buns = ingredientsMock.data.filter((i) => i.type === 'bun');
  const mains = ingredientsMock.data.filter((i) => i.type === 'main');
  const sauces = ingredientsMock.data.filter((i) => i.type === 'sauce');

  const testBun = buns[0];
  const testMain = mains[0];
  const testSauce = sauces[0];

  beforeEach(() => {
    cy.window().then(() => {
      localStorage.setItem('refreshToken', mockRefreshToken);
      setCookie('accessToken', mockAccessToken);
    });

    cy.window().its('localStorage.refreshToken').should('eq', mockRefreshToken);
    cy.getCookie('accessToken').should(
      'have.property',
      'value',
      mockAccessToken
    );

    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');

    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('/');

    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Запрос на эндпоинт api/ingredients', () => {
    // Проверяем, что запрос был выполнен
    cy.get('@getIngredients').its('response.statusCode').should('eq', 200);

    // Проверяем конкретные данные из мокового файла
    cy.get('@getIngredients')
      .its('response.body.data[0]._id')
      .should('eq', '60d3b41abdacab0026a733c6');
    cy.get('@getIngredients')
      .its('response.body.data[0].name')
      .should('eq', 'Краторная булка N-200i');

    // Данные отображаются на странице
    cy.contains(ingredientsMock.data[0].name).should('be.visible');
    cy.contains(ingredientsMock.data[1].name).should('be.visible');
    cy.contains(ingredientsMock.data[3].name).should('exist');

    // Проверяем цену из моковых данных
    cy.contains(ingredientsMock.data[0].price).should('be.visible');
  });

  it('Должны использоваться моковые токены', () => {
    // Проверяем localStorage
    cy.window().its('localStorage.refreshToken').should('eq', mockRefreshToken);

    // Проверяем cookie
    cy.getCookie('accessToken').should(
      'have.property',
      'value',
      mockAccessToken
    );

    // Проверяем что запрос user прошел с правильным токеном
    cy.wait('@getUser')
      .its('request.headers.authorization')
      .should('eq', mockAccessToken);
  });

  it('Добавление ингридиентов', () => {
    cy.get(`[data-cy="${testBun._id}"]`)
      .scrollIntoView()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get(`[data-cy="${testMain._id}"]`)
      .scrollIntoView()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get(`[data-cy="${testSauce._id}"]`)
      .scrollIntoView()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-cy="burger_constructor"]').within(() => {
      // Проверяем верхнюю булку в конструкторе
      cy.contains(`${testBun.name} (верх)`).should('be.visible');
      // Проверяем начинку в конструкторе
      cy.contains(testMain.name).should('be.visible');
      // Проверяем соус в конструкторе
      cy.contains(testSauce.name).should('be.visible');
      // Проверяем нижнюю булку в конструкторе
      cy.contains(`${testBun.name} (низ)`).should('be.visible');
    });
  });

  it('Открытие модального окна ингредиента при клике на карточку', () => {
    cy.get(`[data-cy="${testBun._id}"]`).scrollIntoView().click();
    // Иногда не успевает
    cy.wait(500);
    // Проверяем что модальное окно открылось
    cy.get('[data-cy="modal"]').should('be.visible');

    // Проверяем что в модалке отображаются данные булки
    cy.get('[data-cy="modal"]').within(() => {
      cy.contains(testBun.name).should('be.visible');
      cy.contains(testBun.calories).should('be.visible');
      cy.contains(testBun.proteins).should('be.visible');
      cy.contains(testBun.fat).should('be.visible');
      cy.contains(testBun.carbohydrates).should('be.visible');
    });
  });

  it('Закрытие модального окна по клику на крестик', () => {
    // Открываем модальное окно
    cy.get(`[data-cy="${testBun._id}"]`).click();

    // Закрываем через крестик
    cy.get('[data-cy="modal"]').within(() => {
      cy.get('[data-cy="modal-close"]').click();
    });

    // Проверяем закрытие
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    // Открываем модальное окно
    cy.get(`[data-cy="${testBun._id}"]`).click();

    // Кликаем на оверлей
    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    // Проверяем закрытие
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Создание заказа', () => {
    // Собираем бургер
    cy.get(`[data-cy="${testBun._id}"]`)
      .find('button')
      .contains('Добавить')
      .scrollIntoView()
      .click();

    cy.get(`[data-cy="${testMain._id}"]`)
      .find('button')
      .contains('Добавить')
      .scrollIntoView()
      .click();

    // Оформляем заказ
    cy.contains('button', 'Оформить заказ').click();

    // Ждем запрос
    cy.wait('@createOrder').then(() => {
      cy.get('@createOrder').its('response.statusCode').should('eq', 200);
      // Проверяем токен
      cy.get('@createOrder')
        .its('request.headers.authorization')
        .should('eq', mockAccessToken);
    });

    // Проверяем модальное окно заказа
    cy.get('[data-cy="modal"]').within(() => {
      cy.get('[data-cy="order-number"]')
        .invoke('text')
        .should('eq', orderMock.order.number.toString());
      cy.contains('идентификатор заказа').should('be.visible');
    });

    // Закрываем
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    // Проверяем очистку конструктора
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});
