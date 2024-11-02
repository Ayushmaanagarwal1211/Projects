const images = document.querySelectorAll('.carousel-image');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.remove('active');
        dots[i].classList.remove('active');
        if (i === index) {
            img.classList.add('active');
            dots[i].classList.add('active');
        }
    });

    const offset = -index * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.getAttribute('data-index'));
        showImage(currentIndex);
    });
});

// Automatically show next image every 3 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}, 3000);
let startTime;
let updatedTime;
let difference = 0;
let running = false;
let interval;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

function startTimer() {
    console.log('sdsdsd')
    if (!running) {
        startBtn.disabled = true
        startTime = new Date().getTime() - difference;
        interval = setInterval(updateTime, 50);
        running = true;
    }
}

function stopTimer() {
    startBtn.disabled = false
    if (running) {

        clearInterval(interval);
        running = false;
    }
}

function resetTimer() {
    startBtn.disabled = false

    clearInterval(interval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    console.log(difference,updatedTime ,'asas')
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML =
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);



const itemsPerPage = 5; // Change this value for more or fewer items per page
const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`); // Sample items
const itemList = document.getElementById('itemList');
const pagination = document.getElementById('pagination');

let currentPage = 1;

function displayItems(page) {
    itemList.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = items.slice(start, end);

    paginatedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        itemList.appendChild(li);
    });
}

function setupPagination() {
    pagination.innerHTML = '';
    const pageCount = Math.ceil(items.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayItems(currentPage);
            updatePagination();
        });

        if (i === currentPage) {
            button.disabled = true; // Disable the current page button
        }

        pagination.appendChild(button);
    }
}

function updatePagination() {
    const buttons = pagination.querySelectorAll('button');
    buttons.forEach((button, index) => {
        button.disabled = index + 1 === currentPage;
    });
}

displayItems(currentPage);
setupPagination();
function prev(){
    if(currentPage>1){

        currentPage = currentPage-1;
                displayItems(currentPage);
                updatePagination();
    }
}
function next(){
    const pageCount = Math.ceil(items.length / itemsPerPage);

    if(currentPage<pageCount){

        currentPage = currentPage+1;
                displayItems(currentPage);
                updatePagination();
    }
}
document.getElementById("prev").addEventListener("click",prev)
document.getElementById("next").addEventListener("click",next)