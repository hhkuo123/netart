// Game Variables
let cookies = 0;
let autoClickers = 0;
let clickMultiplier = 1;

const cookieCount = document.getElementById('cookieCount');
const cookieImg = document.getElementById('cookie');
const buyAuto = document.getElementById('buyAuto');
const autoCount = document.getElementById('autoCount');
const buyDouble = document.getElementById('buyDouble');
const doubleCount = document.getElementById('doubleCount');

const cookieImages = [
  'img/pixilart-drawing.png', // Default image
  'img/move.gif',             // After 10 clicks
  'img/MC.png',               // After 20 clicks
  'img/dancing-voting-day.gif', // After 30 clicks
  'img/gold.png'              // After 40 clicks
];

// Click sound initialization
const clickSound = new Audio('img/Mouse Click Sound Effect 4.mp3'); // Replace with your sound file
clickSound.volume = 0.5;  // Optional: Adjust the volume (0.0 to 1.0)

// Update UI
function updateDisplay() {
  cookieCount.textContent = cookies;
  autoCount.textContent = autoClickers;
  doubleCount.textContent = `${clickMultiplier}x`;
  //   saveGame();
}

// Cookie click logic
cookieImg.addEventListener('click', () => {
  cookies += clickMultiplier;
  updateDisplay();

  // Play the click sound when the cookie is clicked
  clickSound.play();  // Play the click sound

  // Change image every 10 cookies
  let imageIndex = Math.floor(cookies / 10);

  // Make sure the image index doesn't go out of bounds
  if (imageIndex >= cookieImages.length) {
    imageIndex = cookieImages.length - 1; // Use the last image if it goes out of bounds
  }

  cookieImg.src = cookieImages[imageIndex]; // Change cookie image
});

// Buy Auto Clicker
buyAuto.addEventListener('click', () => {
  if (cookies >= 10) {
    cookies -= 10;
    autoClickers++;
    updateDisplay();
  } else {
    alert('Not enough cookies!');
  }
});

// Buy Double Click
buyDouble.addEventListener('click', () => {
  if (cookies >= 30) {
    cookies -= 30;
    clickMultiplier *= 2;
    updateDisplay();
  } else {
    alert('Not enough cookies!');
  }
});

// Auto Clicker logic (runs every second)
setInterval(() => {
  cookies += autoClickers;
  updateDisplay();
}, 1000);

// Initial display update
updateDisplay();

// Golden cookie logic (optional)
setInterval(() => {
  if (Math.random() < 0.5) { // 10% chance
    let golden = document.createElement('div');
    golden.textContent = "🍪 Golden Cookie!";
    golden.style.position = "absolute";
    golden.style.top = `${Math.random() * 80 + 10}%`;
    golden.style.left = `${Math.random() * 80 + 10}%`;
    golden.style.cursor = 'pointer';
    golden.style.background = 'gold';
    golden.style.padding = '10px';
    document.body.appendChild(golden);

    golden.onclick = () => {
      cookies += 500;
      golden.remove();
      updateDisplay();
    };

    setTimeout(() => golden.remove(), 5000); // disappears in 5 seconds
  }
}, 15000); // Check every 15 seconds
