// True on phones and tablets where there is no mouse to hover with
export const isTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
