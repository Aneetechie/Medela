const getName = localStorage.getItem('doctorName');
document.getElementById('greeting').innerHTML = `Welcome, Dr. ${getName}!`;


window.addEventListener('DOMContentLoaded', ()=>{
    const token = localStorage.getItem('token');

if (!token) {
    alert('No token found. Please login first.');
} else {
    fetch('https://testapi-touo.onrender.com/api/auth/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Profile data:', data);

        const patientCard = document.getElementById('patientCards');
        if (patientCard && data.user) {
            patientCard.insertAdjacentHTML('beforeend', `
                <div class="col-12 col-sm-6 col-md-4">
                    <div class="card rounded-3 shadow-sm p-2" style="background-color: #363753;">
                        <div class="card-body d-flex align-items-center justify-content-between flex-wrap p-2 gap-2">
                            <img src="/assets/images/profilephoto.jpg" 
                                alt="patient photo" 
                                class="rounded-circle me-3"
                                style="width: 3rem; height: 3rem; object-fit: cover;">
                            <h5 class="card-title mb-0 flex-grow-1 text-light" style="font-size: 1rem;">
                                ${data.user.name}
                            </h5>
                            <a href="/pages/doctorTotalReport.html" 
                                class="btn btn-sm fw-semibold px-2 py-1" 
                                style="color: #5cd2c6; white-space: nowrap;">
                                View reports
                            </a>
                            <button class="btn bg-transparent p-0" 
                                data-bs-target="#deleteModal" 
                                data-bs-toggle="modal">
                                <i class="bi bi-trash-fill text-danger"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `);
        }
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
        alert('Failed to load profile. Please check your connection or login again.');
    });
}


})


const doctorName = localStorage.getItem('doctorName');
const encodedName = encodeURIComponent(doctorName);
const inviteLink = document.getElementById('inviteLink').value = `
  https://medelaapp.netlify.app/pages/invited.html?doctorName=${encodedName}`;

document.getElementById('copyBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(inviteLink)
  .then(()=> {
    alert('invite link copied...')
  })
}) 



