import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  value: Date;
  onChangeDate: (newDate: Date) => void;
};

export default function DateInput(props: Props) {
  const { value, onChangeDate } = props;
  return (
    <DatePicker
      selected={value}
      onChange={onChangeDate}
      customInput={<ValueContainer />}
      dateFormat={'dd-MM-yyyy'}
    />
  );
}

class ValueContainer extends React.Component<{
  value?: Date;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}> {
  render() {
    const { onClick, value } = this.props;
    return (
      <div onClick={onClick} style={styles.dateContainer}>
        <span style={styles.dateText}>{value}</span>
      </div>
    );
  }
}

const styles = {
  dateContainer: {
    width: 150,
    backgroundColor: '#EFEFEF',
    borderColor: '#0064D2',
    borderWidth: 2,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    padding: 10,
    borderRadius: 5,
    display: 'flex',
  },
  dateText: {
    fontSize: 18,
    color: '#212121',
  },
};
