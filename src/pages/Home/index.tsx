import React, { useCallback, useEffect, useState } from 'react';
import Select, { ValueType } from 'react-select';
import { v4 as uuid } from 'uuid';

import Character from '../../components/ Character';
import api from '../../services/api';

import { Container } from './styles';

interface CharacterPropsData {
  name: string;
  eye_color: string;
  uuid: string;
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
  const [listStorageCharacters, setListStorageCharacters] = useState<
    CharacterPropsData[]
  >([]);
  const [selectOption] = useState();
  const [charactersList, setCharactersList] = useState<OptionsSelect[]>([]);

  const isColorValidCss = (strColor: string): boolean => {
    const s = new Option().style;
    s.color = strColor;
    return s.color === strColor;
  };

  useEffect(() => {
    api.get<JsonResult>(`/people`).then((response) => {
      const { results } = response.data;

      const resultsFilteredColor = results.map((character) => {
        if (!isColorValidCss(character.eye_color))
          return {
            name: character.name,
            eye_color: '#fff',
            uuid: uuid(),
          };
        return {
          name: character.name,
          eye_color: character.eye_color,
          uuid: uuid(),
        };
      });
      setListStorageCharacters(
        resultsFilteredColor.sort((a, b) => a.name.localeCompare(b.name)),
      );

      const formattedListToSelectList = resultsFilteredColor.map(
        (character) => {
          return { value: character.uuid, label: character.name };
        },
      );
      setCharactersList(
        formattedListToSelectList.sort((a, b) =>
          a.label.localeCompare(b.label),
        ),
      );
    });
  }, []);

  const handleDelete = useCallback(
    (id: string): void => {
      const person = listStorageCharacters.find((p) => p.uuid === id);

      if (person) {
        const newCharactersList = characters.filter(
          (p) => p.uuid !== person.uuid,
        );
        setCharacters(
          newCharactersList.sort((a, b) => a.name.localeCompare(b.name)),
        );

        const newListCharacter = [
          ...charactersList,
          { value: person.uuid, label: person.name },
        ];

        setCharactersList(
          newListCharacter.sort((a, b) => a.label.localeCompare(b.label)),
        );
      }
    },
    [
      listStorageCharacters,
      characters,
      setCharacters,
      setCharactersList,
      charactersList,
    ],
  );

  const handleChangeSelect = useCallback(
    (selected: ValueType<OptionsSelect, false>): void => {
      const person = listStorageCharacters.find(
        (p) => p.uuid === selected?.value,
      );

      if (person) {
        setCharacters([...characters, person]);

        const newListSelected = charactersList.filter((p) => {
          return p.value !== selected?.value;
        });
        setCharactersList(newListSelected);
      }
    },
    [
      listStorageCharacters,
      characters,
      charactersList,
      setCharactersList,
      setCharacters,
    ],
  );

  const styles = {
    option: () => ({
      borderBottom: '1px dotted pink',
      backgroundColor: 'papayawhip',
      color: 'black',
      padding: 20,
    }),
    control: () => ({ backgroundColor: 'papayawhip' }),
  };

  return (
    <Container>
      <Select
        value={selectOption}
        onChange={handleChangeSelect}
        options={charactersList}
        styles={styles}
      />
      {characters.map((character) => (
        <Character
          key={character.name}
          name={character.name}
          uuid={character.uuid}
          color={character.eye_color}
          onClickDelete={handleDelete}
        />
      ))}
    </Container>
  );
};

export default Home;
