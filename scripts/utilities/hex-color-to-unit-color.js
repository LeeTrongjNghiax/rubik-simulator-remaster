const hexColorToUnitColor = (hexColor = `#00000000`) => {
  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;
  let a = parseInt(hexColor.slice(7, 9), 16) / 255;

  if ( isNaN(a) ) a = 1.0;

  return [r, g, b, a];
}

export default hexColorToUnitColor;
