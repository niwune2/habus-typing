const textContainer = document.getElementById('textContainer');
const characters = textContainer.textContent.split('');
let cursorPosition = 0;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const testText = {
    0: "なまむぎなまごめなまたまご",
    1: "となりのきゃくはよくかきくうきゃくだ",
    2: "とりのちにかなしめどうおのちにかなしまず"
}

function draw() {
    ctx.font = "20px serif";
    ctx.fillStyle = "orange";
    ctx.fillText(testText[0], 10, 50);
}

draw();

// キー入力を検知する
document.addEventListener('keydown', () => {
    moveCursor(); // 何かしらのキーが押されたときにカーソルを進める
});

function moveCursor() {
    if (cursorPosition < characters.length) {
        // 前の文字の背景色をリセット
        resetPreviousCharacter();

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

function resetPreviousCharacter() {
    // 前の文字の背景色をリセット
    if (cursorPosition > 0) {
        characters[cursorPosition - 1] = characters[cursorPosition - 1].replace('<span class="highlight">', '').replace('</span>', '');
        textContainer.innerHTML = characters.join('');
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
