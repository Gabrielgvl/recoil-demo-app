import {
  Card, CardActions, CardContent, IconButton, Typography,
} from '@material-ui/core';
import React, { FunctionComponent, ReactNode } from 'react';
import { CustomCardWrapper, CustomCardWrapperProps } from './styles';

export interface CustomCardProps extends CustomCardWrapperProps {
    onClick?: () => void;
    children: ReactNode | ReactNode[]
}

const CustomCard: FunctionComponent<CustomCardProps> = ({
  selected,
  onClick,
  children,
}) => (
  <CustomCardWrapper selected={selected} onClick={onClick}>
    <CardContent>
      {children}
    </CardContent>
  </CustomCardWrapper>
);

export default React.memo(CustomCard);
