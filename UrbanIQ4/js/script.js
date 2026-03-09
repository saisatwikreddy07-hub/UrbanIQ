document.addEventListener('DOMContentLoaded', () => {

  // Build map for O(1) lookups
  const cityMap = DS.buildCityMap(CITY_DATA);

  /* -------------------------
     Navigation: show / hide pages
     ------------------------- */
  window.showPage = function(page){
    document.querySelectorAll(".page").forEach(section=>section.classList.remove("active"));
    document.querySelectorAll(".nav-links a").forEach(link=>link.classList.remove("active"));
    const pageEl = document.getElementById("page-"+page);
    if(pageEl) pageEl.classList.add("active");
    const navEl = document.getElementById("nav-"+page);
    if(navEl) navEl.classList.add("active");
  };

  /* -------------------------
     Populate cities list (Cities page)
     ------------------------- */
  function populateCitiesList(){
    const list = document.getElementById('cities-list');
    if(!list) return;
    const html = Object.keys(CITY_DATA).map(name=>{
      const d = CITY_DATA[name];
      return `<div class="result-city-block">
        <div class="result-city-header">
          <img class="result-city-img" src="${d.img}" alt="${name}">
          <div>
            <div class="result-city-name">${name}</div>
            <div class="result-city-sub">${d.state} · ${d.tagline}</div>
          </div>
        </div>
        <div style="margin-top:8px"><a class="result-link" href="${d.wiki}" target="_blank">Wikipedia</a></div>
      </div>`;
    }).join('');
    list.innerHTML = html;
  }
  populateCitiesList();

  /* -------------------------
     Fill HDI / AQI / Infra pages
     ------------------------- */
  function populateIndicators(){
    const hdiList = document.getElementById('hdi-list');
    const aqiList = document.getElementById('aqi-list');
    const infraList = document.getElementById('infra-list');
    if(hdiList) hdiList.innerHTML = Object.keys(CITY_DATA).map(n=>`<div style="margin:8px">${n}: ${CITY_DATA[n].hdi}</div>`).join('');
    if(aqiList) aqiList.innerHTML = Object.keys(CITY_DATA).map(n=>`<div style="margin:8px">${n}: ${CITY_DATA[n].aqi} (${CITY_DATA[n].aqiLabel})</div>`).join('');
    if(infraList) infraList.innerHTML = Object.keys(CITY_DATA).map(n=>`<div style="margin:8px"><b>${n}</b>: ${CITY_DATA[n].infrastructure}</div>`).join('');
  }
  populateIndicators();

  /* -------------------------
     Search logic: compute score & render results
     ------------------------- */
  const btn = document.getElementById('searchBtn');
  const closeBtn = document.getElementById('closeResults');
  const resultsPanel = document.getElementById('results-panel');
  const resultsBody = document.getElementById('results-body');
  const titleEl = document.getElementById('results-title');
  const subEl = document.getElementById('results-subtitle');

  function computeScore(name, d, profVal, catVal) {
    let score = Math.round((d.hdi || 0.7) * 100);
    if (profVal === 'student') {
      score += Math.round(((d.education && d.education*1) || 8) * 2) || 0;
      score += (d.aqi < 90 ? 20 : d.aqi < 130 ? 10 : 0);
    } else if (profVal === 'professional') {
      score += Math.round(((parseInt((d.income||'').replace(/[^\d]/g,''))||50000)/70000)*30);
    } else if (profVal === 'family') {
      score += Math.round(((d.healthcare||7) * 5));
      score += (d.aqi < 90 ? 25 : d.aqi < 130 ? 12 : 0);
    }
    if (catVal === 'housing' && d.housing && d.housing.toLowerCase().includes('affordable')) score += 10;
    if (catVal === 'education' && (d.education||9) >= 8) score += 10;
    return Math.min(100, score);
  }

  function renderResults(selectedCities, catVal, profVal) {
    if (!selectedCities || selectedCities.length === 0) {
      resultsBody.innerHTML = `<div class="no-results"><div class="emoji">🤷</div><h4>No matches</h4><p>Try another profile or category.</p></div>`;
      resultsPanel.classList.add('show');
      return;
    }
    const scored = selectedCities.map(name => {
      const d = cityMap.get(name);
      const score = computeScore(name, d, profVal, catVal);
      return { name, score, data: d };
    });
    const sorted = DS.sortByScore(scored);

    const html = sorted.map(item => {
      const name = item.name;
      const d = item.data;
      const finalInsights = (catVal !== 'all') ? (d.cat[catVal] || []) : (profVal !== 'all' ? d.profile[profVal] || [] : [`HDI: ${d.hdi}`, `Avg income: ${d.income}`, `AQI: ${d.aqi}`]);
      const insightLabel = catVal !== 'all' ? (catVal.charAt(0).toUpperCase()+catVal.slice(1) + ' Details') : (profVal !== 'all' ? (profVal.charAt(0).toUpperCase()+profVal.slice(1) + ' Highlights') : 'Overview');

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
            <div class="result-metric-label">HDI</div>
            <div class="result-metric-val">${d.hdi}</div>
            <div class="result-metric-sub">${d.hdi>=0.80?'🟢 Excellent':d.hdi>=0.77?'🟡 Good':'🟠 Average'}</div>
          </div>
          <div class="result-metric">
            <div class="result-metric-label">AQI</div>
            <div class="result-metric-val">${d.aqi}</div>
            <div class="result-metric-sub">${d.aqi<90?'🟢 ':d.aqi<130?'🟡 ':'🔴 '}${d.aqiLabel}</div>
          </div>
          <div class="result-metric">
            <div class="result-metric-label">Income</div>
            <div class="result-metric-val">${d.income}</div>
            <div class="result-metric-sub">Avg monthly</div>
          </div>
        </div>

        <div class="result-insights">
          <div class="result-insights-title">${insightLabel}</div>
          <ul>${finalInsights.map(i=>`<li>${i}</li>`).join('')}</ul>
        </div>

        <div class="result-links">
          <a class="result-link" href="${d.housingUrl}" target="_blank" rel="noopener">Housing.com</a>
          <a class="result-link" href="${d.eduUrl}" target="_blank" rel="noopener">Colleges on Shiksha</a>
          <a class="result-link" href="${d.wiki}" target="_blank" rel="noopener">Wikipedia</a>
        </div>
      </div>`;
    }).join('');

    resultsBody.innerHTML = html;
    resultsPanel.classList.add('show');
  }

  // Search button handler
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

  /* -------------------------
     Small visual behaviors / accessibility
     ------------------------- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(r => observer.observe(r));

  /* -------------------------
     Keyboard: Enter triggers search when selects are focused
     ------------------------- */
  document.getElementById('search-city').addEventListener('keydown', (e)=>{ if(e.key==='Enter') btn.click(); });
  document.getElementById('search-cat').addEventListener('keydown', (e)=>{ if(e.key==='Enter') btn.click(); });
  document.getElementById('search-profile').addEventListener('keydown', (e)=>{ if(e.key==='Enter') btn.click(); });

});