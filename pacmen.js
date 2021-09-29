// This array holds all the pacmen. Provided.
const pacMen = []; 

// I added these variables to support the chomping and flipping effects.
// We did a similar flipping and chomping effect in an earlier assignment, so I incorporated that same approach here.
var mouth = 0;
const pacArray = [
    ['Images/PacMan1.png', 'Images/PacMan2.png'],
    ['Images/PacMan3.png', 'Images/PacMan4.png']
];
var direction = 0;
    
// Used for both velocity and position in makePac(). Provided.
function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity. Provided.
// I edited newimg.src and the return to support the chomping and flipping.
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(20); // {x:?, y:?}
    let position = setToRandom(200);
    let illustration = {dir: 0, openClose: 0};
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = pacArray[direction][mouth];
    newimg.width = 100;
    // Set position here 
    newimg.style.left = position.x + "px";
    newimg.style.top = position.y + "px";
    // Add new Child image to game
    game.appendChild(newimg);
    // Return details in an object
    return {
        position,
        velocity,
        illustration,
        newimg
    }
}

// Provided. I edited the x-axis position to support the chomping effect.
function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item);
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.illustration.openClose = (item.illustration.openClose + 1) % 2;
        
        item.newimg.style.left = item.position.x + "px";
        item.newimg.style.top = item.position.y + "px";
        item.newimg.src = pacArray[item.illustration.dir][item.illustration.openClose];
    })
    setTimeout(update, 100);
}

// When a collision on the x-axis is detected, I added the flipping effect.
function checkCollisions(item) {
    if (item.position.x + item.velocity.x + item.newimg.width >= window.innerWidth || item.position.x + item.velocity.x < 0) {
        item.velocity.x = -1 * item.velocity.x;
        item.illustration.dir = (item.illustration.dir + 1) % 2;
    }
    if (item.position.y + item.velocity.y + item.newimg.height >= window.innerHeight || item.position.y + item.velocity.y < 0) {
        item.velocity.y = -1 * item.velocity.y;
    }
}

// Provided.
function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}

// I added this code. This article helped me understand how to use the removeChild method:
// https://www.w3schools.com/jsref/met_node_removechild.asp
function deleteOne() {
    let i = Math.floor(Math.random() * pacMen.length);
    var game = document.getElementById('game');
    game.removeChild(pacMen[i].newimg);
    pacMen.splice(i, 1);
}