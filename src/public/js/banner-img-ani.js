const images = document.querySelectorAll('.imageShow')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
let intervalId = null;

let currentIndex = 0;

showImage(currentIndex);

function showImage(n) {
    images.forEach((image) => {
        image.classList.remove("active");
    })

    images[currentIndex].classList.add("active");
}

function nextImage() {
    if(currentIndex == images.length - 1) {
        currentIndex = 0;
    }else {
        currentIndex++;
    }
    showImage(currentIndex);
}

next.addEventListener("click", nextImage)

prev.addEventListener("click", () => {
    if(currentIndex == 0) {
        currentIndex = images.length - 1;
    }
    else {
        currentIndex--;
    }
    showImage(currentIndex);
})

function starSlideShow() {
    intervalId = setInterval(nextImage, 9000);
}

function stopSlideShow() {
    clearInterval(intervalId);
}

images.forEach((img) => {
    img.addEventListener("mouseenter", stopSlideShow)
    img.addEventListener("mouseleave", starSlideShow)
})