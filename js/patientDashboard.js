const token = localStorage.getItem('token');
const patientId = localStorage.getItem('userId');
const patientName = localStorage.getItem('patientName');

if (!token || !patientId) {
  window.location.href = '/pages/patientLogin.html';
}

const storageKey = `recoveryReports_${patientId}`;

const getName = localStorage.getItem('patientName');
document.getElementById('greeting').innerHTML = `Welcome, ${getName}!`;

const form = document.getElementById('questionnaire');
const reportCards = document.getElementById('reportCards');
const painRange = document.getElementById('painRange');
const painValueDisplay = document.getElementById('painValue');

painRange.addEventListener('input', () => {
  painValueDisplay.textContent = painRange.value;
});


form.addEventListener('submit', (e) => {
  e.preventDefault();

  document.activeElement?.blur();

  const responses = {
    painLevel: painRange.value,
    swelling: form.swelling.value,
    energy: form.energy_level.value,
    mood: form.mood.value,
    woundHealing: form.wound_healing.value,
    mobility: form.mobility.value,
    sleep: form.sleep_quality.value,
    recovery: form.overall_recovery.value,
    timestamp: new Date().toLocaleString()
  };

  const existing = JSON.parse(localStorage.getItem(storageKey)) || [];
  existing.unshift(responses);
  localStorage.setItem(storageKey, JSON.stringify(existing));


  displayResponseCard(responses);

  form.reset();
  painRange.value = 5;
  painValueDisplay.textContent = '5';

  try {
  document.activeElement?.blur(); // 
  const modalInstance = bootstrap.Modal.getInstance(document.getElementById('recoveryModal'));
  if (modalInstance) modalInstance.hide();
} catch (err) {
  console.error('Modal error:', err);
}



  alert('report submitted successfully!')
});

function displayResponseCard(data) {
  const col = document.createElement('div');
  col.className = 'col'; // Bootstrap column

  const card = document.createElement('div');
  card.className = 'card shadow h-100';
  card.style.backgroundColor = '#363753';
  card.style.color = 'white';
  card.style.border = '1px solid #555';

  card.innerHTML = `
    <div class="card-body">
      <div class="row g-3">
          <div class="col-md-3">
            <div class="card border-0 shadow-sm rounded-3 h-100">
              <div class="card-body text-center">
                <i class="bi bi-emoji-frown text-danger fs-3"></i>
                <h6 class="mt-2 text-muted">Pain Level</h6>
                <p class="fw-bold mt-2">${data.painLevel}/10</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card border-0 shadow-sm rounded-3 h-100">
              <div class="card-body text-center">
                <i class="bi bi-droplet text-warning fs-3"></i>
                <h6 class="mt-2 text-muted">Swelling</h6>
                <span class="badge bg-warning-subtle text-dark px-3 py-2">${data.swelling}</span>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card border-0 shadow-sm rounded-3 h-100">
              <div class="card-body text-center">
                <i class="bi bi-heart-pulse text-success fs-3"></i>
                <h6 class="mt-2 text-muted">Wound Healing</h6>
                <span class="badge bg-success-subtle text-success px-3 py-2">${data.woundHealing}</span>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card border-0 shadow-sm rounded-3 h-100">
              <div class="card-body text-center">
                <i class="bi bi-lightning-charge text-info fs-3"></i>
                <h6 class="mt-2 text-muted">Energy Level</h6>
                <span class="badge bg-info-subtle text-info px-3 py-2">${data.energy}</span>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card border-0 shadow-sm rounded-3 h-100">
              <div class="card-body text-center">
                <i class="bi bi-moon-stars text-primary fs-3"></i>
                <h6 class="mt-2 text-muted">Sleep Quality</h6>
                <p class="fw-bold mt-2">${data.sleep}</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-3">
            <div class="card border-0 data-card h-100">
              <div class="card-body text-center">
                <i class="bi bi-person-walking text-secondary fs-3"></i>
                <h6 class="mt-2 text-muted">Mobility</h6>
                <p class="fw-bold mt-2">${data.mobility}</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card border-0 shadow-sm rounded-3 h-100">
              <div class="card-body text-center">
                <i class="bi bi-emoji-smile text-success fs-3"></i>
                <h6 class="mt-2 text-muted">Mood</h6>
                <span class="badge bg-success-subtle text-success px-3 py-2">${data.mood}</span>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-3">
            <div class="card border-3 data-card h-100 shadow shadow-4 ">
              <div class="card-body text-center">
                <h6 class="mt-2 text-muted">Overall Recovery</h6>
                <p class="fw-bold mt-2">${data.recovery}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="card-footer text-muted small" style="background-color: #5cd2c6;">
      Submitted: ${data.timestamp}
    </div>
  `;

  col.appendChild(card);
  reportCards.prepend(col);
}

window.addEventListener('DOMContentLoaded', () => {
  const savedReports = JSON.parse(localStorage.getItem(storageKey)) || [];
  savedReports.reverse().forEach(report => displayResponseCard(report));
});





