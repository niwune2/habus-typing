## 2023/11/18
```js
class Typing {
    //?
}

const dom = document.getElementById('dom');

const textContainer = document.getElementById('textContainer');
const cursor = document.getElementById('cursor');
let cursorPosition = 0;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const testText = {
    0: "なまむぎなまごめなまたまご",
    1: "となりのきゃくはよくかきくうきゃくだ",
    2: "とりのちにかなしめどうおのちにかなしまず"
}

// dom.textContent = testText[1];


function draw() {
    ctx.font = "20px serif";
    ctx.fillStyle = "orange";
    ctx.fillText(testText[0], 10, 50);
}

draw();

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    // 何かしらのキーが押されたときにカーソルを移動
    moveCursor();
}

function moveCursor() {
    const characters = textContainer.textContent.split('');
    if (cursorPosition < characters.length) {
        const currentCharacter = characters[cursorPosition];
        const characterWidth = textContainer.offsetWidth / characters.length;

        // カーソルの位置を更新
        const newPosition = cursorPosition * characterWidth;
        cursor.style.left = `${newPosition}px`;

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
    cursor.style.left = '0px';
}
```

## カーソルが進む(`div`)(問題あり)
`<div id="textContainer">なまむぎなまごめなまたまご.</div>`
適当なキーを押すことでこの文字列の一文字ずつカーソルが進む。

背景色を変えることでカーソルを表現しており、カーソル対象の文字には
`<span class="highlight"></span>`このタグが付与される。

しかし最後の一文字だけこのタグが付与されない。

`join()`のせい？

```js
const textContainer = document.getElementById('textContainer');
const characters = textContainer.textContent.split('');
let cursorPosition = 0;

// キー入力を検知する
document.addEventListener('keydown', (e) => {
    moveCursor();
});

function moveCursor() {
    if (cursorPosition < characters.length) {
        // カーソル位置の文字に対して背景色を変更
        characters[cursorPosition - 1] = `<span class="highlight">${characters[cursorPosition]}</span>`;
        textContainer.innerHTML = characters.join('');

        // カーソルの位置を次の文字に移動
        cursorPosition++;

        // カーソルが最後の文字に達したらリセット
        if (cursorPosition === characters.length + 1) {
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

// 配列: 13
// length: 13
```

## `canvas`で
```js
        const canvas = document.getElementById('typingCanvas');
        const ctx = canvas.getContext('2d');
        const testText = "なまむぎなまごめなまたまご";
        const columnWidth = 20; // 文字の幅
        const rowHeight = 25; // 文字の高さ
        let cursorPosition = 0;

        function drawText() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "20px serif";

            // カーソルの位置に背景色を描画
            const cursorX = cursorPosition * columnWidth;
            ctx.fillStyle = "lightblue";
            ctx.fillRect(cursorX, 4, columnWidth, rowHeight);
            // 文字列を1文字ずつ描画
            for (let i = 0; i < testText.length; i++) {
                const x = i * columnWidth;
                const y = rowHeight;
                ctx.fillStyle = "orange";
                ctx.fillText(testText[i], x, y);
            }
        }

        function moveCursor() {
            // カーソルを次に進める
            cursorPosition++;

            // カーソルが最後の文字に到達したらリセット
            if (cursorPosition === testText.length) {
                resetCursor();
            }

            // テキストを再描画
            drawText();
        }

        function resetCursor() {
            // カーソルを最初の位置に戻す
            cursorPosition = 0;

            // テキストを再描画
            drawText();
        }

        // キー入力を検知する
        document.addEventListener('keydown', (e) => {
            if (e.key === "Enter" || e.key === "Spacebar" || e.key === " ") {
                // カーソルを進める
                moveCursor();
            }
        });

        // 最初のテキスト描画
        drawText();
```

## 文字列とカーソルの座標をオブジェクトに保存する
```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const testText = {
    0: "なまむぎなまごめなまたまご",
    1: "となりのきゃくはよくかきくうきゃくだ",
    2: "とりのちにかなしめどうおのちにかなしまず"
}

const textPosition = { x: 10, y: 50 }; // テキストの座標情報
const rectPosition = { x: 9, y: 32, width: 22, height: 22 }; // 図形の座標情報

function drawText() {
    ctx.font = "20px serif";
    ctx.fillStyle = "orange";
    ctx.fillText(testText[2], textPosition.x, textPosition.y);
}

function drawRect() {
    ctx.rect(rectPosition.x, rectPosition.y, rectPosition.width, rectPosition.height);
    ctx.fillStyle = "white";
    ctx.fill();
}

drawRect();
drawText();

const characters = testText[1].split('');
console.log(characters[2]); // "な"
console.log(testText[2].split('')[3]);// "ち"
console.log(ctx.measureText(testText[2].split('')[3]));// テキスト情報のオブジェクト
```