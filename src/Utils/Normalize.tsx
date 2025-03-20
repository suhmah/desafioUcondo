import { Dimensions, PixelRatio, Platform } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

const BASE_WIDTH = 750;
const BASE_HEIGHT = 557;

const wscale = SCREEN_WIDTH / BASE_WIDTH;
const hscale = SCREEN_HEIGHT / BASE_HEIGHT;

export default function Normalize(size: number, basedOn: 'width' | 'height' = 'width'): number {
  const scale = basedOn === 'width' ? wscale : hscale;
  const newSize = size * scale;
  
  return Platform.OS === 'ios'
    ? PixelRatio.roundToNearestPixel(newSize)
    : PixelRatio.getPixelSizeForLayoutSize(newSize);
}

export const WIDTH = SCREEN_WIDTH;
export const HEIGHT = SCREEN_HEIGHT;
