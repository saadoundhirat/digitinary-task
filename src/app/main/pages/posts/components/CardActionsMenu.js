import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import { IconButton } from '@mui/material';

function CardActionsMenu({ post, setPostToDelete, setShowDeleteConfirm, editPostHandler }) {
  const [actionsMenu, setActionsMenu] = useState(null);

  const actionsMenuClick = (event) => {
    event.stopPropagation();
    setActionsMenu(event.currentTarget);
  };

  const actionsMenuClose = (event) => {
    event.stopPropagation();
    setActionsMenu(null);
  };

  const deletePostHandler = (event) => {
    event.stopPropagation();
    setShowDeleteConfirm(true);
    setPostToDelete(post);
    actionsMenuClose(event);
  };

  const editPostBtnHandler = (event) => {
    event.stopPropagation();
    if (editPostHandler) {
      editPostHandler();
    }
    actionsMenuClose(event);
  };

  return (
    <>
      <IconButton aria-label="card-actions" onClick={actionsMenuClick} size="medium">
        <MoreVertIcon sx={{ fontSize: '2.4rem' }} />
      </IconButton>
      <Popover
        open={Boolean(actionsMenu)}
        anchorEl={actionsMenu}
        onClose={actionsMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPopover-paper': {
            padding: '0.5rem 0',
            marginLeft: '-3rem',
            marginTop: '-0.5rem',
          },
        }}
      >
        <>
          <MenuItem
            sx={{
              '& .MuiListItemText-primary': {
                fontSize: '1.3rem',
              },
            }}
            component="a"
            role="button"
            onClick={(e) => editPostBtnHandler(e)}
          >
            <ListItemText primary="Edit" />
          </MenuItem>
          <MenuItem
            sx={{
              '& .MuiListItemText-primary': {
                fontSize: '1.3rem',
              },
            }}
            component="a"
            role="button"
            onClick={(e) => deletePostHandler(e)}
          >
            <ListItemText primary="Delete" />
          </MenuItem>
        </>
      </Popover>
    </>
  );
}

export default CardActionsMenu;
