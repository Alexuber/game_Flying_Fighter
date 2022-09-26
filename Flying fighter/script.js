audioPlayer = document.querySelector("audio"); //змінна для аудіо
audioPlayer.volume = 0.2; //гучність аудіо
sound = "off" || "on";
appBlock = document.querySelector("#app");
gameBlock = document.querySelector("#game"); //змінна для блоку "game"
startBtn = document.querySelector("#start-btn"); //  змінна дл кнопки СТАРТ в документі
gamer = document.querySelector(".player.skin_1"); //змінна для літака

gamerSkin = "skin_1"; //скін гравця

countLifes = 5; //кількість життів

score = document.querySelector("#score span"); //змінна для числа набраних очків

soundBtn = document.querySelector("#sound img"); //змінна для зображення, яке буде відображуватися, коли трек грає або на паузі

soundBtn.onclick = function() { //функція, яка при кліку на зображення (кнопку) "sound_on" :

  if (sound == "on") { //при умові, коли активне зображення "sound_on"
    soundBtn.src = "images/mute_sound.png"; //змінюватиме зображення на "mute_sound"
    sound = "off";
    audioPlayer.pause(); // і зупинятиме аудіо-трек
  } else {
    soundBtn.src = "images/sound_on.png"; //інакше (тобто при повторному кліку)буде виводитися початкове зображення "sound_on"
    sound = "on";
    audioPlayer.play(); //і вмикатиме аудіо-трек
  }
};

startBtn.onclick = function() { //при кліку на кнопку "старт" виконуватиметься функція старту гри; 
  startGame();
};

// функція старту гри, яка
function startGame() {
  startBlock.style.display = "none"; // прибирає стартове вікно
  appBlock.style.display = "block"; //показує загальне вікно гри
  gameBlock.style.display = "block"; // показує ігрове поле
  gamer.className = gamerSkin; //присвоює скін гравцю
  createLifes(); //створює блок життів
  createMultipleEnemy();
}

//функція,яка при натисканні клавіш:
document.onkeydown = function(event) {

  if (event.code == 'KeyW' || event.code == 'ArrowUp') { //при натисненні кнопок "W" або "↑" здійснюватиметься переміщення літака на 30 пікселів вгору
    if (gamer.offsetTop >= 15) { //тут вказана верхня межа для переміщення літака, щоб не "вилазив" за екран
      gamer.style.top = gamer.offsetTop - 30 + "px";
    }
  }

  if (event.code == 'KeyS' || event.code == 'ArrowDown') { //при натисненні кнопок "S" або "↓" здійснюватиметься переміщення літака на 30 пікселів вниз
    if (gamer.offsetTop <= document.querySelector("#app").clientHeight - 180) { //тут вказана нижня межа для переміщення літака, щоб не "вилазив" за екран
      gamer.style.top = gamer.offsetTop + 30 + "px";
    }
  }
  if (event.code == 'KeyD' || event.code == 'ArrowRight') { //при натисненні кнопок "D" або "→" здійснюватиметься переміщення літака на 30 пікселів вправо
    if (gamer.offsetLeft <= document.querySelector("#game").clientWidth - 150) { //тут вказана гранична межа справа для переміщення літака, щоб не "вилазив" за ігрове поле
      gamer.style.left = gamer.offsetLeft + 30 + "px";
    }
  }
  if (event.code == 'KeyA' || event.code == 'ArrowLeft') { //при натисненні кнопок "А" або "←" здійснюватиметься переміщення літака на 30 пікселів вліво
    if (gamer.offsetLeft >= 15) { //тут вказана гранична межа зліва для переміщення літака, щоб не "вилазив" за ігрове поле
      gamer.style.left = gamer.offsetLeft - 30 + "px";
    }
  }
  if (event.code == "Space") { //при натисненні клавіші "пробіл"
    createBullet(); //виконуватиметьтся функція створення кулі
  }
};

