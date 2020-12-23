import React from 'react';

import { Card, Container, Name, ButtonContainer, Button } from './styles';

interface CharacterProps {
  name: string;
  color: string;
  onClickDelete: (name: string) => void;
}

const Character: React.FC<CharacterProps> = ({
  name,
  color,
  onClickDelete,
}) => {
  return (
    <Card color={color}>
      <Container>
        <Name color={color}>{name}</Name>
        <ButtonContainer>
          <Button onClick={() => onClickDelete(name)}>Excluir</Button>
        </ButtonContainer>
      </Container>
    </Card>
  );
};

export default Character;
