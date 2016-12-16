import React from 'react';
import superficial from 'superficial';

class TransformBox extends React.Component {
  render() {
    return (
      <div looks={this.looks.square}>
        <h1 looks={this.looks.title}>
          Box Width: { this.props.width }
        </h1>
      </div>
    );
  }
}

TransformBox.looks = {
  square: {
    200: { width: '200px', height: '200px' },
    800: { width: '800px', height: '800px' },
    background: '#ccf',
    marginLeft: { 200: '0px', 450: '400px', 700: '0px' },
    position: 'relative',
  },
  title: {
    fontSize: { 200: '11px', 800: '32px' },
    margin: 0,
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
  },
};

export default superficial(TransformBox);
