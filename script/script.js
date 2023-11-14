// class Typing {
//     //?
// }

// const dom = document.getElementById('dom');

// const textContainer = document.getElementById('textContainer');
// const cursor = document.getElementById('cursor');
// let cursorPosition = 0;

// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// const testText = {
//     0: "なまむぎなまごめなまたまご",
//     1: "となりのきゃくはよくかきくうきゃくだ",
//     2: "とりのちにかなしめどうおのちにかなしまず"
// }

// // dom.textContent = testText[1];


// function draw() {
//     ctx.font = "20px serif";
//     ctx.fillStyle = "orange";
//     ctx.fillText(testText[0], 10, 50);
// }

// draw();

// document.addEventListener('keydown', handleKeyDown);

// function handleKeyDown(event) {
//     // 何かしらのキーが押されたときにカーソルを移動
//     moveCursor();
// }

// function moveCursor() {
//     const characters = textContainer.textContent.split('');
//     if (cursorPosition < characters.length) {
//         const currentCharacter = characters[cursorPosition];
//         const characterWidth = textContainer.offsetWidth / characters.length;

//         // カーソルの位置を更新
//         const newPosition = cursorPosition * characterWidth;
//         cursor.style.left = `${newPosition}px`;

//         // カーソルの位置を次の文字に移動
//         cursorPosition++;

//         // カーソルが最後の文字に達したらリセット
//         if (cursorPosition === characters.length) {
//             resetCursor();
//         }
//     }
// }

// function resetCursor() {
//     cursorPosition = 0;
//     cursor.style.left = '0px';
// }

const textContainer = document.getElementById('textContainer');
const characters = textContainer.textContent.split('');
let cursorPosition = 0;

// キー入力を検知する
document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    // 何かしらのキーが押されたときにカーソルを進める
    moveCursor();
}

function moveCursor() {
    if (cursorPosition < characters.length) {
        // カーソル位置の文字に対して背景色を変更
        characters[cursorPosition] = `<span class="highlight">${characters[cursorPosition]}</span>`;
        textContainer.innerHTML = characters.join('');

        // カーソルの位置を次の文字に移動
        cursorPosition++;

        // カーソルが最後の文字に達したらリセット
        if (cursorPosition === characters.length) {
            resetCursor();
        }
    }
}

function resetCursor() {
    cursorPosition = 0;

    // 全ての文字の背景色をリセット
    characters.forEach((character, index) => {
        characters[index] = character.replace('<span class="highlight">', '').replace('</span>', '');
    });

    textContainer.innerHTML = characters.join('');
}