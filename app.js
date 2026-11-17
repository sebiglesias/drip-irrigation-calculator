
function init() {
  ['rowLen', 'rowCount', 'plantSpacing', 'emitterGph'].forEach(id => {
    document.getElementById(id).addEventListener('change', calc);
    document.getElementById(id).addEventListener('input', calc);
  });
  calc();
}

function calc() {
  const len = parseFloat(document.getElementById('rowLen').value)||30;
  const rows = parseFloat(document.getElementById('rowCount').value)||4;
  const spacingIn = parseFloat(document.getElementById('plantSpacing').value)||18;
  const gph = parseFloat(document.getElementById('emitterGph').value)||1.0;

  const plantsPerRow = Math.floor((len * 12) / spacingIn);
  const totalEmitters = plantsPerRow * rows;
  const totalGph = totalEmitters * gph;

  // Mainline: rows * len + header manifold
  const mainline = (rows * len) + (rows * 5);
  const micro = totalEmitters * 1; // 1 ft per plant feeder

  let capText = "Well Within Max 220 GPH Zone Limit (Single Faucet Safe)";
  if (totalGph > 220) {
    capText = "Exceeds 220 GPH! Split garden into 2 separate automated zones.";
  }

  document.getElementById('totalGph').textContent = Math.round(totalGph);
  document.getElementById('zoneCapacity').textContent = capText;
  document.getElementById('emitterCount').textContent = `${totalEmitters} Emitters`;
  document.getElementById('mainlineFt').textContent = `${Math.round(mainline)} ft`;
  document.getElementById('microTubing').textContent = `≈ ${micro} ft (1/4" Line)`;
}
window.addEventListener('DOMContentLoaded', init);
