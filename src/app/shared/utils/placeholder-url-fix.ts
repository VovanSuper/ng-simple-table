export type ImgType = 'image' | 'preview';

export const placeholderUrlFixer = <T extends ImgType>(opts: Record<T, string>) =>
  Object.entries(opts).reduce((accu = {}, [key, val]) => ({
    ...accu,
    [key]: `https://via.placeholder.com${((<string>val).split('http://placehold.it')[1])}`.split('x')[0]
  }), {});