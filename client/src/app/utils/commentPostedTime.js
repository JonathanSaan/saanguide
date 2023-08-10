const commentPostedTime = (timeInMileSec) => {
  let sec = (timeInMileSec / 1000).toFixed(0);
  let min = (timeInMileSec / (1000 * 60)).toFixed(0);
  let hrs = (timeInMileSec / (1000 * 60 * 60)).toFixed(0);
  let days = (timeInMileSec / (1000 * 60 * 60 * 24)).toFixed(0);
  let weeks = (timeInMileSec / (1000 * 60 * 60 * 24 * 7)).toFixed(0);
  let months = (timeInMileSec / (1000 * 60 * 60 * 24 * 31)).toFixed(0);
  let years = (timeInMileSec / (1000 * 60 * 60 * 24 * 12)).toFixed(0);

  if (sec < 60) {
    return sec + " seconds";
  }
  if (min < 60) {
    return min + " mins";
  }
  if (hrs < 24) {
    return hrs + " hrs";
  }
  if (days < 7) {
    return days + " days";
  }
  if (weeks < 4) {
    return weeks + " weeks";
  }
  if (months < 12) {
    return months + " months";
  }

  return years + " year";
};

export default commentPostedTime;
