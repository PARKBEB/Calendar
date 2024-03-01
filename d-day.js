let modal = document.querySelector('.dday_popup');
let addButton = document.querySelector('.dday_btn');
let dday = document.querySelector('.dday');
let ddayTextInput = document.querySelector('.dday_text');
let ddayDateInput = document.querySelector('.dday_date');
let btn1 = document.querySelector('.btn1');
let btn2 = document.querySelector('.btn2');
let ddayResult = document.querySelector('.dday_result');
let ddayInfo = document.querySelector('.dday_info');
let dim = document.querySelector('.dim')

// 날짜 추출
let today = new Date();

function insertDday() {
    modal.style.display = "flex";
    dim.style.display = "block";
    document.querySelector('.dday_text').value = "";
    document.querySelector('.dday_date').value = "";
    btn2.style.display = "none";
    btn1.style.display = "block";
}

function insertDdayOk() {
    ddayTextInput = document.querySelector('.dday_text').value; // input태그는 value로 값을 가져옴
    ddayDateInput = document.querySelector('.dday_date').value;
    let date_insert = new Date(ddayDateInput);
    dim.style.display = "none";

    // date_insert가 Tue Feb 06 2024 17:36:07 GMT+0900 (한국 표준시) 시간이 9시로 고정되서 표현되서 아래 써줘여함
    date_insert.setHours(today.getHours());
    date_insert.setMinutes(today.getMinutes());
    date_insert.setSeconds(today.getSeconds());
    date_insert.setMilliseconds(today.getMilliseconds());

    let differenceInDays = Math.floor((date_insert - today) / (24 * 60 * 60 * 1000));

    if (ddayTextInput === "") {
        alert("목표를 입력해주세요");
    } else if (ddayDateInput === "") {
        alert("오늘 이후에 날짜를 입력해주세요");
        document.querySelector('.dday_text').value = "";
        document.querySelector('.dday_date').value = "";
        modal.style.display = "flex";
    } else if (differenceInDays == 0) {
        ddayResult.innerText = ddayTextInput + " " + "🎊D-DAY!🎊";
        modal.style.display = "none";
        addButton.style.display= "none";
        ddayInfo.innerText = ""
        dday.style.display = "block";
    } else if (differenceInDays < 0) {
        differenceInDays = -differenceInDays;
        ddayResult.innerText = ddayTextInput + " " + "D+" + differenceInDays;
        ddayInfo.innerText = "❗日付が過ぎました";
        modal.style.display = "none";
        addButton.style.display= "none";
        dday.style.display = "block";
    } else {
        ddayResult.innerText = ddayTextInput + " " + "D-" + differenceInDays;
        dday.style.display = "block";
        ddayInfo.innerText = "";
        modal.style.display = "none";
        addButton.style.display= "none";
    }
}

function insertDdayCancel() {
    modal.style.display = "none";
    addButton.style.display = "block";
    dim.style.display = "none";
}

function deleteDday() {
    addButton.style.display = "block";
    dday.innerText = "";
    modal.style.display = "none";
    ddayTextInput = "";
    ddayDateInput = "";
    dim.style.display = "none";
}

function changeDday() {
    modal.style.display = "flex";
    btn2.style.display = "block";
    btn1.style.display = "none";
    dim.style.display = "block";
}