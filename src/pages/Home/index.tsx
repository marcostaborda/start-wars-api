import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
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

interface OptionsSelect {
  value: string;
  label: string;
}

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<CharacterPropsData[]>([]);
  const [selectOption, setSelectOption] = useState();
  const [charactersList, setCharactersList] = useState<OptionsSelect[]>([]);

  useEffect(() => {
    api.get<JsonResult>(`/people`).then((response) => {
      const { results } = response.data;

      const formattedListToSelectList = results.map((character) => {
        return { value: character.name, label: character.name };
      });
      setCharactersList(formattedListToSelectList);
      console.log(charactersList);

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

  const handleChangeSelect = useCallback((selected): void => {
    console.log(selected);
  }, []);

  return (
    <Container>
      <Select
        value={selectOption}
        onChange={handleChangeSelect}
        options={charactersList}
      />
      {characters.map((character) => (
        <Character
          key={character.name}
          name={character.name}
          color={character.eye_color}
          onClickDelete={handleDelete}
        />
      ))}
    </Container>
  );
};

export default Home;
