import React from 'react';
import './NothingContainer.css';

interface ContainerProps {
  name: string;
}

const NothingContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Will be shown once passenger requests... </p>
    </div>
  );
};

export default NothingContainer;