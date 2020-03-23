import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { Button, DateInput, IngredientBox } from '../components';
import {
  removeDashFromDate,
  convertDateToString,
} from '../helpers/dateRelated';

type Ingredient = {
  title: string;
  useBy: string;
};

type State = {
  selectedDate: Date;
  isFetchingIngredients: boolean;
  ingredientList: Array<Ingredient>;
  selectedIngredients: Array<string>;
  initSearchRecipe: boolean;
  errorMessage: string;
};
type Props = RouteComponentProps & {};

export default class HomeScene extends React.Component<Props, State> {
  state: State = {
    selectedDate: new Date(),
    isFetchingIngredients: false,
    ingredientList: [],
    selectedIngredients: [],
    initSearchRecipe: false,
    errorMessage: '',
  };

  componentDidMount() {
    document.title = 'Home';
    const fetchResult = this._fetchDataFromServer();
    fetchResult.then((ingredientList: Array<Ingredient>) => {
      this.setState({ ingredientList });
    });
  }
  render() {
    const {
      selectedDate,
      isFetchingIngredients,
      initSearchRecipe,
      selectedIngredients,
    } = this.state;

    if (initSearchRecipe) {
      return (
        <Redirect
          to={`/recipes?ingredients=${selectedIngredients.join(
            ',',
          )}&lunchDate=${convertDateToString(selectedDate)}`}
        />
      );
    }

    return (
      <div style={styles.rootContainer}>
        <DateInput
          value={selectedDate}
          onChangeDate={(newDate: Date) => {
            const { selectedIngredients, ingredientList } = this.state;
            const formattedNewDate = convertDateToString(newDate);
            const newSelectedIngredients: Array<string> = [];

            selectedIngredients.forEach((selIngred) => {
              const curIngredient = ingredientList.find(
                (ingred) => ingred.title === selIngred,
              );
              if (
                curIngredient &&
                removeDashFromDate(curIngredient.useBy) >= formattedNewDate
              ) {
                newSelectedIngredients.push(selIngred);
              }
            });
            this.setState({
              selectedDate: newDate,
              selectedIngredients: newSelectedIngredients,
            });
          }}
        />
        <div style={styles.refrigerator}>
          {isFetchingIngredients ? (
            <span>Loading Refrigerator</span>
          ) : (
            this._renderRefrigerator()
          )}
        </div>
        {this._renderBottom()}
      </div>
    );
  }

  _renderRefrigerator = () => {
    const { ingredientList, selectedIngredients, selectedDate } = this.state;
    const formattedSelDate = convertDateToString(selectedDate);

    return (
      <div style={styles.refrigeratorGrid}>
        {ingredientList.map((ingredient: Ingredient, index) => {
          return (
            <IngredientBox
              key={index}
              title={ingredient.title}
              useBy={ingredient.useBy}
              selected={selectedIngredients.includes(ingredient.title)}
              disabled={removeDashFromDate(ingredient.useBy) < formattedSelDate}
              onClick={this._toggleIngredients}
            />
          );
        })}
      </div>
    );
  };

  _renderBottom = () => {
    const { selectedIngredients, errorMessage } = this.state;
    return (
      <div style={styles.bottomContainer}>
        <Button
          label={'Find Recipes'}
          onClick={() => {
            if (selectedIngredients.length === 0) {
              this.setState({
                errorMessage: 'Please select ingredients first!',
              });
            } else {
              this.setState({ initSearchRecipe: true });
            }
          }}
          theme={'success'}
        />
        <span style={styles.errorMessage}>{errorMessage}</span>
      </div>
    );
  };

  _toggleIngredients = (item: string) => {
    const { selectedIngredients } = this.state;
    const selectedIndex = selectedIngredients.findIndex((sel) => sel === item);
    if (selectedIndex < 0) {
      selectedIngredients.push(item);
    } else {
      console.log(selectedIndex);
      selectedIngredients.splice(selectedIndex, 1);
    }
    console.log(selectedIngredients);
    this.setState({ selectedIngredients, errorMessage: '' });
  };

  async _fetchDataFromServer() {
    let ingredientList = [];
    try {
      this.setState({ selectedIngredients: [], isFetchingIngredients: true });
      const response = await fetch(
        'https://lb7u7svcm5.execute-api.ap-southeast-1.amazonaws.com/dev/ingredients',
      );
      ingredientList = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isFetchingIngredients: false });
    }
    return ingredientList.map(
      (ingredient: { title: string; 'use-by': string }) => {
        return { title: ingredient.title, useBy: ingredient['use-by'] };
      },
    );
  }
}

const styles: {
  [key: string]: React.CSSProperties;
} = {
  rootContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  refrigerator: {
    width: '100%',
    flex: 1,
    marginTop: 15,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
    boxSizing: 'border-box',
    backgroundColor: '#F5F5DC',
  },
  refrigeratorGrid: {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gridTemplateRows: 100,
  },
  bottomContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorMessage: {
    height: 20,
    fontSize: 16,
    color: '#ff0000',
  },
};
