import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type AppRoute = {
  path: string;
  component: ComponentType<RouteComponentProps>;
};

export type Recipe = {
  title: string;
  ingredients: Array<string>;
};
