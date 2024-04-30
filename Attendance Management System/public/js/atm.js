// login.atm.js

function userRecords(event) {
    event.preventDefault();


    const name = document.getElementById('name').value;
    const userType = document.getElementById('user_type').value;
    const classValue = document.getElementById('class').value;
    const attendanceStatus = document.getElementById('attendance_status').value;
    const date = document.getElementById('date').value;


    const data = {
        name: name,
        userType: userType,
        userClass: classValue,
        attendanceStatus: attendanceStatus,
        date: date
    };

    sendData(data)



}

async function sendData(data) {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.post('/user/attendance', data, { headers: { "Authorization": token } })
        if (res.status == 200) {
            console.log(res.data.message)
            alert("record added")
        }

    } catch (err) {
        console.log('Error', err)

    }


}