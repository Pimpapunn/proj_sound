



function sendmessage() {
    const msg = document.getElementById("msg").value
    console.log(msg)
    axios.get('/sss/api/sendmessage/' + msg)
}