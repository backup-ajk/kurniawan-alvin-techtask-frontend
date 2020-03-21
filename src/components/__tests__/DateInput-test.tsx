import React from 'react';
import renderer from 'react-test-renderer';

import { DateInput } from '../';
import ReactDatePicker from 'react-datepicker';

it('should render Date Input successfully', () => {
  let testDate = new Date();
  const onChangeDate = (newDate: Date) => {
    testDate = newDate;
  };
  const input = renderer
    .create(<DateInput value={testDate} onChangeDate={onChangeDate} />)
    .toJSON();
  expect(input).toMatchSnapshot();
});

it('should trigger on change date function date is selected', () => {
  let testDate = new Date();
  const tomorrow = new Date(testDate);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const mockChangeDate = (newDate: Date) => {
    testDate = new Date(newDate);
  };

  const rendered = renderer.create(
    <DateInput value={testDate} onChangeDate={mockChangeDate} />,
  );
  const input = rendered.root.findByType(ReactDatePicker);
  input.props.onChange(tomorrow);

  expect(testDate).toEqual(tomorrow);
});
