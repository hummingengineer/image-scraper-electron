import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, Theme, createStyles, alpha } from '@material-ui/core/styles';

import AppBarMaterial from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MinimizeIcon from '@material-ui/icons/Minimize';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      WebkitAppRegion: 'drag',
    },
    title: {
      WebkitUserSelect: 'none',
      display: 'block',
      marginRight: theme.spacing(2),
    },
    search: {
      WebkitAppRegion: 'no-drag',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
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

  const [isFullScreen, setIsFullScreen] = useState(false);

  const urlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.api.receive('app-maximized', () => {
      setIsFullScreen(true);
    });
    window.api.receive('app-unmaximized', () => {
      setIsFullScreen(false);
    });

    return function cleanup() {
      window.api.remove('app-maximized');
      window.api.remove('app-unmaximized');
    };
  }, []);

  return (
    <AppBarMaterial position="fixed" className={classes.root}>
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
                <IconButton
                  color="inherit"
                  onClick={() => window.api.send('search', urlRef.current.value)}
                >
                  <SearchIcon />
                </IconButton>
              </>
            }
            inputRef={urlRef}
          />
        </div>
        <div className={classes.sectionDesktop}>
          <IconButton color="inherit" edge="end" onClick={() => window.api.send('minimize-app')}>
            <MinimizeIcon />
          </IconButton>
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => window.api.send('maximize-unmaximize-app')}
          >
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
          <IconButton color="inherit" edge="end" onClick={() => window.api.send('close-app')}>
            <CloseIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBarMaterial>
  );
}
