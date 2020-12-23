import React, { useCallback, useEffect, useState } from 'react';
import Character from '../../components/ Character';
import api from '../../services/api';

import { Container } from './styles';

interface CharacterPropsData {
  name: string;
  eye_color: string;
}

interface JsonResult {
  results: CharacterPropsData[];
}

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<CharacterPropsData[]>([]);
  const [charactersList, setCharactersList] = useState<CharacterPropsData[]>(
    [],
  );

  useEffect(() => {
    api.get<JsonResult>(`/people`).then((response) => {
      const { results } = response.data;
      const resultsFilteredColor = results.map((character) => {
        if (!isColorValidCss(character.eye_color))
          return {
            ...character,
            eye_color: '#fff',
          };
        return character;
      });
      setCharacters(resultsFilteredColor);
    });
  }, []);

  const isColorValidCss = (strColor: string): boolean => {
    const s = new Option().style;
    s.color = strColor;
    return s.color === strColor;
  };

  const handleDelete = useCallback((name: string): void => {
    console.log(name);
  }, []);

  return (
    <Container>
      {characters.map((character) => (
        <Character
          name={character.name}
          color={character.eye_color}
          onClickDelete={handleDelete}
        />
      ))}
    </Container>
  );
};

export default Home;
