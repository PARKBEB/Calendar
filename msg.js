class CircularQueue {
    constructor(items) {
        this.items = items;
        this.size = items.length;
        this.front = 0;
        this.rear = this.size - 1;
    }

    enqueue(item) {
        this.rear = (this.rear + 1) % this.size;
        this.items[this.rear] = item;
    }

    dequeue() {
        const item = this.items[this.front];
        this.front = (this.front + 1) % this.size;
        return item;
    }

    peek() {
        return this.items[this.front];
    }
}

// 메시지 슬라이더 관련 코드
const msgList = document.querySelector('.msg_list');
const msgs = msgList.querySelectorAll('.msg_item');

// 메시지 리스트를 배열로 변환
const msgArray = Array.from(msgs).map(msg => msg.innerHTML);

// CircularQueue 인스턴스 생성
const cq = new CircularQueue(msgArray);

// 메시지 표시 함수
function displayMessage() {
    const message = cq.dequeue(); // 큐에서 메시지 가져오기
    const li = document.createElement('li'); // 새 li 요소 생성
    li.classList.add('msg_item');
    li.innerHTML = `${message}`; // 메시지 내용 설정
    // console.log(li.innerHTML);
    msgList.appendChild(li); // 메시지 리스트에 추가
    cq.enqueue(message); // 큐에 메시지 추가
}

// 초기 메시지 표시
displayMessage();

// 큐를 반복해서 메시지 표시
setInterval(() => {
    msgList.removeChild(msgList.firstElementChild); // 첫 번째 메시지 제거
    displayMessage(); // 새 메시지 표시
}, 800); // 3초마다 반복
