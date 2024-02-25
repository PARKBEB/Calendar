let modal = document.querySelector('.dday_popup');
let addButton = document.querySelector('.dday_btn');
let modifyButton = document.querySelector('.dday_btn_mod');
let deleteButton = document.querySelector('.dday_btn_del');
let dday = document.querySelector('.dday');
let ddayTextInput = document.querySelector('.dday_text');
let ddayDateInput = document.querySelector('.dday_date');

// 날짜 추출
let today = new Date();

function insertDday() {
    modal.style.display = "flex";
    addButton.style.display = "none";
    document.querySelector('.dday_text').value = "";
    document.querySelector('.dday_date').value = "";
}

function insertDdayOk() {
    addButton.style.display = "none";

    ddayTextInput = document.querySelector('.dday_text').value; // input태그는 value로 값을 가져옴
    ddayDateInput = document.querySelector('.dday_date').value;
    let date_insert = new Date(ddayDateInput);
    
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
        modal.style.display = "block";
    } else if (differenceInDays == 0) {
        dday.innerText = ddayTextInput + "🎊D-DAY!🎊";
        modal.style.display = "none";
        modifyButton.style.display = "block"
        deleteButton.style.display = "block"
    } else if (differenceInDays < 0) {
        differenceInDays = -differenceInDays;
        dday.innerText = ddayTextInput + " " + "D+" + differenceInDays + "\n 날짜가 지났습니다.";
        modal.style.display = "none";
        modifyButton.style.display = "block";
        deleteButton.style.display = "block";
    } else {
        dday.innerText = ddayTextInput + " " + "D-" + differenceInDays;
        modal.style.display = "none";
        modifyButton.style.display = "block"
        deleteButton.style.display = "block"
    }
}

function insertDdayCancel() {
    if (dday.innerText == "") {
        modal.style.display = "none";
        addButton.style.display = "block";
    } else {
        modal.style.display = "none";
        addButton.style.display = "none";
        modifyButton.style.display = "block";
        deleteButton.style.display = "block";
    }
}

function modifyDday() {
    dday.innerText = "";
    modal.style.display = "block";
    modifyButton.style.display = "none";
    deleteButton.style.display = "none";
}

function deleteDday() {
    addButton.style.display = "block";
    modifyButton.style.display = "none";
    deleteButton.style.display = "none";
    dday.innerText = "";
}