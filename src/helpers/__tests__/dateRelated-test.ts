import {
  removeDashFromDate,
  formatDMY,
  convertDateToString,
} from '../dateRelated';

it('should remove dashes "-" from date string successfully', () => {
  const case1 = removeDashFromDate('2020-03-21');
  const case2 = removeDashFromDate('2020-01-01');

  expect(case1).toStrictEqual('20200321');
  expect(case2).toStrictEqual('20200101');
});

it('should format yyyy-mm-dd date string to dd-mm-yyyy', () => {
  const case1 = formatDMY('2020-03-21');
  const case2 = formatDMY('2020-01-01');

  expect(case1).toStrictEqual('21-03-2020');
  expect(case2).toStrictEqual('01-01-2020');
});

it('should convert Date to comparable string (yyyymmdd)', () => {
  const case1 = convertDateToString(new Date(2020, 2, 21));
  const case2 = convertDateToString(new Date(2020, 0, 1));

  expect(case1).toStrictEqual('20200321');
  expect(case2).toStrictEqual('20200101');
});
