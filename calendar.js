let date = new Date();

function renderCalendar() {
    
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    document.querySelector('.cal_year_month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    const preLast = new Date(viewYear, viewMonth, 0);      // 현재 월의 마지막 날
    const thisLast = new Date(viewYear, viewMonth + 1, 0); // 이전 월의 마지막 날

    const PLDate = preLast.getDate();  // 이전 월의 마지막 날짜
    const PLDay = preLast.getDay();    // 이전 월의 마지막 요일

    const TLDate = thisLast.getDate(); // 현재 월의 마지막 날짜
    const TLDay = thisLast.getDay();   // 현재 월의 마지막 요일

    const preDates = [];
    // spread operator = 펼침연산자 = ...를 사용하면 괄호가 제거되어출력됨
    //Array(TLDate + 1)은 JavaScript에서는 undefined로 채워진 길이가 (TLDate + 1)인 배열을 만들어짐. 이 배열은 그 후에 .keys() 메서드와 전개 연산자 ...를 사용하여 배열의 인덱스를 생성하고, .slice(1)을 통해 첫 번째 원소를 제외한 배열을 얻게 됨
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    // 날짜 추가
    // 왜 6이냐면 토요일과 같아지면 해당 달력 첫 주는 이전 달로만 기입되버림
    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            preDates.unshift(PLDate - i);
        }
    }

    // i를 배열에 추가하는 이유는 담달은 무조건 1일부터 ++ 되기떄문에 
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    let dates = preDates.concat(thisDates, nextDates);
    let firstDateIndex = dates.indexOf(1);
    let lastDateIndex = dates.lastIndexOf(TLDate);

    // date: 현재요소 / i: 인덱스
    // 예) [30, 31, 32]라는 배열이 있을때 date: 30 / i: 0
    dates.forEach(function(date, i) {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
                          ? 'this'
                          : 'other';
        dates[i] = `<div class="date"><span class=${condition}>${date}</span></div>`;
    });

    // join('') 쓰면은 dates 사이에 아무 것도 없음
    document.querySelector('.dates').innerHTML = dates.join('');

    const today = new Date();

    // 이벤트 리스너를 각 .date 요소에 추가
    let toDoDate = document.querySelectorAll('.date');
    toDoDate.forEach(function(date) {
        date.addEventListener('click', toDO);
    });

    function toDO() {
        let todoModal = document.querySelector('.to_do');
        todoModal.style.display = "block";
    }

    // today 날짜 색깔 표시
    let curDays = document.querySelectorAll('.date');

    curDays.forEach(function(date, i) {
        curDays[i] = date.innerText;

    });

    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let i = 0; i < dates.length; i++) {
            if (parseInt(curDays[i].innerText) === today.getDate()) {
                curDays[i].classList.add('current-date');

                break;
            }
        }
    } 

    // d-day 표시
    // let dDate = document.querySelector('.d_day_date').value;
    // console.log(dDate);
    // let dDate2 = new Date(dDate).getDate();
    // console.log(dDate2);

    // for (let i = 0; i < dates.length; i++) {
    //     if (parseInt(curDays[i].innerText) === dDate2) {
    //         curDays[i].classList.add('.d_day_date2');

    //         break;
    //     }
    // }
}

renderCalendar();
 
function previousCal() {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
}

function nextCal() {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
}

function todayCal() {
    date = new Date();
    renderCalendar();
}

let addValueInput = document.querySelector(".addValue");
let taskList = document.querySelector(".result");
let taskElements = taskList.getElementsByTagName("p");

// 이벤트 핸들러가 등록되는 시점은 JavaScript 코드에서 해당 이벤트 리스너가 추가되는 시점, 이 때 주로 이벤트 리스너를 추가하는 함수가 호출되는 시점이 됨. 만약 페이지가 로드될 때 존재하지 않는 요소에 이벤트를 추가하려면, 일반적으로 이벤트 리스너를 추가하는 JavaScript 코드가 해당 요소를 생성한 직후에 위치하도록 해야 함. 이렇게 함으로써 요소가 생성되고 이벤트가 바로 추가되므로 요소가 존재하지 않는 문제를 방지할 수 있음.
function createDeleteButton() {
    let delButton = document.createElement('button');
    delButton.innerHTML = "X";
    delButton.classList.add('del_btn');

    // 삭제 버튼에 이벤트 리스너 추가
    delButton.addEventListener('click', function() {
        delButton.parentNode.remove(); // 이벤트가 발생한 요소의 부모 노드를 삭제하여 버튼을 삭제합니다.
    });

    return delButton;
}

// 삭제 경우에는 이벤트 핸들러가 등록되는 시점에서 해당 요소가 존재하지 않을 때 
function addTask() {
    if (addValueInput.value === "") {
        alert("내용 입력 하삼");
    } else if (taskElements.length < 10) {
        let container = document.createElement("div");
        container.classList.add('container');

        let list = document.createElement("p");
        list.innerHTML = addValueInput.value;

        container.appendChild(list); // 추가된 할일에 할일 리스트 추가하기 
        let delButton = createDeleteButton(); // 삭제 버튼 생성
        container.appendChild(delButton); // 삭제 버튼을 container에 추가

        taskList.appendChild(container);
        addValueInput.value = "";
    } else {
        alert("10개 이하 등록해야함");
        addValueInput.value = "";
    }
}


