document.getElementById('doctorSignUp').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  if (name === '' || email === '' || password === '') {
    alert('Please fill in all fields');
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

  const newDoctor = {
    name: name,
    email: email,
    password: password
  }

  fetch('https://testapi-touo.onrender.com/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newDoctor)
  })
    .then(response => response.json())
    .then(data => {      
      if (!data.ok) {
        alert('Signup successful!');
        window.location.href = '/pages/doctorLogin.html';
      } else {
        alert(data.message || 'Signup failed');
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
      alert('An error occurred. Please try again.');
    });
});

