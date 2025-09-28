

document.getElementById('patientsLogin').addEventListener('submit', (e)=> {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  
  const patientLogin = {
        email: email,
        password: password
    }

    fetch('https://testapi-touo.onrender.com/api/auth/login', {
    method: "POST",
    headers: { "Content-Type": "application/json" },   
    body: JSON.stringify(patientLogin)
  })
  .then(res => res.json())
  .then(data => {
    if(data.token){
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user._id); 
            localStorage.setItem('patientName', data.user.name);
            alert(data.message);
            window.location.href = '/pages/patientDashboard.html';
        } else {
            alert(data.message);
        }
  }) .catch(error => console.log(error));

})