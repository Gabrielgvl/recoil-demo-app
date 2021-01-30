import Card from '@material-ui/core/Card';
import styled from 'styled-components';

export interface CustomCardWrapperProps {
    selected?: boolean
}

export const CustomCardWrapper = styled(Card)<CustomCardWrapperProps>`
  background-color: ${(props) => (props.selected ? 'lightyellow' : 'transparent')};
  cursor: ${(props) => (props.onClick ? 'pointer' : 'auto')};
`;
