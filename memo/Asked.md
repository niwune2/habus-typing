## 入力で文字の背景色を変える(DOM)
理解しました。文字の背景色が変わるようにカーソルを実装するために、キー入力毎に文字の背景色を変更する仕組みを追加します。以下にサンプルコードを示します。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Typing Game with Cursor</title>
  <style>
    #textContainer {
      font-size: 20px;
      font-family: 'Arial', sans-serif;
      line-height: 1.5;
      position: relative;
    }

    .highlight {
      background-color: #FFFF00; /* 背景色を変更するカーソルのスタイル */
    }
  </style>
</head>
<body>
  <div id="textContainer">なまむぎなまごめなまたまご</div>

  <script>
    const textContainer = document.getElementById('textContainer');
    const characters = textContainer.textContent.split('');
    let cursorPosition = 0;

    // キー入力を検知する
    document.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(event) {
      // 何かしらのキーが押されたときに文字の背景色を変更
      highlightCharacter();
    }

    function highlightCharacter() {
      if (cursorPosition < characters.length) {
        const currentCharacter = characters[cursorPosition];
        
        // カーソル位置の文字に対して背景色を変更
        characters[cursorPosition] = `<span class="highlight">${currentCharacter}</span>`;
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
  </script>
</body>
</html>
```

この例では、`highlightCharacter` 関数がキー入力毎に文字の背景色を変更しています。`highlightCharacter` 関数内で、カーソル位置の文字に `<span class="highlight">` タグを追加して背景色を変更し、`resetCursor` 関数で全ての文字の背景色をリセットしています。このようにして、文字ごとに背景色を変更することができます。