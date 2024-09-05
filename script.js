document.addEventListener('DOMContentLoaded', (event) => {
  const loginText = document.querySelector('.title-text .login');
  const loginForm = document.querySelector('form.login');
  const signupForm = document.querySelector('form.signup');
  const loginBtn = document.querySelector('label.login');
  const signupBtn = document.querySelector('label.signup');
  const signupLink = document.querySelector('.signup-link a');
  const loginRadioBtn = document.getElementById('login');

  let registeredEmail = "";
  let registeredPassword = "";

  // Switch to Signup form
  signupBtn.onclick = (() => {
    loginForm.style.marginLeft = '-50%';
    loginText.style.marginLeft = '-50%';
  });

  // Switch to Login form
  loginBtn.onclick = (() => {
    loginForm.style.marginLeft = '0%';
    loginText.style.marginLeft = '0%';
  });

  // Handle signup link click to switch form
  signupLink.onclick = (e => {
    e.preventDefault();
    signupBtn.click();
  });

  // Handle Signup Form Submission
  signupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = signupForm.querySelector('input[placeholder="Email Address"]').value;
    const password = signupForm.querySelector('input[placeholder="Password"]').value;
    const confirmPassword = signupForm.querySelector('input[placeholder="Confirm password"]').value;

    if (email && password && password === confirmPassword) {
      alert("Signup successful! You can now log in.");

      // Store signup information
      registeredEmail = email;
      registeredPassword = password;

      // Switch to Login form
      loginRadioBtn.checked = true;
      loginForm.style.marginLeft = '0%';
      loginText.style.marginLeft = '0%';
    } else {
      alert("Please fill out all fields and ensure passwords match.");
    }
  });

  // Handle Login Form Submission
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = loginForm.querySelector('input[placeholder="Email Address"]').value;
    const password = loginForm.querySelector('input[placeholder="Password"]').value;

    if (email !== registeredEmail) {
      alert("Invalid email!");
    } else if (password !== registeredPassword) {
      alert("Incorrect password!");
    } else {
      alert("Login successful!");

      // Redirect to index.html upon successful login
      window.location.href = "index.html";
    }
  });
});
