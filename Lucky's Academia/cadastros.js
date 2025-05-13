    // Set max date for dob to today (user must be born today or before)
    const dobInput = document.getElementById('dob');
    dobInput.max = new Date().toISOString().split('T')[0];

    const form = document.getElementById('signup-form');

    // Error elements
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const dobError = document.getElementById('dob-error');
    const genderError = document.getElementById('gender-error');

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Clear all errors
      emailError.textContent = '';
      passwordError.textContent = '';
      confirmPasswordError.textContent = '';
      dobError.textContent = '';
      genderError.textContent = '';

      let isValid = true;

      const email = form.email.value.trim();
      const password = form.password.value;
      const confirmPassword = form['confirm-password'].value;
      const dob = form.dob.value;
      const gender = form.gender.value;

      // Email validation
      if (!email || !validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      // Password validation
      if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        isValid = false;
      }

      // Confirm password validation
      if (confirmPassword !== password) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        isValid = false;
      }

      // Date of birth validation
      if (!dob) {
        dobError.textContent = 'Please enter your date of birth.';
        isValid = false;
      } else {
        const dobDate = new Date(dob);
        const today = new Date();
        if (dobDate > today) {
          dobError.textContent = "Your date of birth can't be in the future.";
          isValid = false;
        }
      }

      // Gender validation
      if (!gender) {
        genderError.textContent = 'Please select your gender.';
        isValid = false;
      }

      if (!isValid) {
        // Focus first error field for accessibility
        const firstErrorField = form.querySelector('.error-message:not(:empty)');
        if (firstErrorField) {
          const inputId = firstErrorField.id.replace('-error', '');
          const inputToFocus = form.querySelector(`#${inputId}`);
          if (inputToFocus) {
            inputToFocus.focus();
          }
        }
        return;
      }

      // On successful validation
      alert('🎉 Sign up successful! Welcome to Spotify.');
      form.reset();
    });

    function validateEmail(email) {
      // basic regex for email validation
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email.toLowerCase());
    }