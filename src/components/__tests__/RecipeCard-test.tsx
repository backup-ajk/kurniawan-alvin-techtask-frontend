import React from 'react';
import renderer from 'react-test-renderer';

import { RecipeCard } from '../';

it('should render Recipe Card successfully', () => {
  const recipe = {
    title: 'KFC Rice',
    ingredients: ['Rice', 'Original KFC', 'Water'],
  };
  const recipeCard = renderer.create(<RecipeCard recipe={recipe} />).toJSON();
  expect(recipeCard).toMatchSnapshot();
});

it('should display correct information', () => {
  const recipe = {
    title: 'KFC Rice',
    ingredients: ['Rice', 'Original KFC', 'Water'],
  };
  const rendered = renderer.create(<RecipeCard recipe={recipe} />);
  const list = rendered.root.findAllByType('li');

  expect(list.length).toEqual(recipe.ingredients.length);
});
