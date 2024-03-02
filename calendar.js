let calendar = document.querySelector('.calendar');
let calMain = document.querySelector('.cal_main');
let calYearMonth = document.querySelector('.cal_year_month');
let calTodayBtn = document.querySelector('.cal_today_btn');
let calNav = document.querySelector('.cal_nav');
let calTodo = document.querySelector('.calendar_todo');

let todoTitleDate = document.querySelector('.todo_title_date');
let taskList = document.querySelector(".result");
let listChk = document.querySelector(".list_chk");
let listBar = document.querySelector('.list_bar');
let listTop = document.querySelector('.list_top');
let listIcon = document.querySelector('.list_icon');
        
let date = new Date();
let selectDate;

function renderCalendar() {
    
    // 달력 생성 시작
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    calYearMonth.textContent = `${viewYear}年  ${(viewMonth + 1) < 10 ? '0' + (viewMonth + 1) : viewMonth + 1}月`;

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
        if (date < 10) {
            dates[i] = `<div class="date"><span class=${condition}>${date}</span></div>`;
        } else {
            dates[i] = `<div class="date"><span class=${condition}>${date}</span></div>`;
        }
    });

    // join('') 쓰면은 dates 사이에 아무 것도 없음
    document.querySelector('.dates').innerHTML = dates.join('');

    const today = new Date();

    // 이벤트 리스너를 각 .date 요소에 추가
    let toDoDate = document.querySelectorAll('.date');
    toDoDate.forEach(function(date) {
        let dateText = date.innerText.replace(/&nbsp;/g, '').trim(); // 한자리수는 /&nbsp;/이것땜에 공백있어서 이렇게 처리해줘야 앞에 '0'이 추가됨
        date.addEventListener('click', function(event) {
            event.preventDefault(); // 이벤트 기본 동작 중지
            if (!date.querySelector('.other')) {
                toDO(date, dateText);
            } else {
                alert("今月の日付を選択してください");
            }
        });
    });

    function toDO(date, dateText) {
        let todoModal = document.querySelector('.to_do');
        todoModal.style.display = todoModal.style.display === "none" ? "block" : "none";
        listTop.style.display = listTop.style.display === "none" ? "block" : "none";
        listIcon.style.display = listIcon.style.display === "none" ? "block" : "none";

        if (date.querySelector('.this')) {
            let month =  ("0" + String(viewMonth + 1)).slice(-2);
            let d = ("0" + dateText).slice(-2);
            todoTitleDate.innerText = `${String(viewYear)}.${month}.${d}`;
        }

        // 캘린더와 캘린더의 하위 요소들의 스타일 설정
        if (todoModal.style.display === "none") {
            calendar.style.width = "1669px";
            calMain.style.width = "1300px";
            calMain.style.margin = "0 0 0 120px";
            calYearMonth.style.margin = "0 260px";
            calTodayBtn.style.marginLeft = "223px";
            calNav.style.margin = "51px 55px 81px 361px";
            calTodo.style.justifyContent = "";
        } else {
            calendar.style.width = "767px";
            calMain.style.width = "700px";
            calMain.style.marginRight = "50px";
            calYearMonth.style.margin = "0 50px 0 74px";
            calTodayBtn.style.marginLeft = "50px";
            calNav.style.marginLeft = "70px";
            calTodo.style.justifyContent = "space-evenly";

            // 모든 .day 클래스를 가진 요소의 우측 여백 설정
            document.querySelectorAll('.day').forEach(function(day) {
                day.style.marginRight = "10px";
            });
        }
    }

    // today 날짜 색깔 표시
    let curDays = document.querySelectorAll('.date');

    curDays.forEach(function(date, i) {
        curDays[i] = date.innerText;

    });

    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let i = 0; i < dates.length; i++) {
            if (parseInt(curDays[i].innerText) === today.getDate() && curDays[i].querySelector('.this')) { // 이거 안하면 저번달 28일 이번달 28일 중 저번달 28일 표시됨
                curDays[i].classList.add('current-date');

                break;
            }
        }
    }

    let DateList = document.querySelectorAll('.date');

    var currentYear = String(viewYear);
    var currentMonth = String(String(viewMonth + 1)).padStart(2, "0");

    DateList.forEach(function(date) {
        date.addEventListener('click', function(){      
            listBar.style.width = "0px"; 
            var currentDay = String(date.innerText).padStart(2, "0");
            selectDate = currentYear + currentMonth + currentDay;
            getData(selectDate, date);
        });
    });

    var todoArray = new Array();

    // 1. 캘린더 투두 리스트 체크(캘린더에 초록색) 저장 안됨
    fetch('http://localhost:3000/data?date')
    .then(response => response.json())
    .then(json => {
        for(const data of json) {
            var dataDate = `${data.date}`;
            var dataYear = dataDate.substring(0, 4);
            var dataMonth = dataDate.substring(4, 6);
            var dataDay = dataDate.substring(6);

            if (currentYear == dataYear && currentMonth == dataMonth)
            {
                todoArray.push(dataDay);
            }
        }

        var isStarted = false;
        var isEnd = false;
        
        document.querySelectorAll('.date').forEach(function(date) {
            if (isEnd)
            {
                return;
            }

            if (date.innerText == '1')
            {
                if (isStarted)
                {
                    isEnd = true;
                }

                isStarted = true;
            }

            if (!isStarted) return;
            
            var dateDay = String(date.innerText).padStart(2, "0");

            if (todoArray.indexOf(dateDay) != -1)
            {
                date.style = "border-top: 4px solid #70947E; color: #70947E;"
            }
        });
    });
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
let taskElements = taskList.getElementsByTagName("span");

var m_falseCount = 0;

