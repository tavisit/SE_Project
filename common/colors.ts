export type WindiColor =
  | 'black'
  | 'white'
  | 'rose'
  | 'pink'
  | 'fuchsia'
  | 'purple'
  | 'violet'
  | 'indigo'
  | 'blue'
  | 'sky'
  | 'cyan'
  | 'teal'
  | 'emerald'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'red'
  | 'warmGray'
  | 'trueGray'
  | 'gray'
  | 'coolGray'
  | 'blueGray'
  | 'dark'
  | 'light';

type WindiColors = {
  [key in WindiColor]: string | Record<number | string, string>;
};
export declare const WindiColors: WindiColors;

export const windiColors: Array<WindiColor> = [
  'black',
  'white',
  'rose',
  'pink',
  'fuchsia',
  'purple',
  'violet',
  'indigo',
  'blue',
  'sky',
  'cyan',
  'teal',
  'emerald',
  'green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'red',
  'warmGray',
  'trueGray',
  'gray',
  'coolGray',
  'blueGray',
  'dark',
  'light',
];

export const windiColoring: Record<WindiColor, WindiColor> = {
  black: 'black',
  white: 'white',
  rose: 'rose',
  pink: 'pink',
  fuchsia: 'fuchsia',
  purple: 'purple',
  violet: 'violet',
  indigo: 'indigo',
  blue: 'blue',
  sky: 'sky',
  cyan: 'cyan',
  teal: 'teal',
  emerald: 'emerald',
  green: 'green',
  lime: 'lime',
  yellow: 'yellow',
  amber: 'amber',
  orange: 'orange',
  red: 'red',
  warmGray: 'warmGray',
  trueGray: 'trueGray',
  gray: 'gray',
  coolGray: 'coolGray',
  blueGray: 'blueGray',
  dark: 'dark',
  light: 'light',
};

// export const colorSafelist = windiColors.reduce<Array<string>>(
//   (acc: Array<string>, windiColor: WindiColor) => {
//     return [
//       ...acc,
//       ...[
//         `ring-${windiColor}-300`,
//         `text-${windiColor}-600`,
//         `border-${windiColor}-200`,
//         `bg-${windiColor}-50`,
//         `bg-${windiColor}-100`,
//         `bg-${windiColor}-200`,
//       ]
//     ];
//   },
//   [] as Array<string>
// );
