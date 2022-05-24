
const sortStyles = (styles) => {
  let sorted = [];
  let toPush = [];

  styles.forEach((style, i) => {

    toPush.push({photo: style.photos[0].thumbnail_url, index: i, id: style.style_id})
    if (toPush.length === 4 || i === styles.length-1) {
      sorted.push(toPush)
      toPush = [];
    }
  })
  return sorted;
}

export default sortStyles