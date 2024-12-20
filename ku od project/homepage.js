        const togglePassword = document.getElementById('togglePassword');
        const passwordField = document.getElementById('passwordInput'); // Corrected ID to passwordInput

        togglePassword.addEventListener('click', () => {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
        });

        const form = document.getElementById('form');
        const emailField = document.getElementById('emailField');
        const passwordInput = document.getElementById('passwordInput'); // Corrected ID to passwordInput
        const headButton = document.getElementById('headButton');
        const adminButton = document.getElementById('adminButton');
        const hodButton = document.getElementById('hodButton');
        let selectedRole = '';

        headButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default behavior

            selectedRole = 'head';
            updateRoleButtons();
        });

        adminButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default behavior

            selectedRole = 'admin';
            updateRoleButtons();
        });

        hodButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default behavior

            selectedRole = 'hod';
            updateRoleButtons();
        });

        function updateRoleButtons() {
            headButton.classList.remove('active');
            adminButton.classList.remove('active');
            hodButton.classList.remove('active');

            if (selectedRole === 'head') {
                headButton.classList.add('active');
            } else if (selectedRole === 'admin') {
                adminButton.classList.add('active');
            } else if (selectedRole === 'hod') {
                hodButton.classList.add('active');
            }
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission for now

            let isValidCredentials = false; // Flag to track if credentials are valid

            // Perform authentication based on entered credentials and selected role
            switch (selectedRole) {
                case 'head':
                    if (emailField.value.trim() === 'head@example.com' && passwordInput.value.trim() === 'Headpass@123') {
                        window.location.href = 'welcome_head.html'; // Redirect to Head welcome page
                        isValidCredentials = true;
                    }
                    break;
                case 'admin':
                    if (emailField.value.trim() === 'admin@example.com' && passwordInput.value.trim() === 'Adminpass@123') {
                        window.location.href = 'welcome_admin.html'; // Redirect to Admin welcome page
                        isValidCredentials = true;
                    }
                    break;
                case 'hod':
                    if (emailField.value.trim() === 'hod@example.com' && passwordInput.value.trim() === 'Hodpass@123') {
                        window.location.href = 'welcome_hod.html'; // Redirect to HOD welcome page
                        isValidCredentials = true;
                    }
                    break;
                default:
                    alert('Please select a role.'); // Show alert if no role is selected
                    break;
            }

            // Display error message if credentials are invalid
            if (!isValidCredentials) {
                alert('Wrong email address or password please recheck'); // Display alert message
            }
        });

        // Event listener for password input field
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const sessionSecret = 'secure-random-string'; // Same secret used on the server

            // Encrypt the password
            const encrypted = CryptoJS.AES.encrypt(password, sessionSecret).toString();

            // Decrypt the password for testing purposes (should not be done on the client side in production)
            const decrypted = CryptoJS.AES.decrypt(encrypted, sessionSecret).toString(CryptoJS.enc.Utf8);

            // Log the encrypted and decrypted passwords
            console.log('Encrypted Password:', encrypted);
            console.log('Decrypted Password:', decrypted);
        });
