import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import Router from '../Router';
import sceneList from '../routeList';
import { HomeScene, NotFoundScene, RecipeScene } from '../../scenes';

test('unregistered path should redirect to not found page', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/nasi-lemak']}>
      <Router sceneList={sceneList} />
    </MemoryRouter>,
  );
  expect(wrapper.find(NotFoundScene)).toHaveLength(1);
  expect(wrapper.find(HomeScene)).toHaveLength(0);
});

test('default path should present home scene', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Router sceneList={sceneList} />
    </MemoryRouter>,
  );
  expect(wrapper.find(NotFoundScene)).toHaveLength(0);
  expect(wrapper.find(HomeScene)).toHaveLength(1);
});

test('recipe path should present recipe scene', () => {
  const wrapper = mount(
    <MemoryRouter
      initialEntries={[
        {
          pathname: '/recipes',
          search: '?ingredients=Bacon,Eggs&lunchDate=20200322',
        },
      ]}
    >
      <Router sceneList={sceneList} />
    </MemoryRouter>,
  );
  expect(wrapper.find(RecipeScene)).toHaveLength(1);
  expect(wrapper.find(NotFoundScene)).toHaveLength(0);
});

test('recipe path without ingredients or date should redirect to home scene', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/recipes']}>
      <Router sceneList={sceneList} />
    </MemoryRouter>,
  );
  expect(wrapper.find(RecipeScene)).toHaveLength(0);
  expect(wrapper.find(HomeScene)).toHaveLength(1);
});
