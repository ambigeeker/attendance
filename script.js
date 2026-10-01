const form = document.getElementById('attendance_form');
const recordsBody = document.getElementById('records_body');
const exportBtn = document.getElementById('export_btn');
const clearBtn = document.getElementById('clear_btn');

// Render stored records into the table
function renderRecords() {
    const records = JSON.parse(localStorage.getItem('attendance_records')) || [];
    recordsBody.innerHTML = '';

    if (records.length === 0) {
        recordsBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">No attendance records logged yet.</td>
            </tr>
        `;
        return;
    }

    // Display latest entries first
    [...records].reverse().forEach(record => {
        const tr = document.createElement('tr');
        const badgeClass = record.action === 'Check-In' ? 'badge-checkin' : 'badge-checkout';

        tr.innerHTML = `
            <td>${record.timestamp}</td>
            <td><strong>${record.name}</strong></td>
            <td>${record.designation}</td>
            <td>${record.department}</td>
            <td>${record.section}</td>
            <td><span class="badge ${badgeClass}">${record.action}</span></td>
        `;
        recordsBody.appendChild(tr);
    });
}

// Handle attendance submission
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const newRecord = {
        timestamp: new Date().toLocaleString(),
        name: document.getElementById('employee_name').value.trim(),
        designation: document.getElementById('designation').value.trim(),
        department: document.getElementById('department').value.trim(),
        section: document.getElementById('section').value.trim(),
        action: document.getElementById('action_type').value
    };

    const records = JSON.parse(localStorage.getItem('attendance_records')) || [];
    records.push(newRecord);
    localStorage.setItem('attendance_records', JSON.stringify(records));

    form.reset();
    renderRecords();
    alert('Attendance logged successfully! ✅');
});

// Export to CSV
exportBtn.addEventListener('click', function () {
    const records = JSON.parse(localStorage.getItem('attendance_records')) || [];

    if (records.length === 0) {
        alert('No attendance records available to export.');
        return;
    }

    const headers = ['Timestamp', 'Full Name', 'Designation', 'Department', 'Section', 'Action'];
    const rows = records.map(r => [
        `"${r.timestamp}"`,
        `"${r.name}"`,
        `"${r.designation}"`,
        `"${r.department}"`,
        `"${r.section}"`,
        `"${r.action}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute('download', 'attendance_log.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Clear records
clearBtn.addEventListener('click', function () {
    const records = JSON.parse(localStorage.getItem('attendance_records')) || [];
    if (records.length === 0) return;

    if (confirm('Are you sure you want to clear all stored attendance records?')) {
        localStorage.removeItem('attendance_records');
        renderRecords();
    }
});

// Initial load
document.addEventListener('DOMContentLoaded', renderRecords);