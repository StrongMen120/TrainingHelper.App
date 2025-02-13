import type { Direction, Palette, Theme, TypeBackground } from '@mui/material';
import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles';
import { baseThemeOptions } from './base-theme-options';
import { darkThemeOptions } from './dark-theme-options';
import { lightThemeOptions } from './light-theme-options';
import { TrainingHelperTheme, TrainingHelperThemeOptions } from './TrainingHelperTheme/common';

interface ThemeConfig {
  direction?: Direction;
  responsiveFontSizes?: boolean;
  mode: 'light' | 'dark';
}

interface Neutral {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    neutral?: Neutral;
  }

  interface PaletteOptions {
    neutral?: Neutral;
  }
}

const createTrainingHelperThemeHelper = (
  baseTheme: TrainingHelperThemeOptions,
  modeTheme: TrainingHelperThemeOptions,
  direction: { direction: Direction | undefined }
): TrainingHelperTheme => createMuiTheme(baseTheme, modeTheme, direction) as TrainingHelperTheme;

export const createTrainingHelperTheme = (config: ThemeConfig): TrainingHelperTheme => {
  let theme = createTrainingHelperThemeHelper(baseThemeOptions, config.mode === 'dark' ? darkThemeOptions : lightThemeOptions, {
    direction: config.direction,
  });

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme) as TrainingHelperTheme;
  }

  return theme;
};
