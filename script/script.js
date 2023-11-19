const canvas = document.getElementById('canvas');
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
    ctx.fillStyle = "rgb(200,200,200)";
    ctx.fillRect(cursorX, 4, columnWidth, rowHeight);

    // 文字列を1文字ずつ描画
    for (let i = 0; i < testText.length; i++) {
        const x = i * columnWidth;
        const y = rowHeight;
        ctx.fillStyle = "rgb(0,0,40)";
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