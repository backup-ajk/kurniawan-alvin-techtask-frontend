import React from 'react';

import { formatDMY } from '../helpers/dateRelated';

type Props = {
  title: string;
  useBy: string;
  selected: boolean;
  disabled: boolean;
  onClick: (item: string) => void;
};

export default function IngredientBox(props: Props) {
  const { title, useBy, disabled, selected, onClick: parentOnClick } = props;
  let rootContainer = { ...styles.rootContainer };
  if (disabled) {
    rootContainer = { ...rootContainer, ...styles.disabled };
  }
  if (selected) {
    rootContainer = { ...rootContainer, ...styles.selected };
  }
  const onClick = disabled
    ? () => {
        return;
      }
    : () => {
        parentOnClick(title);
      };
  return (
    <div style={rootContainer} onClick={onClick}>
      <div style={styles.titleContainer}>{title}</div>
      <div style={styles.expContainer}>{formatDMY(useBy)}</div>
      {disabled ? <div style={styles.disabledOverlay}></div> : null}
    </div>
  );
}

const BORDER_RADIUS = 10;
const INNER_BORDER_RADIUS = 8;

const styles: { [key: string]: React.CSSProperties } = {
  rootContainer: {
    position: 'relative',
    height: 90,
    borderWidth: 2,
    borderColor: '#bcbfff',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: BORDER_RADIUS,
    cursor: 'pointer',
  },
  titleContainer: {
    backgroundColor: '#dfecff',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderTopLeftRadius: INNER_BORDER_RADIUS,
    borderTopRightRadius: INNER_BORDER_RADIUS,
  },
  expContainer: {
    backgroundColor: '#92c0ff',
    height: 30,
    borderBottomLeftRadius: INNER_BORDER_RADIUS,
    borderBottomRightRadius: INNER_BORDER_RADIUS,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    borderColor: '#000',
  },
  selected: {
    borderColor: '#28d094',
    borderWidth: 3,
  },
  disabledOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: INNER_BORDER_RADIUS,
    backgroundColor: 'rgba(0,0,0,0.5)',
    cursor: 'default',
  },
};
