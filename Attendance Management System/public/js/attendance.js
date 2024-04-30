console.log("hello---------------------------------------------------------")
document.addEventListener('DOMContentLoaded', function() {
    getData();
});
console.log("hello---------------------------------------------------------")

async function getData() {
    try {
        const res = await axios.get('/userattendance/alluser');
        const data = res.data;

        const recordsContainer = document.getElementById('records-container');
        recordsContainer.innerHTML = ''; // Clear previous records

        data.attendance.forEach(record => {
            const recordElement = document.createElement('div');
            recordElement.innerHTML = `
                <p><strong>Name:</strong> ${record.name}</p>
                <p><strong>User Type:</strong> ${record.userType}</p>
                <p><strong>Class:</strong> ${record.userclass}</p>
                <p><strong>Attendance Status:</strong> ${record.attendanceStatus}</p>
                <p><strong>Date:</strong> ${new Date(record.date).toLocaleDateString()}</p>
            `;
            recordsContainer.appendChild(recordElement);
        });
    } catch (err) {
        console.error('Error fetching attendance records:', err);
    }
}