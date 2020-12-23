import styled from 'styled-components';
import { invert, shade } from 'polished';

interface ColorPropsName {
  color: string;
}

export const Card = styled.div<ColorPropsName>`
  border-radius: 20px;
  max-width: 700px;
  max-height: 200px;
  margin-top: 16px;
  border-radius: 8px;
  background: ${(props) => shade(0.2, invert(props.color))};

  &:hover {
    background: ${(props) => shade(0.5, invert(props.color))};
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
`;
export const Name = styled.h1<ColorPropsName>`
  font-size: 1rem;
  color: ${(props) => props.color};
  width: 200px;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const Button = styled.a`
  display: inline-block;
  padding: 0.3em 1.2em;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: #ffffff;
  background-color: #4eb5f1;
  text-align: center;
  transition: all 0.2s;
  &:hover {
    background-color: #4095c6;
  }
`;
