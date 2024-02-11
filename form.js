document.addEventListener("DOMContentLoaded", function() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => document.getElementById('navbar').innerHTML = data);

    // Accessing elements
    const medInfoYes = document.getElementById('medinfo_yes');
    const medInfoNo = document.getElementById('medinfo_no');
    const medicalConditions = document.querySelectorAll('.medicalConditions1 input, .medicalConditions2 input, .medicalConditions3 input');
    const otherCheckbox = document.getElementById('othersCheckbox');
    const otherTextInput = document.getElementById('other_medinfo');
    const otherCheckbox2 = document.getElementById('other');
    const otherTextInput2 = document.getElementById('other_medinfo2');
    const foodTextInput = document.getElementById('food');
    const noKnownAllergiesTextInput = document.getElementById('NoKnownAllergies');
    const medicines = document.querySelectorAll('.medicine1 input, .medicine2 input, .medicine3 input');
    const studentNumberInput = document.getElementById('studno');
    const schoolYearInput = document.getElementById('schoolyear');

    // Enable all medical condition checkboxes by default
    medicalConditions.forEach(condition => condition.disabled = true);

    // Disable Others text input and checkbox by default
    otherCheckbox.disabled = true;
    otherTextInput.disabled = true;

    // Adding event listener to medInfoYes and medInfoNo
    medInfoYes.addEventListener('change', function() {
        toggleMedicalConditions(this.checked);
    });

    medInfoNo.addEventListener('change', function() {
        toggleMedicalConditions(!this.checked);
        if (!this.checked) {
            // Clear all checkboxes
            medicalConditions.forEach(condition => condition.checked = false);
            medicines.forEach(medicine => medicine.checked = false);
            otherCheckbox.checked = false;
            otherTextInput.value = '';
        }
    });

    // Adding event listener to Others checkbox
    otherCheckbox.addEventListener('change', function() {
        otherTextInput.disabled = !this.checked;
        otherTextInput.required = this.checked;
        toggleMedicinesTextInput(); // call the function to toggle medicines text input
    });

    // Adding event listener to medicines checkboxes
    medicines.forEach(medicine => {
        medicine.addEventListener('change', function() {
            toggleMedicinesTextInput();
        });
    });

    // Function to toggle medical conditions
    function toggleMedicalConditions(enabled) {
        medicalConditions.forEach(function(condition) {
            condition.disabled = !enabled;
            condition.required = enabled && condition.checked;
        });
        otherCheckbox.disabled = !enabled;
        if (!enabled) {
            otherCheckbox.checked = false;
            otherTextInput.disabled = true;
            otherTextInput.required = false;
        }
        else {
            // Enable Others checkbox if Yes is checked
            otherCheckbox.disabled = false;
        }
    }

    // Function to toggle medicines text input
    function toggleMedicinesTextInput() {
        const othersChecked = otherCheckbox.checked;
        const anyMedicineChecked = Array.from(medicines).some(medicine => medicine.checked);
        medicines.forEach(medicine => {
            medicine.required = othersChecked && !anyMedicineChecked;
        });
        otherTextInput.disabled = !othersChecked;
        otherTextInput.required = othersChecked; // Set required attribute based on whether Others is checked
    }

    // Function to handle form submission
    function submitForm(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        
        // Fetch the form data
        const formData = new FormData(event.target);

        // Validate Student Number field
        const studentNumberValue = studentNumberInput.value;
        if (!/\d/.test(studentNumberValue)) {
            alert("Student number must contain at least one number.");
            return;
        }

        // Validate School Year field
        const schoolYearValue = schoolYearInput.value;
        if (!/^\d{4}-\d{4}$/.test(schoolYearValue)) {
            alert("School year must be in the format YYYY-YYYY and consist of numbers only.");
            return;
        }

        // Validate No Known Allergies field
        const noKnownAllergiesValue = formData.get('NoKnownAllergies').toLowerCase();
        if (noKnownAllergiesValue !== 'yes' && noKnownAllergiesValue !== 'no') {
            alert("Please enter 'Yes' or 'No' for No Known Allergies.");
            return;
        }

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
});
