const API_URL = 'https://api.corona-zahlen.org/districts/history/incidence';
const GEMEINDESCHLUESSEL = ['03403', '03405'];

const getDivTemplate = (data) => {
  console.log(`data`, data);
  return `
  <div class="inzidenz-container backdrop">
    <div class="inzidenz-container-label">${data.name}</div>
    <div class="inzidenz-container-number">${data.history[
      data.history.length - 1
    ].weekIncidence.toFixed(2)}</div>
    <span>Last 3 Days</span>
    <div class="inzidenz-container-history">
      <b>${data.history[data.history.length - 4].weekIncidence.toFixed(
        2
      )}</b> | 
      <b>${data.history[data.history.length - 3].weekIncidence.toFixed(
        2
      )}</b> | 
      <b>${data.history[data.history.length - 2].weekIncidence.toFixed(2)}</b> 
    </div>
  </div>
  `;
};

const updateFields = async () => {
  const allDistricts = await (await fetch(API_URL)).json();

  for (const key of GEMEINDESCHLUESSEL) {
    const el = document.createElement('div');
    el.innerHTML = getDivTemplate(allDistricts.data[key]);
    document.querySelector(`#main`).appendChild(el);
  }
};

updateFields();
