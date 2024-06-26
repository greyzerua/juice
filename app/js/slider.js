let list = document.querySelectorAll('.carousel .list .item');
let carousel = document.querySelector('.carousel');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let mockup = document.querySelector('.mockup');

let count = list.length;
let active = 0;
let leftMockup = 0;
let left_each_item = 100 / (list.length - 1);


next.onclick = () => {
    active = active >= count - 1 ? 0 : active + 1;
    leftMockup = leftMockup + left_each_item;
    carousel.classList.remove('right');
    changeCarousel();
}
prev.onclick = () => {
    active = active <= 0 ? count - 1 : active - 1;
    leftMockup = leftMockup - left_each_item;
    carousel.classList.add('right');
    changeCarousel();
}
function changeCarousel() {

    let hidden_old = document.querySelector('.item.hidden');
    if(hidden_old) hidden_old.classList.remove('hidden');

    
    let active_old = document.querySelector('.item.active');
    active_old.classList.remove('active');
    active_old.classList.add('hidden');
  
    list[active].classList.add('active');
   
    mockup.style.setProperty('--left', leftMockup + '%');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 13000);
}



let refreshInterval = setInterval(()=> {next.click()}, 13000);


document.querySelector('.main').addEventListener('mousemove', function(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const carousel = document.querySelector('.carousel');
    const rect = carousel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const moveX = (mouseX - centerX) / 130;
    const moveY = (mouseY - centerY) / 130;

    const activeItem = document.querySelector('.item.active');
    const fruit = activeItem.querySelector('.fruit');
    fruit.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
    if (window.matchMedia("(max-width: 920px)").matches) {
        fruit.style.transform = ``;
    }

    const shadow = document.querySelector('.shadow');
    shadow.style.transform = `translateX(-50%) translateY(${moveY / 10}px)`;
});
