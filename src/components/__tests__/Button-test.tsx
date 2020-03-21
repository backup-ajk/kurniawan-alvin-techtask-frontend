import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { Button } from '../';

it('should render Button successfully', () => {
  const mockFunction = jest.fn();

  const input = renderer
    .create(<Button label={'test'} onClick={mockFunction} />)
    .toJSON();
  expect(input).toMatchSnapshot();
});

it('should render Button style correctly', () => {
  const mockFunction = jest.fn();

  const renderedDefault = renderer.create(
    <Button label={'test'} onClick={mockFunction} />,
  );
  const buttonDefault = renderedDefault.root.findByType('button');
  expect(buttonDefault.children).toEqual(['test']);
  expect(buttonDefault.props.style.backgroundColor).toEqual('#666ee8');

  const renderedSuccess = renderer.create(
    <Button label={'success'} onClick={mockFunction} theme={'success'} />,
  );
  const buttonSuccess = renderedSuccess.root.findByType('button');
  expect(buttonSuccess.props.style.backgroundColor).toEqual('#28d094');

  const renderedDanger = renderer.create(
    <Button label={'danger'} onClick={mockFunction} theme={'danger'} />,
  );
  const buttonDanger = renderedDanger.root.findByType('button');
  expect(buttonDanger.props.style.backgroundColor).toEqual('#ff4961');
});

it('should handle hover state on button', () => {
  const mockFunction = jest.fn();
  const button = shallow(<Button label={'test'} onClick={mockFunction} />);

  expect(button.state('isHover')).toBe(false);
  button.simulate('mouseenter');
  expect(button.get(0).props.style).toHaveProperty(
    'backgroundColor',
    '#7c83eb',
  );

  expect(button.state('isHover')).toBe(true);
  button.simulate('mouseleave');
  expect(button.get(0).props.style).toHaveProperty(
    'backgroundColor',
    '#666ee8',
  );

  expect(button.state('isHover')).toBe(false);
});
