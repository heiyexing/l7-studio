import Color from 'color';

export const getOpacityColor = (color: string, alpha: number) => {
  const colorInstance = Color(color).fade(alpha);
  return `rgba(${colorInstance.array().join(', ')})`;
};
