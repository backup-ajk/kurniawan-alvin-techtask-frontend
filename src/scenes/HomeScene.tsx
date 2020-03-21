import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type State = {};
type Props = RouteComponentProps & {};
export default class HomeScene extends React.Component<Props, State> {
  componentDidMount() {
    document.title = 'Home';
  }
  render() {
    const { location } = this.props;
    return <div>{`Home ${location.pathname}`}</div>;
  }
}
