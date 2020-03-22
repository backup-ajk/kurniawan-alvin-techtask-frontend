import { HomeScene, RecipeScene } from '../scenes';

import { AppRoute } from '../types/General-type';

const routeList: Array<AppRoute> = [
  {
    path: '/',
    component: HomeScene,
  },
  {
    path: '/recipes',
    component: RecipeScene,
  },
];
export default routeList;
