console.log("hello word");

function message() {
    // let answer = confirm("helo");
    // console.log(window.Notification.permission)

    // console.log(window.myAPI)
    // let notify = new window.Notification("K-notify", {
    //     body: "onePiece"
    // })
    // notify.onclose = (close) => {
    //     console.log("close -----", close)
    // }
    // notify.onclick = (event) => {
    //     event.preventDefault(); // prevent the browser from focusing the Notification's tab
    //     window.open("http://www.mozilla.org", "_blank");
    // }
    // window.document.body.insertAdjacentHTML('beforeend', `<br> <h2 style="color:${answer ? 'green' : 'red'};">the answer ${answer}</h2>`)
    setTimeout(() => {
        electron.send({ t: "test", b: 'shilpa' })
        // electron.openFile()
    }, 3000)
}


document.getElementById("msg").addEventListener('click', message)
document.getElementById("openUrl").addEventListener('click', () => electron.openUrl('openUrl'))


const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${electron.chrome()}), Node.js (v${electron.node()}), and Electron (v${electron.electron()})`