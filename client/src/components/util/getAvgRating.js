
const avgRating = (ratings) => {
    let ratingTotal = 0;
    let averager = 0;
    for (let r in ratings) {
      ratingTotal += Number(ratings[r]);
      averager += Number(ratings[r]) * Number(r);
    }
    const averageRating = averager / ratingTotal;
    return {averageRating, ratingTotal, averager};
 }

 export default avgRating