import React from 'react';

const BUTTON_WIDTH = 30;
const STYLE = `
  #superficial-slider {
    width: 100%;
    height: ${BUTTON_WIDTH}px;
    overflow: hidden;
    cursor: pointer;
    outline: none;
  }
  #superficial-slider,
  #superficial-slider::-webkit-slider-runnable-track,
  #superficial-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  #superficial-slider::-webkit-slider-runnable-track {
    height: 4px;
    background: #ccc;
  }
  #superficial-slider::-webkit-slider-thumb {
    position: relative;
    height: 15px;
    width: ${BUTTON_WIDTH}px;
    margin-top: -5px;
    border-radius: 6px;
    z-index: 1;
  }
`;

const styles = {
  container: { position: 'relative' },
  button: ({ left }) => ({
    position: 'absolute',
    top: 9,
    left,
    fontSize: 10,
    width: BUTTON_WIDTH,
    height: 15,
    background: '#999',
    color: '#fff',
    marginLeft: -(BUTTON_WIDTH / 2),
    lineHeight: '15px',
    fontFamily: 'Arial',
    fontWeight: '600',
    border: '1px solid #fff',
    textAlign: 'center',
    borderRadius: BUTTON_WIDTH,
  }),
};

export default function StyledInput(props) {
  // The real slider doesn't overflow the rail,
  // so we need to compute a manual offset to correct for this drift
  const leftPct = ((props.value - props.min) / (props.max - props.min)) * 100;
  const leftOffset = (BUTTON_WIDTH / 2) - ((leftPct / 100) * BUTTON_WIDTH);
  const left = `calc(${leftPct}% + ${leftOffset}px)`;
  const inputArgs =
    Object.assign({ id: 'superficial-slider', type: 'range' }, props);

  return (
    <div style={styles.container}>
      <style>{ STYLE }</style>
      <input {...inputArgs} />
      <div style={styles.button({ left })}>{ props.value }</div>
    </div>
  );
}

const numOrString = React.PropTypes.oneOfType([
  React.PropTypes.string, React.PropTypes.number,
]).isRequired;
StyledInput.propTypes = {
  value: numOrString,
  min: numOrString,
  max: numOrString,
};