// функція створення ворога
function createEnemy() {
  let enemy = document.createElement("div"); //внутрішня змінна для елемента документа(ворога)
  enemy.className = "enemy " + typeEnemy(); // визначення класу випадковим чином
  enemy.style.left = random(5, document.querySelector("#game").clientWidth - 122) + "px"; //поява ворога у рандомному місці 
  gameBlock.appendChild(enemy); //вставляю новостворений елемент в блок "game"
  moveEnemy(enemy); // виконується функція руху ворога
}

//вибір типу скіна з CSS
function typeEnemy() {
  return "type-" + random(1, 5);
}

//функція руху ворога
function moveEnemy(enemy) {
  let timerID = setInterval(function() { //за допомогою функції 'setInterval'
    enemy.style.top = enemy.offsetTop + 1 + "px"; //буде здійснюватися переміщення ворогів на 1 пікселів вліво з інтервалом 6мс
    if (enemy.offsetTop > document.querySelector("#app").clientHeight) { //коли противник виходить за межі документу
      enemy.remove(); //то він буде видалятися
      createMultipleEnemy(); //і буде виконуватися функція створення декількох вороів
      clearInterval(timerID); //очищуються дані про таймери(про переміщення ворога),
      die(); // виконуватиметься функція програшу
    }
  }, 6);
}

//фенкція створення декількох ворогів
function createMultipleEnemy() {
  for (let i = 1; i <= random(1, 3); i++) {
    createEnemy();
  }
}

//функцію створення кулі
function createBullet() {
  let bullet = document.createElement("div"); //внутрішня змінна для елемента документа(кулі)
  bullet.className = "bullet"; //клас кулі (як у файлі CSS)
  bullet.style.left = gamer.offsetLeft + 57 + "px"; //прив'язка кулі до літака
  bullet.style.top = gamer.style.top //прив'язка кулі до літака  
  gameBlock.appendChild(bullet); //вставляю новостворений елемент в блок "game"
  moveBullet(bullet); //виконується функція переміщення кулі
}

//функцію переміщення кулі:
function moveBullet(bullet) {
  let timerBullet = setInterval(function() { ////за допомогою функції 'setInterval'
    bullet.style.top = bullet.offsetTop - 5 + "px"; //буде здійснюватися переміщення кулі на 5 пікселів вгору з інтервалом 10мс
    if (bullet.offsetTop < -10) { //коли куля вилітатиме на 10 пікселів за межі верхю межу ігрового поля
      bullet.remove(); //вона видалятиметься
      clearInterval(timerBullet); //таймер зупинятиметься і очищатиметься
    }
    isBoom(bullet); //виконуватимуться функії для перевірки положення кулі і ворога
  }, 10);
}

// функія для перевірки положення кулі і ворога
function isBoom(bullet) {
  let enemies = document.querySelectorAll(".enemy"); //внутрішня змінна для ворогів
  for (let enemy of enemies) {
    //за умову, якщо: 
    if (bullet.offsetTop > enemy.offsetTop && //якщо верхній відступ кулі більший за верхній відступ ворога
      bullet.offsetTop < enemy.offsetTop + (enemy.clientHeight - 90) && //якщо верхній відступ кулі менший за суму верхнього відступа ворога і його висоти
      bullet.offsetLeft > enemy.offsetLeft && //якщо відступ зліва кулі більший за відступ зліва ворога
      bullet.offsetLeft < enemy.offsetLeft + enemy.clientWidth //якщо відступ зліва кулі менший за суму відступу зліва ворога і його ширини
    ) {
      createBoom(bullet.offsetTop, bullet.offsetLeft); //відбувається вибух
      score.innerText = Number(score.innerText) + 1; //у блок нарахування очок додається +1
      bullet.remove(); //куля видаляється
      enemy.remove(); //ворог видаляється
      createEnemy(); //виконується функція створення ворога
    }
  }
}

