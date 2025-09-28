document.getElementById('doctorLogin').addEventListener('submit', (e) => {

    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (email === '' || password === '') {
        alert('please input all fields');
        return;
    } 

    const doctorLogin = {
        email: email,
        password: password
    }

    fetch('https://testapi-touo.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(doctorLogin)
    }).then(response => response.json())
    .then(doctor => {
        if(doctor){
            alert(doctor.message);
            localStorage.setItem('doctorName', doctor.user.name)
            window.location.href = '/pages/doctorDashboard.html';
        } else {
            alert(doctor.message);
        }
    })
    .catch(error => console.log(error));
});
