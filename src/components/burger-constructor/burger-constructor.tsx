import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  constructorBurgerActions,
  constructorBurgerSelectors
} from '../../slices/constructorBurgerSlice';
import {
  orderBurgerThunk,
  userOderSelectors,
  UserOrderActions
} from '../../slices/userOrdersSlise';
import { userSelectors } from '../../slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    constructorBurgerSelectors.selectConstructorState
  ) || { bun: null, ingredients: [] };

  const orderRequest = useSelector(userOderSelectors.selectOrderRequest);

  const orderModalData = useSelector(userOderSelectors.selectorderModalData);

  const newOrderData = useSelector(constructorBurgerSelectors.dataForNewOrder);
  const user = useSelector(userSelectors.selectUser);
  const userCheck = useSelector(userSelectors.selectAuthCheck);

  const onOrderClick = () => {
    if (
      !constructorItems.bun ||
      orderRequest ||
      constructorItems.ingredients.length === 0
    )
      return;
    if (userCheck && user) {
      dispatch(orderBurgerThunk(newOrderData));
      return;
    }
    navigate('/login', {
      state: {
        from: location
      }
    });
  };
  const closeOrderModal = () => {
    dispatch(constructorBurgerActions.clearConstructor());
    dispatch(UserOrderActions.clearNewOrerData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
