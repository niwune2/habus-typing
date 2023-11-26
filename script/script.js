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
    console.log(convertToHiragana(key));
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

// const alphabetToHiragana = {
//     a: 'あ', i: 'い', yi: 'い', u: 'う', wu: 'う', whu: 'う', e: 'え', o: 'お',
//     ka: 'か', ca: 'か', ki: 'き', ku: 'く', cu: 'く', qu: 'く', ke: 'け', ko: 'こ', co: 'こ',
//     sa: 'さ', si: 'し', shi: 'し', ci: 'し', su: 'す', se: 'せ', ce: 'せ', so: 'そ',
//     ta: 'た', ti: 'ち', chi: 'ち', tu: 'つ', tsu: 'つ', te: 'て', to: 'と',
//     na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
//     ha: 'は', hi: 'ひ', hu: 'ふ', fu: 'ふ', he: 'へ', ho: 'ほ',
//     ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
//     ya: 'や', yu: 'ゆ', ye: 'いぇ', yo: 'よ',
//     ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
//     wa: 'わ', wi: 'うぃ', wyi: 'ゐ', we: 'うぇ', wye: 'ゑ', wo: 'を',
//     nn: 'ん', xn: 'ん'
// }

const alphabetToHiragana = {
    a: 'あ', i: 'い', yi: 'い', u: 'う', wu: 'う', whu: 'う', e: 'え', o: 'お',
    k: {a: 'か', ca: 'か', ki: 'き', ku: 'く', cu: 'く', qu: 'く', ke: 'け', ko: 'こ', co: 'こ',},
    s: {a: 'さ', si: 'し', shi: 'し', ci: 'し', su: 'す', se: 'せ', ce: 'せ', so: 'そ',},
    t: {a: 'た', ti: 'ち', chi: 'ち', tu: 'つ', tsu: 'つ', te: 'て', to: 'と',},
    n: {a: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',},
    h: {a: 'は', hi: 'ひ', hu: 'ふ', fu: 'ふ', he: 'へ', ho: 'ほ',},
    m: {a: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',},
    y: {a: 'や', yu: 'ゆ', ye: 'いぇ', yo: 'よ',},
    r: {a: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',},
    w: {a: 'わ', wi: 'うぃ', wyi: 'ゐ', we: 'うぇ', wye: 'ゑ', wo: 'を',},
    nn: 'ん', xn: 'ん'
};
// 1. 子音の入力 `alphabetToHiragana.k`
// 2. 母音の入力 `alphabetToHiragana.k.ko`
// 3. 文字の出力 `き`
// 最初が母音の入力なら即座に出力する
// 子音が最初なら、`.(子音)`で、その後の母音`.(子音+母音)`で出力する
//? ネスト化されたオブジェクトと普通のオブジェクトはどちらがいいのか???
// 出力は、母音の入力がトリガーになる

// function convertToHiragana(input) {
//     const inputArray = input.match(/.{1,2}/g) || []; // 2文字ずつ分割
//     return inputArray
//         .map(char => alphabetToHiragana[char] || char) // アルファベットをひらがなに変換
//         .join(''); // 変換された文字列を結合して返す
// }

function convertToHiragana(input) {
    const vowels = ['a','i','u','e','e','o'];
    const consonants = ['k','s','t','n','h','m','y','r','w'];

    const inputArray = input.match(/.{1,2}/g) || [];

    return inputArray.map(char => {
        if (vowels.includes(char)) {
            return alphabetToHiragana[char] || char;
        } else if (consonants.includes(char.charAt(0))) {
            return convertConsonant(char);
        } else {
            return char;
        }
    }).join('');
}

function convertConsonant(input) {
    
}