//функція створення вибуху
function createBoom(top, left) { 
  let boom = document.createElement("div"); //внутрішня змінна для вибуху
  boom.className = "boom"; //клас для вибуху (як у файлі CSS)
  boom.style.top = top - 100 + "px"; //коригування розміщення вибуху відносно ворога (по верхньому відступу)
  boom.style.left = left - 100 + "px"; //коригування розміщення вибуху відносно ворога (по лівому відступу)
  gameBlock.appendChild(boom); //вставляємо змінну в блок гри
  setTimeout(function() { //функція для видалення вибуху після відтворення
    boom.remove();
  }, 1100); //через 1.1 секунди
}

//функція для отримання випадкового положення "ворогів"
function random(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

// стартове вікно - вибір гравця
selectSkin1 = document.querySelector("#skin-1"); //змінна для першого скіна літака
selectSkin2 = document.querySelector("#skin-2"); //змінна для другого скіна літака
neonLine1 = document.querySelector("#skin1-lilac"); //змінна для елемента "підсвітки" першого скіна
neonLine2 = document.querySelector("#skin2-lilac") //змінна для елемента "підсвітки" другого скіна

//функція, яка при кліку на перший скін літака на стартовому вікні
selectSkin1.onclick = function() { 
  neonLine1.style.display = "block"; //показуватиме "підсвітку" першого скіну літака
  neonLine2.style.display = "none"; //ховатиме "підсвітку" другого скіну літака
  selectSkin1.className = "selected"; // присвоюватиме змінній першого скіну клас "виділений"
  selectSkin2.className = ""; //присвоюватиме змінній другого скіну пустий клас 
  gamerSkin = "skin_1"; // обиратиме скін1 (як у файлі CSS)
}

//функція, яка при кліку на другий скін літака на стартовому вікні
selectSkin2.onclick = function() { 
  neonLine2.style.display = "block"; //показуватиме "підсвітку" другого скіну літака
  neonLine1.style.display = "none"; //ховатиме "підсвітку" першого скіну літака
  selectSkin2.className = "selected"; // присвоюватиме змінній другого скіну клас "виділений"
  selectSkin1.className = ""; //присвоюватиме змінній першого скіну пустий клас 
  gamerSkin = "skin_2"; // обиратиме скін2 (як у файлі CSS)
}

// функція програшу
function die() {
  countLifes = countLifes -= 1; //вказуюмо, що має відніматися одне життя
  if (countLifes <= 0) { //за умови, якщо кількість життів менше чи дорівнює нулю
    endGame(); //виконується функція, що виводить фінальне вікно 
    return; //завершується виконання функції
  }
  createLifes(); //виконується функція створення життів
}

//функція створення життів
function createLifes() { 
  let lifesBlock = document.querySelector("#lifes"); //внутрішня змінна для блоку життів
  lifesBlock.innerHTML = ""; //присвоюємо HTML розмітку блоку життів
  let count = 0; //внутрішня змінна для лічильника
  while (count < countLifes) { // лічильник менший за кількість життів 
    let span = document.createElement("span"); //внутрішню змінну для "зірок(життів)" в блоку життів
    lifesBlock.appendChild(span); //зірки" в блок життів
    count = count += 1;
  }
}

//функцію завершення гри
function endGame() { 
  let scoreBlock = document.querySelector("#endBlock #amount-points span"); // внутрішня змінна для рядка виведення рахунку
  scoreBlock.innerText = score.innerText; //виводиться рахунок - кількість збитих літаків
  gameBlock.innerHTML = "";
  let endBlock = document.querySelector("#endBlock"); //внутрішня змінна для блоку кінця гри (фінішне вікно після програшу)
  endBlock.style.display = "block"; //виводиться фінішне вікно на екран
  document.onkeydown = null; //зупиняється виконання функціїї натиснення клавіш 
  let restartButton = document.querySelector("#restart-btn"); //змінна для кнопки рестарт
  restartButton.style.display = "block"; //відображення кнопки рестарт
  restartButton.onclick = restart; // при натисканні на кнопку "рестарт" виконуватиметься функція перезавантаження гри
  appBlock.style.display = "none";
}

//функція перезавантаження гри
function restart() { 
  document.location.reload(); //перезавантаження сторінки браузера
}