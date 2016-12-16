import React from 'react';
import superficial from 'superficial';

const StatelessHeader = (_, looks) => (
  <div looks={looks.container}>
    <h1>Stateless Header</h1>
  </div>
);

StatelessHeader.looks = {
  container: {
    textAlign: 'center',
    color: '#666',
    marginTop: { 200: '0px', 800: '400px' },
  },
};

export default superficial(StatelessHeader);
