import React from 'react';

import { Recipe } from '../types/General-type';

type Props = {
  recipe: Recipe;
};

export default function RecipeCard(props: Props) {
  const { recipe } = props;
  const { title, ingredients } = recipe;

  return (
    <div style={styles.rootContainer}>
      <div style={styles.titleContainer}>{title}</div>
      <div style={styles.ingredientContainer}>
        <ul style={styles.ingredientList}>
          {ingredients.map((ingredient, index) => (
            <li style={styles.ingredientListItem} key={index}>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const BORDER_RADIUS = 10;
const BORDER_WIDTH = 5;
const INNER_BORDER_RADIUS = BORDER_RADIUS - BORDER_WIDTH;

const styles: { [key: string]: React.CSSProperties } = {
  rootContainer: {
    position: 'relative',
    height: 200,
    borderWidth: BORDER_WIDTH,
    borderColor: '#546e7a',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: BORDER_RADIUS,
    cursor: 'pointer',
  },
  titleContainer: {
    backgroundColor: '#607d8b',
    color: '#fff',
    fontWeight: 600,
    fontSize: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderTopLeftRadius: INNER_BORDER_RADIUS,
    borderTopRightRadius: INNER_BORDER_RADIUS,
  },
  ingredientContainer: {
    overflowY: 'scroll',
    backgroundColor: '#cfd8dc',
    flex: 1,
    borderBottomLeftRadius: INNER_BORDER_RADIUS,
    borderBottomRightRadius: INNER_BORDER_RADIUS,
    display: 'flex',
  },
  ingredientList: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    width: '100%',
    marginTop: 5,
  },
  ingredientListItem: {
    position: 'relative',
    display: 'block',
    padding: '0.5rem',
    marginBottom: -1,
    fontWeight: 500,
    fontSize: 18,
  },
};
