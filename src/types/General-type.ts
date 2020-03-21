import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type AppRoute = {
  path: string;
  component: ComponentType<RouteComponentProps>;
};
