// form.js

// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Fetch the form data
    const formData = new FormData(event.target);

    // Send a POST request to the form action URL
    fetch(event.target.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // If the response is successful, display a success message
            alert("Form submitted successfully!");
            // Redirect to index.html
            window.location.href = "index.html";
        } else {
            // If the response is not successful, display an error message
            alert("Error submitting form. Please try again later.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An unexpected error occurred. Please try again later.");
    });
}

// Add event listener to the form
document.getElementById('myForm').addEventListener('submit', submitForm);
