let score = 0;
let cross = true;

let audio = new Audio('music.mp3')
let audioover = new Audio('gameover.mp3')
setTimeout(() => {
    audio.play();
}, 100);

document.onkeydown = function(e) {
    // console.log('key code is', e.keyCode);

    if (e.keyCode === 38 || e.keyCode === 32) {
        let dino = document.querySelector('.dino');
        dino.classList.add('animateDino')
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
        // console.log('upkey', e.keyCode)
    }
    if (e.keyCode === 39) {
        let dino = document.querySelector('.dino');
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dx + 112 + 'px';
    }
    if (e.keyCode === 37) {
        let dino = document.querySelector('.dino');
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dx - 112 + 'px';
    }
}

setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    // console.log(dx, dy)
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    // console.log(ox, oy);

    let offsetX = Math.abs(dx - ox)
    let offsetY = Math.abs(dy - oy)
        // console.log(offsetX, offsetY);
    if (offsetX < 70 && offsetY < 52) {
        let gameOver = document.querySelector('.gameOver')
        gameOver.innerHTML = 'Game Over';
        obstacle.classList.remove('obstacleAni');
        audioover.play();


        setTimeout(() => {
            audioover.pause();
            audio.pause();
        }, 1000);
        setTimeout(() => {
            window.addEventListener('keydown', (e) => {
                location.reload();
            });
        }, 1500);

    } else if (offsetX < 145 && cross) {
        score += 100;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            console.log(aniDur)
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('newDur is', newDur)
        }, 500);


    }

}, 100);

function updateScore(score) {
    let scoreCount = document.getElementById('scoreCount')
    scoreCount.innerHTML = 'your Score:' + score;
}