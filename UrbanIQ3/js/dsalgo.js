// dsalgo.js
// A small library that demonstrates searching, sorting, and basic DS usage
// Used by script.js for sorting and scoring results

// 1) QuickSort for array of objects by numeric key (stable-ish)
function quickSort(arr, key) {
  if (!Array.isArray(arr) || arr.length < 2) return arr.slice();
  const pivot = arr[Math.floor(arr.length/2)];
  const less = [], equal = [], greater = [];
  for (let i=0;i<arr.length;i++){
    const v = (typeof key === 'function') ? key(arr[i]) : arr[i][key];
    const pv = (typeof key === 'function') ? key(pivot) : pivot[key];
    if (v < pv) less.push(arr[i]);
    else if (v > pv) greater.push(arr[i]);
    else equal.push(arr[i]);
  }
  return quickSort(less, key).concat(equal, quickSort(greater, key));
}

// 2) Linear search (used for suggestion fallback)
function linearSearch(arr, predicate) {
  const out = [];
  for (let i=0;i<arr.length;i++) if (predicate(arr[i])) out.push(arr[i]);
  return out;
}

// 3) JS Map used as hash table for O(1) city lookup
function buildCityMap(dataObj) {
  return new Map(Object.entries(dataObj));
}

// 4) Simple score comparator used to sort relevance
function sortByScore(cityScoreArray) {
  // cityScoreArray: [{name, score, data}, ...]
  const sorted = quickSort(cityScoreArray, item => -item.score); // descending by score
  return sorted;
}

// Expose
window.DS = { quickSort, linearSearch, buildCityMap, sortByScore };