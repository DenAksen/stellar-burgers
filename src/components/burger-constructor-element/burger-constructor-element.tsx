import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { constructorBurgerSlice } from '../../slices/constructorBurgerSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(
        constructorBurgerSlice.actions.moveIngredientDown(ingredient.id)
      );
    };

    const handleMoveUp = () => {
      dispatch(constructorBurgerSlice.actions.moveIngredientUp(ingredient.id));
    };

    const handleClose = () => {
      dispatch(constructorBurgerSlice.actions.removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
