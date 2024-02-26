let date = new Date();
let selectDate;
let sum = 0;
let calendar = document.querySelector('.calendar');
let calMain = document.querySelector('.cal_main');
let calYearMonth = document.querySelector('.cal_year_month');
let calTodayBtn = document.querySelector('.cal_today_btn');
let calNav = document.querySelector('.cal_nav');
let calTodo = document.querySelector('.cal_todo');

let listBar = document.querySelector('.list_bar');

function renderCalendar() {
    
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth(); // 왜 여기서 +1 한거랑 ${viewMonth + 1} 한거랑 차이가 있지

    document.querySelector('.cal_year_month').textContent = `${viewYear}年  ${(viewMonth + 1) < 10 ? '0' + (viewMonth + 1) : viewMonth + 1}月`;

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
            dates[i] = `<div class="date"><span class=${condition}>&nbsp;${date}</span></div>`;
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
        date.addEventListener('click', toDO);
    });

    function toDO() {
        let todoModal = document.querySelector('.to_do');
        todoModal.style.display = todoModal.style.display === "none" ? "block" : "none";

        // 캘린더와 캘린더의 하위 요소들의 스타일 설정
        if (todoModal.style.display === "none") {
            calendar.style.width = "1669px";
            calMain.style.width = "1300px";
            calMain.style.margin = "0 0 0 120px";
            calYearMonth.style.margin = "0 260px";
            calTodayBtn.style.marginLeft = "223px";
            calNav.style.margin = "51px 55px 81px 361px";
        } else {
            calendar.style.width = "767px";
            calMain.style.width = "700px";
            calMain.style.marginRight = "50px";
            calYearMonth.style.margin = "0 60px 0 74px";
            calTodayBtn.style.marginLeft = "20px";
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
            if (parseInt(curDays[i].innerText) === today.getDate()) {
                curDays[i].classList.add('current-date');

                break;
            }
        }
    }

    let DateList = document.querySelectorAll('.date');
        
    DateList.forEach(function(date) {
        date.addEventListener('click', function(){      
            listBar.style.width = "0px"; 
            sum = 0;
            selectDate = String(viewYear) + String(viewMonth + 1) + date.innerText;
            getData(selectDate, date);
        });       
    });

    function getData(selectDate, date) {
        fetch(`http://localhost:3000/data?date=${selectDate}`) 
        .then(response => response.json())
        .then(json => {
            const h = [];
            for(const data of json) {
                let todoWithButton = `
                <div class="container" data-id="${data.id}" data-date="${data.date}">
                    <div class="task" data-bool="${data.bool}">${data.todo}</div>
                    <span class="del_btn">❌</span>
                </div>`;

                h.push(todoWithButton);
            }

            document.querySelector('.result').innerHTML = h.join("");
            let hLength = h.length;

            let a;

            if (json.length > 0) {
                date.style.background = "red";
            } else {
                date.style.background = "white";
            }

            if (hLength !== 0) {
                a = Math.floor(100 / hLength);
            }

            let taskAll = document.querySelectorAll('.task');
            taskAll.forEach(function(task) {
                task.addEventListener('click', function(event) {
                    let bool = event.target.dataset.bool
                    console.log("그냥입니당"+selectDate);

          
                        // 스타일 변경하기
                        if (bool === 'false') {
                            task.style.color = "black";
                            task.style.textDecoration = "none";

                            task.dataset.bool = true;

                            sum -=  a
                            listBar.style.width = `${sum}px`;
                        } else {
                            task.style.color = "gray";
                            task.style.textDecoration = "line-through";

                            sum += a; 
                            listBar.style.width = `${sum}px`;
                            listBar.style.height = "50px";
                            listBar.style.background = "blue";

                            task.dataset.bool = false;
                        }
                });
            });

            let containers = document.querySelectorAll('.container');
            let taskList = document.querySelector(".result");
            
            // drag & drop
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
            
            document.querySelector('.result').addEventListener('click', function(event) {     // 근데 왜 document.querySelector('.delButton')은 안될까
                // fetch는 비동기 함수
                if (event.target.classList.contains('del_btn')) {
                let targetId = event.target.parentNode.dataset.id;   //parentNode이거랑 parentElement 차이가 
    
                    fetch(`http://localhost:3000/data/${targetId}`, {
                        method: "DELETE",
                    })
                    .then(response => response.json())
                    .then(json => console.log(json))

                    event.target.parentNode.remove();
                }
            });
        });
    } 


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
    let delButton = document.createElement('span');
    delButton.innerHTML = "❌";
    delButton.classList.add('del_btn');

    // 삭제 버튼에 이벤트 리스너 추가
    delButton.addEventListener('click', function() {
        delButton.parentNode.remove(); // 이벤트가 발생한 요소의 부모 노드를 삭제하여 버튼을 삭제합니다.
    });

    return delButton;
}

    function createClearButton(selectDate) {
        let task = document.createElement("p");       
        task.innerHTML = addValueInput.value;
        task.classList.add('task');

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
        .then(json => console.log(json));

        task.addEventListener('click', function() {
            // 현재 스타일 가져오기
            let currentColor = task.style.color;
            let currentTextDecoration = task.style.textDecoration;
        
            // 스타일 변경하기
            if (currentColor === "gray" && currentTextDecoration === "line-through") {
                task.style.color = "black";
                task.style.textDecoration = "none";
            } else {
                task.style.color = "gray";
                task.style.textDecoration = "line-through";
            }
        });

        return task;
    }

// 삭제 경우에는 이벤트 핸들러가 등록되는 시점에서 해당 요소가 존재하지 않을 때 
function addTask() {
    if (addValueInput.value === "") {
        alert("내용 입력 하삼");
    } else if (taskElements.length < 10) {
        let container = document.createElement("div");
        container.classList.add('container');

        let task = createClearButton(selectDate);
        container.appendChild(task); // 추가된 할일에 할일 리스트 추가하기 
        
        let delButton = createDeleteButton(); // 삭제 버튼 생성
        container.appendChild(delButton); // 삭제 버튼을 container에 추가
        
        taskList.appendChild(container);
        addValueInput.value = "";
    } else {
        alert("10개 이하 등록해야함");
        addValueInput.value = "";
    }
}

