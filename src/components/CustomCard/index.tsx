import { CardContent } from '@material-ui/core';
import { FunctionComponent, memo, ReactNode } from 'react';
import { CustomCardWrapper, CustomCardWrapperProps } from './styles';
import ContextMenu from '../ContextMenu';

export interface CustomCardProps extends CustomCardWrapperProps {
    onClick?: () => void;
    children: ReactNode | ReactNode[];
    onEdit: () => void;
}

const CustomCard: FunctionComponent<CustomCardProps> = ({
  selected,
  onClick,
  children,
  onEdit,
}) => (
  <ContextMenu onEdit={onEdit}>
    <CustomCardWrapper selected={selected} onClick={onClick}>
      <CardContent>
        {children}
      </CardContent>
    </CustomCardWrapper>
  </ContextMenu>
);

export default memo(CustomCard);
