// dsalgo.js
function quickSort(arr, key) {
  if (!Array.isArray(arr) || arr.length < 2) return arr.slice();
  const pivot = arr[Math.floor(arr.length / 2)];
  const less = [], equal = [], greater = [];
  for (let i = 0; i < arr.length; i++) {
    const v = (typeof key === 'function') ? key(arr[i]) : arr[i][key];
    const pv = (typeof key === 'function') ? key(pivot) : pivot[key];
    if (v < pv) less.push(arr[i]);
    else if (v > pv) greater.push(arr[i]);
    else equal.push(arr[i]);
  }
  return quickSort(less, key).concat(equal, quickSort(greater, key));
}

function linearSearch(arr, predicate) {
  const out = [];
  for (let i = 0; i < arr.length; i++) if (predicate(arr[i])) out.push(arr[i]);
  return out;
}

function buildCityMap(dataObj) {
  return new Map(Object.entries(dataObj));
}

function sortByScore(cityScoreArray) {
  return quickSort(cityScoreArray, item => -item.score);
}

window.DS = { quickSort, linearSearch, buildCityMap, sortByScore };