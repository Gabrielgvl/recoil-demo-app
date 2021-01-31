import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const initialState = {
  mouseX: null,
  mouseY: null,
};

export interface ContextMenuProps {
    onEdit: () => void
}

const ContextMenu: React.FC<ContextMenuProps> = ({ onEdit, children }) => {
  const [state, setState] = React.useState<{
        mouseX: null | number;
        mouseY: null | number;
    }>(initialState);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

  return (
    <div onContextMenu={handleClick} style={{ cursor: 'context-menu' }}>
      {children}
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
                    state.mouseY !== null && state.mouseX !== null
                      ? { top: state.mouseY, left: state.mouseX }
                      : undefined
                }
      >
        <MenuItem onClick={() => {
          onEdit();
          handleClose();
        }}
        >
          Editar
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ContextMenu;
