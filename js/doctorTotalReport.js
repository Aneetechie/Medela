window.addEventListener('DOMContentLoaded', ()=>{
    const token = localStorage.getItem('token');

    if (!token) {
        console.log('no user logged in')
        return null;
    }

    fetch('https://testapi-touo.onrender.com/api/auth/profile', {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
    }).then(response => {
        if (!response.ok) {
           alert(response.status) 
        }
        return response.json()
    }).then(data => {
        console.log(data);

        const reportHeader = document.getElementById('reportHeader');
        if (reportHeader) {
            reportHeader.insertAdjacentHTML('beforeend', `
                <div class="d-flex align-items-center">
        <a href="/pages/doctorDashboard.html" class="btn btn-light rounded-circle me-3">
          <i class="bi bi-arrow-left"></i>
        </a>
        <h1 class="flex-grow-1 text-center h5 fw-bold mb-0">${data.name}'s Reports</h1>
        <div class="w-25"></div>
      </div>`);
        }

        const patientAbout = document.getElementById('patientAbout');
        if (patientAbout) {
            patientAbout.insertAdjacentHTML('beforeend', `
                <div class="d-flex gap-3 align-items-start p-3 shadow rounded">
          <div class="profile-img" style="background-image:url('https://lh3.googleusercontent.com/aida-public/AB6AXuBa4MQIxKWUFXoGXneCLY6fnbW9wghPztDoGuHzRVnGvCbyFoiTGNir9gr90dZu51kPb5ilJMaED1IJsSWcwLZqCcRe4VKMf6IQJ8ivHB1Z32ZYd_j7TOxoYWCIZCN-5_dAXzzP_mPgPuSShu2tsGkYX6L0_AFGqjaumDvpUrHHgsjICF00l6cC_lga-EvFdmXTM__yAYIidxmLyxXXjbz_Kgx9OJ1KYhvoDuRLbrvMsNoNOti6sit9EljOd131k5cpdGv6YE5xQTc');"></div>
          <div>
            <p class="fw-bold mb-1">${data.name}</p>
            <p class="mb-0 small text-muted">Surgery: ${data.type_surgery}</p>
            <p class="mb-0 small text-muted">Date: ${data.date_surgery}</p>
          </div>
        </div>`);
        }

    }).catch(error => {
    console.error('Error fetching user profile:', error);
    alert('Failed to load profile. Please check your connection or login again.');
  });

})





const reportCards = document.getElementById('reportCards');

    function displayResponseCard(data) {
      const col = document.createElement('div');
  col.className = 'col';

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
      reportCards.appendChild(col);
    }

    function loadReports() {
      const savedReports = JSON.parse(localStorage.getItem('recoveryReports')) || [];
      reportCards.innerHTML = ''; 

      if (savedReports.length === 0) {
        reportCards.innerHTML = '<p>No reports submitted yet.</p>';
        return;
      }

      savedReports.forEach(report => displayResponseCard(report));
    }

    window.addEventListener('DOMContentLoaded', loadReports);

