import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import Router from '../Router';
import sceneList from '../routeList';
import { HomeScene, NotFoundScene } from '../../scenes';

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
