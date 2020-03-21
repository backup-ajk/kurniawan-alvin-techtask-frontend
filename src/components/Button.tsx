import React from 'react';

type Props = {
  label: string;
  onClick: () => void;
  theme?: 'primary' | 'danger' | 'success';
};
type State = {
  isHover: boolean;
};
export default class Button extends React.Component<Props, State> {
  state: State = {
    isHover: false,
  };

  render() {
    const { isHover } = this.state;
    const { label, onClick, theme = 'primary' } = this.props;
    let buttonStyle = { ...styles.baseButton };
    if (styles[theme]) {
      buttonStyle = { ...buttonStyle, ...styles[theme] };
    }
    if (isHover) {
      buttonStyle = { ...buttonStyle, ...styles[`${theme}Hovered`] };
    }
    return (
      <button
        onClick={onClick}
        onMouseEnter={this._setHovered}
        onMouseLeave={this._removeHovered}
        style={buttonStyle}
      >
        {label}
      </button>
    );
  }
  _setHovered = () => {
    this.setState({ isHover: true });
  };
  _removeHovered = () => {
    this.setState({ isHover: false });
  };
}

const styles: { [key: string]: React.CSSProperties } = {
  baseButton: {
    cursor: 'pointer',
    padding: '0.75rem 1rem',
    fontSize: 16,
    color: '#fff',
    borderRadius: '0.25rem',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  primary: {
    borderColor: '#3a44e1',
    backgroundColor: '#666ee8',
  },
  primaryHovered: {
    borderColor: '#5059e5',
    backgroundColor: '#7c83eb',
  },
  danger: {
    borderColor: '#ff1635',
    backgroundColor: '#ff4961',
  },
  dangerHovered: {
    borderColor: '#ff304b',
    backgroundColor: '#ff6377',
  },
  success: {
    borderColor: '#20a576',
    backgroundColor: '#28d094',
  },
  successHovered: {
    borderColor: '#24bb85',
    backgroundColor: '#39d9a0',
  },
};
