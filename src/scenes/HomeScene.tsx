import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { DateInput } from '../components';

type State = {
  selectedDate: Date;
};
type Props = RouteComponentProps & {};

export default class HomeScene extends React.Component<Props, State> {
  state = {
    selectedDate: new Date(),
  };

  componentDidMount() {
    document.title = 'Home';
  }
  render() {
    const { selectedDate } = this.state;

    return (
      <div style={styles.rootContainer}>
        <DateInput
          value={selectedDate}
          onChangeDate={(newDate: Date) => {
            this.setState({
              selectedDate: newDate,
            });
          }}
        />
      </div>
    );
  }
}

const styles: { [key: string]: React.CSSProperties } = {
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#CCC',
  },
};
