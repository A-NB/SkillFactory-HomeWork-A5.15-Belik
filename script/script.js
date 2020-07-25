const dataURL = "https://api.jsonbin.io/b/5f1759b5c1edc466175baf5f"; //"https://api.jsonbin.io/b/5e905926172eb643896166e7";

const $var1 = $('.var1');
const $var2 = $('.var2');
const $var3 = $('.var3');
const $var4 = $('.var4');
const $var5 = $('.var5');
const $var6 = $('.var6');
const $speach = $('.speach');

const $btnCreate = $('.create-button');
const $btnReplace = $('.replace-button');
const $fableText = $('.fable');

// Если текст успешно загрузился:
let originFableText = "";

// Если текст не загрузился:
const defaultFableText = {"text": ["Жили-были {var1} да {var2}. ","Была у них {var3}. ","Снесла {var3} {var4}, не простое - золотое.  "," {var1} бил, бил - не разбил",", {var2} била, била - не разбила. ","{var5} бежала, {var6} задела, {var4} упало и разбилось. ","{var1} плачет, {var2} плачет, а {var3} кудахчет: ","{speach}"]}

$btnCreate.click(function() {
  $.getJSON(dataURL)
  .done(function(answer) {
    console.log('Данные успешно загружены из внешнего источника! :) (.done(function(answer) {)');
    originFableText = answer.text.toString();
    $fableText.html(originFableText); // (JSON.stringify(answer.text));
  })
  .fail(function(jqxhr, textStatus, error) {
    console.log('Загрузка данных из внешнего источника завершилась с ошибкой :( Текст сказки будет взят из const defaultFableText (.fail(function(jqxhr, textStatus, error) {)');

    // console.log(jqxhr, textStatus, error); 
    // console.log($(Object.responseJSON)); // Не работает
    // Нужно добавить вывод сообщения об ошибке (подробности) -- в разработке :)

    $fableText.html(defaultFableText.text);
  });
});

$btnReplace.click(function() {
  const var1 = $var1.val();
  const var2 = $var2.val();
  const var3 = $var3.val();
  const var4 = $var4.val();
  const var5 = $var5.val();
  const var6 = $var6.val();
  const speach = $speach.val();
  const replaceFableText = {
    "text":[
      `Жили-были ${var1} да ${var2}. `,
      `Была у них ${var3}. `,
      `Снесла ${var3} ${var4}, не простое - золотое. `,
      `${var1} бил, бил - не разбил. `,
      `${var2} била, била - не разбила. `,
      `${var5} бежала, ${var6} задела, ${var4} упало и разбилось. `,
      `${var1} плачет, ${var2} плачет, а ${var3} кудахчет: `,
      `"${speach}".`,
    ]
  };

  // Если текст не загрузился: 
  if (originFableText == "") {
    $fableText.html(replaceFableText.text);

  // Если текст успешно загрузился:    
  } else {
    let originFableTextModify = originFableText.replace('{speach}', speach);  
    let i = 1;
    while (originFableTextModify.indexOf("{") != -1) {
      while (originFableTextModify.indexOf("{var" + i + "}") != -1) {
        s = $('.var' + i).val();
          if (s == "") {
            s = `[var${i}]`;
          }
        originFableTextModify = originFableTextModify.replace('{var' + i + '}', s);
      }  
      i += 1;
    }
    $fableText.html(originFableTextModify);
  }
});
