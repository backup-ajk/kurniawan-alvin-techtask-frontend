import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import qs from 'qs';

import { RecipeCard, Button } from '../components';
import { Recipe } from '../types/General-type';
import { formatDMY } from '../helpers/dateRelated';

type State = {
  isFetchingRecipes: boolean;
  shouldRedirectBack: boolean;
  recipeList: Array<Recipe>;
  lunchDate: string;
};

export default class RecipeScene extends React.Component<
  RouteComponentProps,
  State
> {
  state: State = {
    isFetchingRecipes: false,
    shouldRedirectBack: false,
    recipeList: [],
    lunchDate: '',
  };

  componentDidMount() {
    document.title = 'Available Recipe';
    const { search } = this.props.location;
    const params = qs.parse(search, { ignoreQueryPrefix: true });
    const { ingredients, lunchDate } = params;

    if (!ingredients || !lunchDate) {
      this.setState({ shouldRedirectBack: true });
    } else {
      const fetchResult = this._fetchRecipeFromServer(ingredients);
      fetchResult.then((recipeList: Array<Recipe>) => {
        this.setState({ recipeList, lunchDate: formatDMY(lunchDate) });
      });
    }
  }
  render() {
    const { isFetchingRecipes, shouldRedirectBack, lunchDate } = this.state;
    if (shouldRedirectBack) {
      return <Redirect to={'/'} />;
    }
    return (
      <div style={styles.rootContainer}>
        <h2>{`Lunch Date: ${lunchDate}`}</h2>
        <div style={styles.recipeBoard}>
          {isFetchingRecipes ? this._renderLoading() : this._renderRecipes()}
        </div>
        {this._renderBottom()}
      </div>
    );
  }
  _renderLoading = () => {
    return <div>Loading</div>;
  };
  _renderRecipes = () => {
    const { recipeList } = this.state;
    if (recipeList.length === 0) {
      return <h3>No Recipe Available</h3>;
    }
    return (
      <div style={styles.recipeGrid}>
        {recipeList.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    );
  };

  _renderBottom = () => {
    return (
      <div style={styles.bottomContainer}>
        <Button
          label={'Search Ingredients'}
          onClick={() => {
            this.setState({ shouldRedirectBack: true });
          }}
          theme={'danger'}
        />
      </div>
    );
  };

  async _fetchRecipeFromServer(ingredients: string): Promise<Array<Recipe>> {
    let recipeList: Array<Recipe> = [];
    try {
      this.setState({ isFetchingRecipes: true });
      const response = await fetch(
        `https://lb7u7svcm5.execute-api.ap-southeast-1.amazonaws.com/dev/recipes?ingredients=${ingredients}`,
      );
      recipeList = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isFetchingRecipes: false });
    }
    return recipeList;
  }
}

const styles: { [key: string]: React.CSSProperties } = {
  rootContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  recipeBoard: {
    width: '100%',
    flex: 1,
    marginTop: 15,
    paddingTop: 20,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
    boxSizing: 'border-box',
    backgroundColor: '#FCB436',
  },
  recipeGrid: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridTemplateRows: 200,
  },
  bottomContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};
