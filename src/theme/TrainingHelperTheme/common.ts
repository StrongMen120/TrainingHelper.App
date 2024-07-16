import { Palette, PaletteOptions, Theme, ThemeOptions, TypeBackground } from "@mui/material";

interface CollectionTile {
  backgroundColor: string;
  borderColor: string;
  pinColor?: string;
  color?: string;
}

interface VanTile extends CollectionTile {
  status: {
    green: string;
    amber: string;
    red: string;
    unknown: string;
  };
}

interface CollectionTiles {
  base: CollectionTile;
  van: VanTile;
  comment: CollectionTile;
  collectionCompleted: CollectionTile;
  collectionFailed: CollectionTile;
  collectionInProgress: CollectionTile;
  collectionPlanned: CollectionTile;
}

interface TrainingHelperTypeBackground extends TypeBackground {
  dark: string;
}

interface TrainingHelperPaletteOptions extends PaletteOptions {
  background: TrainingHelperTypeBackground;
  collectionTiles: CollectionTiles;
}

interface TrainingHelperPalette extends Palette {
  background: TrainingHelperTypeBackground;
  collectionTiles: CollectionTiles;
}

export interface TrainingHelperTheme extends Theme {
  palette: TrainingHelperPalette;
}

export interface TrainingHelperThemeOptions extends ThemeOptions {
  palette?: TrainingHelperPaletteOptions;
}


