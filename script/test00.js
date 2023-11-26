const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const columnWidth = 30; // 1文字の横幅
const rowHeight = 30; // 1行の高さ
let inputText = ''; // 入力された文字列
let convertedText = ''; // 変換されたひらがな

function drawText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリア

    // 入力された文字列をひらがなに変換
    convertToHiragana(inputText);

    // テキスト全体を更新
    const text = 'なまむぎなまごめなまたまご.'; // 例文
    const convertedIndex = inputText.length * 2; // 変換されたひらがなのインデックス
    const updatedText = text.slice(0, convertedIndex) + convertedText + text.slice(convertedIndex);

    // `fillText`で表示
    ctx.font = "20px serif";
    ctx.fillStyle = "orange";
    ctx.fillText(updatedText, 10, 50); // (text, x, y, maxWidth)
}

function convertToHiragana(input) {
    // アルファベットをひらがなに変換
    const alphabetToHiragana = {
        a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
        ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
        // 他の変換ルールも追加
    };

    convertedText = input
        .match(/.{1,2}/g) // 2文字ずつに分割
        .map(group => alphabetToHiragana[group] || group) // アルファベットを変換
        .join(''); // 連結
}

// キー入力を検知する
document.addEventListener('keydown', (e) => {
    inputText += e.key;
    drawText();
});

drawText(); // 初期表示
