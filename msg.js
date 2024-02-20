let msg_slider = document.querySelector('.msg_slider');
let msg_list = document.querySelector('.msg_list');

function msg() {
    let h = msg_list.offsetHeight;
    let x = 0;
    let speed = 22;

    function moveFirst() {
        x -= speed;
        if(h >= Math.abs(x)) {
            msg_list.style.bottom = `${x}px`;
            console.log("작동중");
            console.log(`h값입니당${h}값`);
            console.log(`바텀값입니당${msg_list.style.bottom}값`);
        } else {
            x = h;
            console.log("작동중2");
        }
    }

    setInterval(moveFirst, 1000);
}

msg();