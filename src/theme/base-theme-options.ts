import { ThemeOptions } from '@mui/material';
import { TrainingHelperThemeOptions } from './TrainingHelperTheme/common';

export const baseThemeOptions: TrainingHelperThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        // sizeSmall: {
        //   padding: '6px 16px'
        // },
        // sizeMedium: {
        //   padding: '8px 20px'
        // },
        // sizeLarge: {
        //   padding: '11px 24px'
        // },
        // textSizeSmall: {
        //   padding: '7px 12px'
        // },
        // textSizeMedium: {
        //   padding: '9px 16px'
        // },
        // textSizeLarge: {
        //   padding: '12px 16px'
        // }
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '32px',
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
        subheaderTypographyProps: {
          variant: 'body2',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px',
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        '#__next': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
        '#nprogress': {
          pointerEvents: 'none',
        },
        '#nprogress .bar': {
          backgroundColor: '#5048E5',
          height: 3,
          left: 0,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 2000,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: 8,
        },
        sizeSmall: {
          padding: 4,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          marginRight: '16px',
          '&.MuiListItemIcon-root': {
            minWidth: 'unset',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        elevation: 16,
      },
    },
    MuiRadio: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: 'primary',
      },
    },
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       fontSize: 14,
    //       fontWeight: 500,
    //       lineHeight: 1.71,
    //       minWidth: 'auto',
    //       paddingLeft: 0,
    //       paddingRight: 0,
    //       textTransform: 'none',
    //       '& + &': {
    //         marginLeft: 24
    //       }
    //     }
    //   }
    // },
  },
  direction: 'ltr',
  shape: {
    borderRadius: 4,
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    h1: {
      fontWeight: 500,
      fontSize: 35,
      letterSpacing: '-0.24px',
    },
    h2: {
      fontWeight: 500,
      fontSize: 29,
      letterSpacing: '-0.24px',
    },
    h3: {
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: '-0.06px',
    },
    h4: {
      fontWeight: 500,
      fontSize: 20,
      letterSpacing: '-0.06px',
    },
    h5: {
      fontWeight: 500,
      fontSize: 16,
      letterSpacing: '-0.05px',
    },
    h6: {
      fontWeight: 500,
      fontSize: 14,
      letterSpacing: '-0.05px',
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
    caption: {
      fontSize: '0.6rem',
      lineHeight: '1.2',
    },
    overline: {
      fontWeight: 500,
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
};
