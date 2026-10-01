const form = document.getElementById('attendance_form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch('submit_attendance.php', {
        method: 'POST',
        body: formData
    })
    .then(async response => {
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            // Displays the exact raw server response if JSON parsing fails
            throw new Error('Server sent unexpected response:\n' + text);
        }
    })
    .then(data => {
        if (data.status === 'success') {
            form.reset();
            alert('Attendance logged successfully! ✅');
        } else {
            alert('Error: ' + (data.message || 'Unknown issue'));
        }
    })
    .catch(error => {
        console.error('Submission failed:', error);
        alert(error.message);
    });
});