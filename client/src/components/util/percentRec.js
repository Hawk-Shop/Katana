const percentRec = (recommended) => {
  let yes = 0;
  let no = 0;
  yes += Number(recommended[true]);
  no += Number(recommended[false]);
  return ((yes/(yes+no) * 100).toFixed(0))
}

export default percentRec;