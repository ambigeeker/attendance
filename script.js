const form = document.getElementById('attendance_form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // 1. Gather values from form inputs
    const newRecord = {
        timestamp: new Date().toLocaleString(),
        name: document.getElementById('employee_name').value.trim(),
        designation: document.getElementById('designation').value.trim(),
        department: document.getElementById('department').value.trim(),
        section: document.getElementById('section').value.trim(),
        action: document.getElementById('action_type').value
    };

    try {
        // 2. Retrieve existing records from browser storage (or initialize an empty list)
        const storedRecords = JSON.parse(localStorage.getItem('attendance_records')) || [];

        // 3. Append the new record and save back to localStorage
        storedRecords.push(newRecord);
        localStorage.setItem('attendance_records', JSON.stringify(storedRecords));

        // 4. Reset form fields and provide feedback
        form.reset();
        alert('Attendance logged successfully! ✅');
        console.log('Saved records:', storedRecords);

    } catch (error) {
        console.error('Storage error:', error);
        alert('Failed to save record to local storage.');
    }
});
