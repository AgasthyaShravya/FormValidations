document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from refreshing the page
    
    // Get input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;
    
    // Validate email must end with @gmail.com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        alert("Email must be a valid @gmail.com address.");
        return; // Exit without submitting
    }
    
    // Validate password must contain at least 8 characters, 1 uppercase letter, 1 special character, and 1 number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.");
        return; // Exit without submitting
    }
    
    // Validate DOB (Age between 18 and 55)
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const month = today.getMonth() - dobDate.getMonth();
    const day = today.getDate() - dobDate.getDate();
    
    if (month < 0 || (month === 0 && day < 0)) {
        age--;
    }
    
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return; // Exit without submitting
    }
    
    // Store form data in local storage
    const formData = { name, email, password, dob, termsAccepted };
    localStorage.setItem('formData', JSON.stringify(formData));
    
    // Update table with form data
    updateTable();
    
    alert("Form submitted successfully!");
});

function updateTable() {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    
    if (savedData) {
        const tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = ''; // Clear previous rows
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${savedData.name}</td>
            <td>${savedData.email}</td>
            <td>${savedData.password}</td>
            <td>${savedData.dob}</td>
            <td>${savedData.termsAccepted ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(newRow);
    }
}

// On page load, populate table if data exists
window.onload = function () {
    updateTable();
};
