console.log("hello, vanilla.");
//헤딩 날짜부분 관련
const day = document.querySelector('.day');
const date = document.querySelector('.date');
const monthYear = document.querySelector('.month-year');
//캘린더 부분 출력 관련
const Weeks = document.querySelector('.weeks');
//좌,우 버튼
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
//조작할 날짜 인스턴스 생성
const dateInstance = new Date();

function getFirstWeekday() {
    dateInstance.setDate(1);
    const firstDayMonth = dateInstance.getDay();
    return firstDayMonth
}

function getLastdate () {
    dateInstance.setMonth(dateInstance.getMonth() + 1);
    dateInstance.setDate(0);
    const lastDate = dateInstance.getDate();
    return lastDate;
}

function printCalendar() {
    let dateLocator = getFirstWeekday();
    const lastDayMonth = getLastdate();
    const today  = new Date(); //오늘일자 판별용

    let w = 0 //주 뛰어넘기용 변수
    for (let i = 1; i <= lastDayMonth; i++) {
        //1일부터 표시
        let nthWeek = Weeks.children[w];
        nthWeek.children[dateLocator].innerHTML = i;

        //오늘을 빨간색으로 표시
        if (
            (today.getFullYear() === dateInstance.getFullYear()) &&
            (today.getMonth() === dateInstance.getMonth()) &&
            (today.getDate() === i)
            ) {
                nthWeek.children[dateLocator].classList.add("today-date")
            }
        else {
            nthWeek.children[dateLocator].classList.remove("today-date")
        }

        //요일 찾기
        if (dateLocator < 6) {
            dateLocator += 1;
        } else if (dateLocator === 6) {
            dateLocator = 0;
            w += 1; //토요일 도달시 다음주로 넘어가기
        }
    }

}

function printHead(evt) {
    if (evt) {
        day.innerText = evt.target.classList[0];
        date.innerText = evt.target.innerText;
    } else {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        const [todayDay, todayDate, todayMonth, todayYear] = dateInstance.toLocaleDateString("en-IE", {year:'numeric', month:"short", day:"numeric", weekday:"short"}).toUpperCase().split(" ")
        day.innerText = todayDay;
        date.innerText = todayDate;
        monthYear.innerText = `${todayMonth} ${todayYear}`;
    }

}

function monthAddSub(event) {
    let monthNow = dateInstance.getMonth();
    let yearNow = dateInstance.getFullYear();
    dateInstance.setDate(1); // 31일 일경우 1달을 뛰어넘어 버릴 수 있음
    //왼쪽버튼
    if (event.target.className === "left-btn") {
        monthNow -= 1;
        //해가 넘어갈경우
        if (monthNow === 0) {
            monthNow = 12;
            yearNow -= 1;
        }
        dateInstance.setFullYear(yearNow);
        dateInstance.setMonth(monthNow);
    //오른쪽 버튼
    } else {
        monthNow += 1;
        if (monthNow === 12) {
            monthNow = 0;
            yearNow += 1;
        }
        dateInstance.setFullYear(yearNow);
        dateInstance.setMonth(monthNow);
    }
    //이전 달 화면 지우기
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            Weeks.children[i].children[j].innerText='';
        }
    }
    printHead()
    printCalendar();
}

function handleBtnClick() {
    leftBtn.addEventListener('click',monthAddSub);
    rightBtn.addEventListener('click',monthAddSub);
}


function handleCalendarClick() {
    Weeks.addEventListener('click', printHead);
}

function inIt() {
    printHead();
    printCalendar();
    handleBtnClick();
    handleCalendarClick();
}

inIt();