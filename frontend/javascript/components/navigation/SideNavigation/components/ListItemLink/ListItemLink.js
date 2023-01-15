import React from 'react';

import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import useIsCurrentPath from 'hooks/useIsCurrentPath';

import useStyles from './ListItemLinkStyles';

const ListItemLink = ({ badgeCount, closeMenu, href, icon, label }) => {
  const history = useHistory();

  const isActive = useIsCurrentPath(href);
  const classes = useStyles({ isActive });

  const onClickLink = () => {
    history.push(href);
    closeMenu();
  };

  return (
    <ListItem button className={classes.listItem} onClick={onClickLink}>
      <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
      <ListItemText primary={<span className={classes.label}>{label}</span>} />
      {badgeCount > 0 && <Badge className={classes.badge} badgeContent={badgeCount} color="secondary" />}
    </ListItem>
  );
};

ListItemLink.propTypes = {
  badgeCount: PropTypes.number,
  closeMenu: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

ListItemLink.defaultProps = {
  badgeCount: 0,
};

export default ListItemLink;
