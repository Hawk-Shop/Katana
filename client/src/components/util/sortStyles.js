
const sortStyles = (styles, id) => {
  let sorted = [];
  let toPush = [];
  for (let style of styles) {
    if (style.style_id === id) {
      toPush.push(style.photos[0].thumbnail_url)
    }
  }
  styles.forEach((style, i) => {
    if (style.style_id !== id) {
      toPush.push(style.photos[0].thumbnail_url)
      if (toPush.length === 4 || i === styles.length-1) {
        sorted.push(toPush)
        toPush = [];
      }
    }
  })
  console.log(sorted)
}

export default sortStyles