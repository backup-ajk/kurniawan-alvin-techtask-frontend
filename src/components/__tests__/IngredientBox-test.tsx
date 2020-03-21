import React from 'react';
import renderer from 'react-test-renderer';

import { IngredientBox } from '../';

it('should render Ingredient Box successfully', () => {
  const ingredient = {
    title: 'Chicken',
    useBy: '2020-12-30',
  };
  const mockFunction = jest.fn();
  const iBox = renderer
    .create(
      <IngredientBox
        title={ingredient.title}
        useBy={ingredient.useBy}
        selected={false}
        disabled={false}
        onClick={mockFunction}
      />,
    )
    .toJSON();
  expect(iBox).toMatchSnapshot();
});
