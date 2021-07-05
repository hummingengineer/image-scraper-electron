import React from 'react';
import { makeStyles, Theme, createStyles, fade } from '@material-ui/core/styles';

import AppBarMaterial from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MinimizeIcon from '@material-ui/icons/Minimize';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      WebkitAppRegion: 'drag',
    },
    title: {
      display: 'block',
      marginRight: theme.spacing(2),
    },
    search: {
      WebkitAppRegion: 'no-drag',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      flexGrow: 1,
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
    sectionDesktop: {
      WebkitAppRegion: 'no-drag',
      display: 'flex',
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

export default function AppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBarMaterial position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Image Scraper
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder="Search URL"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search url' }}
              fullWidth
              endAdornment={
                <>
                  <Divider className={classes.divider} orientation="vertical" />
                  <IconButton color="inherit">
                    <SearchIcon />
                  </IconButton>
                </>
              }
            />
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" edge="end">
              <MinimizeIcon />
            </IconButton>
            <IconButton color="inherit" edge="end">
              <FullscreenIcon />
            </IconButton>
            <IconButton color="inherit" edge="end">
              <CloseIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBarMaterial>
    </div>
  );
}
