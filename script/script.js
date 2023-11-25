const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const columnWidth = 20; // 文字の幅
const rowHeight = 25; // 文字の高さ
let cursorPosition = 0;
const testText = {
    0: "なまむぎなまごめなまたまご",
    1: "となりのきゃくはよくかきくうきゃくだ",
    2: "とりのちにかなしめどうおのちにかなしまず"
}
let textNumber = 1;
let inputText = '';

function drawText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px serif";

    // カーソルの位置に背景色を描画
    const cursorX = cursorPosition * columnWidth; //カーソルのx座標
    ctx.fillStyle = "rgb(200,200,200)";
    ctx.fillRect(cursorX, 4, columnWidth, rowHeight);

    // 文字列を1文字ずつ描画
    for (let i = 0; i < testText[textNumber].length; i++) {
        const x = i * columnWidth; // テキストのx座標(i * 文字幅)
        const y = rowHeight; // テキストのy座標
        ctx.fillStyle = "rgb(0,0,40)";
        ctx.fillText(testText[textNumber][i], x, y);
    }

    ctx.fillStyle = 'rgb(0,0,40)';
    ctx.fillText(inputText, 5, rowHeight * 2);
}

// キー入力を検知する
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === 'Enter') {
        moveCursor();
    } else {
        inputText += key;
    }
    drawText();
});

function moveCursor() {
    // カーソルを次に進める
    cursorPosition++;

    // カーソルが最後の文字に到達したらリセット
    if (cursorPosition === testText[textNumber].length) {
        resetCursor();
    }

    // テキストを再描画
    drawText();
}

function resetCursor() {
    // カーソルを最初の位置に戻す
    cursorPosition = 0;

    inputText = '';

    // テキストを再描画
    drawText();
}

// 最初のテキスト描画
drawText();

// TODO パラメータで例文を選択できる関数を書く
// TODO 入力した文字列を例文の下に表示する(アルファベットから) OK.
// TODO 表示した文字が残るようにする OK.
// TODO 入力された文字がひらがなに変換されるようにする
// TODO 入力を待ってから変換するか、即座に変換するか
// TODO 変換したひらがながfillTextに表示されるようにする
// TODO 変換する際は、対応する文字が入力されると自動で行う

const alphabetToHiragana = {
    a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
    ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
}

function convertToHiragana(input) {
    const inputArray = input.match(/.{1,2}/g) || []; // 2文字ずつ分割
    return inputArray
        .map(char => alphabetToHiragana[char] || char) // アルファベットをひらがなに変換
        .join(''); // 変換された文字列を結合して返す
}