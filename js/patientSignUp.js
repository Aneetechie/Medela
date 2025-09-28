document.getElementById('patientSignup').addEventListener('submit', (e)=>{
    e.preventDefault();

    const name = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const type_surgery = document.getElementById('surgeryName').value.trim();
    const date_surgery = document.getElementById('surgeryDate').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
  

    if (name === '' || email === '' || password === '' || type_surgery === '' || date_surgery === '' || confirmPassword === '') {
        alert('input all fields');
        return;
    }

    document.getElementById('passwordError2').textContent = '';
    document.getElementById('passwordError').textContent = '';

    if (password !== confirmPassword) {
        document.getElementById('passwordError2').textContent = `passwords don't match`;
        return;
    } 

    if (password.length < 6) {
        document.getElementById('passwordError').textContent = `passwords must be atleast 6 characters`;
        return;
    } 

const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get('doctorId');
const doctorName = urlParams.get('doctorName');

    fetch('https://testapi-touo.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password, type_surgery, date_surgery})
    }).then(response => response.json())
    .then(patientSignup => {
    if (!patientSignup.success) {  
        if (patientSignup.user) {
            localStorage.setItem('userId', patientSignup.user._id);
            localStorage.setItem('patientName', patientSignup.user.name);
        }

        if (doctorId) localStorage.setItem('doctorId', doctorId);
            if (doctorName) localStorage.setItem('doctorName', doctorName);

        alert(patientSignup.message);
        window.location.href = '/pages/patientLogin.html';
        } else{
            alert(patientSignup.message)
        }
    }).catch(error => console.log(error))
})