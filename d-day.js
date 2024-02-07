let d_day_popup = document.querySelector('.d_day_popup');
let d_day_btn = document.querySelector('.d_day_btn');
let d_day_btn_mod = document.querySelector('.d_day_btn_mod');
let d_day_btn_del = document.querySelector('.d_day_btn_del');
let d_day = document.querySelector('.d_day');
let d_day_text = document.querySelector('.d_day_text');
let d_day_date = document.querySelector('.d_day_date');

// 날짜 추출
let today = new Date();

function d_insert() {
    d_day_popup.style.display = "block";
    d_day_btn.style.display = "none";
    document.querySelector('.d_day_text').value = "";
    document.querySelector('.d_day_date').value = "";
}

function d_insert_ok() {
    d_day_btn.style.display = "none";

    d_day_text = document.querySelector('.d_day_text').value; // input태그는 value로 값을 가져옴
    d_day_date = document.querySelector('.d_day_date').value;
    let date_insert = new Date(d_day_date);
    
    // date_insert가 Tue Feb 06 2024 17:36:07 GMT+0900 (한국 표준시) 시간이 9시로 고정되서 표현되서 아래 써줘여함
    date_insert.setHours(today.getHours());
    date_insert.setMinutes(today.getMinutes());
    date_insert.setSeconds(today.getSeconds());
    date_insert.setMilliseconds(today.getMilliseconds());

    let differenceInDays = Math.floor((date_insert - today) / (24 * 60 * 60 * 1000));

    if (d_day_text === "") {
        alert("목표를 입력해주세요");
    } else if (d_day_date === "") {
        alert("오늘 이후에 날짜를 입력해주세요");
        document.querySelector('.d_day_text').value = "";
        document.querySelector('.d_day_date').value = "";
        d_day_popup.style.display = "block";
    } else if (differenceInDays == 0) {
        d_day.innerText = d_day_text + "🎊D-DAY!🎊";
        d_day_popup.style.display = "none";
        d_day_btn_mod.style.display = "block"
        d_day_btn_del.style.display = "block"
    } else if (differenceInDays < 0) {
        differenceInDays = -differenceInDays;
        d_day.innerText = d_day_text + " " + "D+" + differenceInDays + "\n 날짜가 지났습니다.";
        d_day_popup.style.display = "none";
        d_day_btn_mod.style.display = "block";
        d_day_btn_del.style.display = "block";
    } else {
        d_day.innerText = d_day_text + " " + "D-" + differenceInDays;
        d_day_popup.style.display = "none";
        d_day_btn_mod.style.display = "block"
        d_day_btn_del.style.display = "block"
    }
}

function d_insert_cancel() {
    if (d_day.innerText == "") {
        d_day_popup.style.display = "none";
        d_day_btn.style.display = "block";
    } else {
        d_day_popup.style.display = "none";
        d_day_btn.style.display = "none";
        d_day_btn_mod.style.display = "block";
        d_day_btn_del.style.display = "block";
    }
}

function d_modify() {
    d_day.innerText = "";
    d_day_popup.style.display = "block";
    d_day_btn_mod.style.display = "none";
    d_day_btn_del.style.display = "none";
}

function d_delete() {
    d_day_btn.style.display = "block";
    d_day_btn_mod.style.display = "none";
    d_day_btn_del.style.display = "none";
    d_day.innerText = "";
}