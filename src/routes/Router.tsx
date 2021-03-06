import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppRoute } from '../types/General-type';
import { NotFoundScene } from '../scenes';

type Props = {
  sceneList: Array<AppRoute>;
};

export default function Router(props: Props) {
  const { sceneList } = props;
  return (
    <div style={styles.rootContainer}>
      <Switch>
        {sceneList.map((scene) => {
          return (
            <Route
              exact
              key={scene.path}
              path={scene.path}
              component={scene.component}
            />
          );
        })}
        <Route
          component={NotFoundScene}
          // render={() => {
          //   return <div>Not Found</div>;
          // }}
        />
      </Switch>
    </div>
  );
}

const styles = {
  rootContainer: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
};
