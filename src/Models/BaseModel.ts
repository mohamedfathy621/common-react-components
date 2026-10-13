export type Dictionary<K extends string | number | symbol, V> = {
  [key in K]: V;
};
