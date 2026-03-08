// script.js (UI glue)
document.addEventListener('DOMContentLoaded', () => {
  // Build map for O(1) lookups
  const cityMap = DS.buildCityMap(CITY_DATA);

  // Elements
  const btn = document.getElementById('searchBtn');
  const closeBtn = document.getElementById('closeResults');
  const resultsPanel = document.getElementById('results-panel');
  const resultsBody = document.getElementById('results-body');
  const titleEl = document.getElementById('results-title');
  const subEl = document.getElementById('results-subtitle');

  function computeScore(name, d, profVal, catVal) {
    // A reproducible scoring function that demonstrates algorithmic thinking
    let score = Math.round(d.hdi * 100);
    if (profVal === 'student') {
      score += Math.round(d.education * 5) || 0;
      score += (d.aqi < 90 ? 20 : d.aqi < 130 ? 10 : 0);
    } else if (profVal === 'professional') {
      score += Math.round(d.jobs * 4) || 0;
      // normalize income string to numeric where possible
      const num = parseInt((d.income||'').replace(/[^\d]/g,'')) || 40000;
      score += Math.round((num/70000)*30);
    } else if (profVal === 'family') {
      score += Math.round((d.healthcare||7)*5);
      score += (d.aqi < 90 ? 25 : d.aqi < 130 ? 12 : 0);
    }
    // Category boost
    if (catVal === 'housing' && d.housing && d.housing.toLowerCase().includes('good')) score += 10;
    if (catVal === 'education' && (d.education||0) >= 8) score += 10;
    return Math.min(100, score);
  }

  function renderResults(selectedCities, catVal, profVal) {
    if (!selectedCities || selectedCities.length === 0) {
      resultsBody.innerHTML = `<div class="no-results"><div class="emoji">🤷</div><h4>No matches</h4><p>Try another profile or category.</p></div>`;
      resultsPanel.classList.add('show');
      return;
    }
    // compute scores
    const scored = selectedCities.map(name => {
      const d = cityMap.get(name);
      const score = computeScore(name, d, profVal, catVal);
      return { name, score, data: d };
    });
    const sorted = DS.sortByScore(scored); // uses quickSort in dsalgo.js

    // build HTML (same structure as sample)
    const html = sorted.map(item => {
      const name = item.name;
      const d = item.data;
      const finalInsights = (catVal !== 'all') ? (d.cat[catVal] || []) : (profVal !== 'all' ? d.profile[profVal] || [] : [`HDI Score: ${d.hdi}`, `Monthly Income Avg: ${d.income}`, `AQI: ${d.aqi}`]);
      const insightLabel = catVal !== 'all' ? catVal.charAt(0).toUpperCase()+catVal.slice(1) + ' Details' : (profVal !== 'all' ? profVal.charAt(0).toUpperCase()+profVal.slice(1) + ' Highlights' : 'Overview');

      return `
      <div class="result-city-block" role="article">
        <div class="result-city-header">
          <img class="result-city-img" src="${d.img}" alt="${name}">
          <div>
            <div class="result-city-name">${name}</div>
            <div class="result-city-sub">${d.state} · ${d.tagline}</div>
          </div>
          <div class="result-score-badge">${item.score}% Match</div>
        </div>
        <div class="result-metrics">
          <div class="result-metric">
            <div class="result-metric-label">HDI Score</div>
            <div class="result-metric-val">${d.hdi}</div>
            <div class="result-metric-sub">${d.hdi>=0.80?'🟢 Excellent':d.hdi>=0.77?'🟡 Good':'🟠 Average'}</div>
          </div>
          <div class="result-metric">
            <div class="result-metric-label">AQI Annual Avg</div>
            <div class="result-metric-val">${d.aqi}</div>
            <div class="result-metric-sub">${d.aqi<90?'🟢 ':d.aqi<130?'🟡 ':'🔴 '}${d.aqiLabel}</div>
          </div>
          <div class="result-metric">
            <div class="result-metric-label">Median Income</div>
            <div class="result-metric-val">${d.income}</div>
            <div class="result-metric-sub">Avg monthly</div>
          </div>
        </div>
        <div class="result-insights">
          <div class="result-insights-title">${insightLabel}</div>
          <ul>${finalInsights.map(i=>`<li>${i}</li>`).join('')}</ul>
        </div>
        <div class="result-links">
          <a class="result-link" href="${d.housingUrl}" target="_blank" rel="noopener noreferrer">Housing.com</a>
          <a class="result-link" href="${d.eduUrl}" target="_blank" rel="noopener noreferrer">Colleges on Shiksha</a>
        </div>
      </div>`;
    }).join('');

    resultsBody.innerHTML = html;
    resultsPanel.classList.add('show');
  }

  // Run Search (wired to button)
  btn.addEventListener('click', () => {
    const cityVal = document.getElementById('search-city').value;
    const catVal  = document.getElementById('search-cat').value;
    const profVal = document.getElementById('search-profile').value;

    titleEl.textContent = cityVal === 'all' ? 'All Cities' : cityVal;
    subEl.textContent   = `${catVal === 'all' ? 'All Indicators' : catVal} · ${profVal === 'all' ? 'Anyone' : profVal}`;

    const citiesToShow = cityVal === 'all' ? Object.keys(CITY_DATA) : [cityVal];
    renderResults(citiesToShow, catVal, profVal);
  });

  closeBtn.addEventListener('click', () => resultsPanel.classList.remove('show'));

  // Scroll reveal (same as sample)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(r => observer.observe(r));
});