import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class NotFoundScene extends React.Component<
  RouteComponentProps
> {
  componentDidMount() {
    document.title = 'NOT FOUND!!';
  }
  render() {
    return (
      <div style={styles.rootContainer}>
        <span style={styles.messageText}>{'NOT FOUND'}</span>
      </div>
    );
  }
}

const styles: { [key: string]: React.CSSProperties } = {
  rootContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 32,
    fontWeight: 600,
  },
};
