let displayError = document.getElementById('emailForgotError');

document.getElementById('forgotPasswordBtn').addEventListener('click', (e)=>{
    e.preventDefault();

    const forgotEmail = document.getElementById('confirmEmail').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmNewPassword').value.trim();

    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';

       if (password.length < 6) {
        document.getElementById('passwordError').textContent = `passwords must be atleast 6 characters`;
        return;  
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = `passwords don't match`;
        return;
    } 
 


    const resetData = {
        newPassword: password,
        email: forgotEmail
    }


    
    fetch('https://testapi-touo.onrender.com/api/auth/reset-password', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(resetData)
    }).then(response => response.json().then(data => {
        data.ok = response.ok;
        return data;
    }))
    .then(email => {
        if (!email.ok) {
            alert(email.message)
            
        }else{
            alert(email.message)
            window.location.href = '/pages/patientLogin.html';
        }
    }).catch(error => console.log(error))
})