function setProgress(taskLength) {
    if (taskLength == 0)
    {
        listBar.style.width = '0%';
        listIcon.style.marginLeft = listBar.style.width;
    }
    else
    {
        var percent = 100 / taskLength * m_falseCount;
        listBar.style.width = percent + '%';
        listIcon.style.marginLeft = listBar.style.width;
        listBar.style.height = "80px";
        listBar.style.background = "#487AFA";
    }
}

function getData(selectDate, date) {
    addValueInput.value = "";

    fetch(`http://localhost:3000/data?date=${selectDate}`) 
    .then(response => response.json())
    .then(json => {
        var falseCount = 0;        

        const h = [];
        for(const data of json) {
            var htmlTask = `<div class="task" data-bool="${data.bool}">${data.todo}</div>`

            if (`${data.bool}` == 'false')
            {
                htmlTask = `<div class="task" data-bool="${data.bool}" style="color : gray; text-decoration : line-through;">${data.todo}</div>`
                falseCount++;
            }

            let todoWithButton = `
            <div class="container" data-id="${data.id}" data-date="${data.date}">
                ` + htmlTask + `
                <span class="del_btn" onclick="DeleteButton()">❌</span>
            </div>`;

            h.push(todoWithButton);
        }

        m_falseCount = falseCount;

        setProgress(json.length);

        taskList.innerHTML = h.join("");

        // todo 있는날 표시

        if (json.length === 0){
            document.querySelectorAll('.date').forEach(function(date) {
                if(date.querySelector('.this')) {
                    date.querySelector('.this').style = ""
                }
            });
        }

        let taskAll = document.querySelectorAll('.task');

        taskAll.forEach(function(task) {
            task.addEventListener('click', function(event) {
                let bool = event.target.dataset.bool;
                let taskID = event.target.parentNode.dataset.id;

                if (bool === 'false') {
                    task.style.color = "black";
                    task.style.textDecoration = "none";
                    bool = true;
                    m_falseCount--;
                } else {
                    task.style.color = "gray";
                    task.style.textDecoration = "line-through";
                    bool = false;
                    m_falseCount++;
                }

                setProgress(json.length);

                event.target.dataset.bool = bool;

                const data = {
                    "todo": event.target.innerText,
                    "date": selectDate,
                    "bool": bool,
                    //"color": task.style.color,
                    // "textDecoration": task.style.textDecoration,
                }
                fetch(`http://localhost:3000/data/${taskID}`, { // 수정할 ID값
                    method: "PUT",
                    body: JSON.stringify(data), 
                    headers: {
                        "content-type": "application/json; charset=UTF-8;"
                    }
                })
                .then(response => response.json())
            });    
        });
        
        let containers = document.querySelectorAll('.container');
        
        // drag & drop <https://inpa.tistory.com/entry/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-Drag-Drop-%EA%B8%B0%EB%8A%A5>
        containers.forEach(function(container) {
            container.setAttribute("draggable", "true");
            });
            containers.forEach(function(dragEl) {
                dragEl.addEventListener('dragstart', function() {
                    dragEl.classList.add('dragging');
                    console.log("들었다");
                });
        
                dragEl.addEventListener('dragend', function() {
                    dragEl.classList.remove('dragging');
                    console.log("놨다");
                });
            });
        
            // offset이라는 변수가 상품의 중심 위치와 드래그한 위치 사이의 거리
            function getDragAfterElement(y) {
                const draggableElements = [...taskList.querySelectorAll('.container:not(.dragging)')];
        
                return draggableElements.reduce(function(closest, child) {
                    const box = child.getBoundingClientRect();
                    const offset = y - box.top - box.height / 2;
                    if (offset < 0 && offset > closest.offset) {
                        return { offset: offset, element: child };
                    } else {
                        return closest;
                    }
                }, { offset: Number.NEGATIVE_INFINITY }).element; // 가장 작은 값의 요소
            }
        
            containers.forEach(function(container) {
                container.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    let afterElement = getDragAfterElement(e.clientY);
                    let draggable = document.querySelector('.dragging');
                    
                    taskList.insertBefore(draggable, afterElement);
                });
            });
    });
}  

function DeleteButton() {
    taskList.addEventListener('click', function(event) {  
        // fetch는 비동기 함수
        if (event.target.classList.contains('del_btn')) {
        let targetId = event.target.parentNode.dataset.id;       //parentNode이거랑 parentElement 차이가 

            fetch(`http://localhost:3000/data/${targetId}`, {
                method: "DELETE",
            })
            .then(response => response.json())
            .then(() => 
                event.target.parentNode.remove(),
                getData(selectDate)
            )
        }
    });
}

function createClearButton(selectDate) {
    let s = selectDate.slice(-2);

    const data = {
        "todo": addValueInput.value,
        "date": selectDate,
        "bool": true
    }

    fetch("http://localhost:3000/data", {
        method: "POST",
        body: JSON.stringify(data), // 전송할 데이터를 문자열로 변환
        headers: {
            "content-type": "application/json; charset=UTF-8;"
        }
    })
    .then(response => response.json())
    .then(() => {
        document.querySelectorAll('.date').forEach(function(date) {
            if(date.innerText === s && date.querySelector('.this')) {
                date.querySelector('.this').style = "border-top: 4px solid #70947E; width: 43px; color: #70947E; margin-top: -4px;"
            }
        })
        getData(selectDate);         // 매개 변수 date가 없어도 왜 되는거지?
    })
}

function addTask() {
    if (addValueInput.value === "") {
        alert("内容を入力してください");
    } else if (taskElements.length < 10) {
        createClearButton(selectDate);
    } else {
        alert("タスクを10個まで登録できます");
        addValueInput.value = "";
    }
}