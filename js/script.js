const API_URL = 'https://api.corona-zahlen.org/districts/';
const GEMEINDESCHLUESSEL = Object.freeze({
  olb: '03403',
  whv: '03405',
});

const updateFields = async () => {
  for (const [key, value] of Object.entries(GEMEINDESCHLUESSEL)) {
    const data = await (await fetch(API_URL + value)).json();
    document.querySelector(`#${key}`).innerHTML = data.data[
      value
    ].weekIncidence.toFixed(2);
    console.log(`#${key}-date`);
    document.querySelector(`#${key}-date`).innerHTML = new Date(
      data.meta.lastUpdate
    )
      .toLocaleString('de')
      .replace(',', '');
  }
};

updateFields();
