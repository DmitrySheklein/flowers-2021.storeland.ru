/*
* lazy loads elements with default selector as '.lozad'
*/
$(function(){
  lozad().observe();
})
/*
* Fancybox default
*/
$.extend($.fancybox.defaults, {
  closeBtn: true,
  helpers:  {
    overlay: {
      css: { 'background': '#333', 'opacity': 0.5 },
      locked: false
     }
  }
});   
$.extend($.fancybox.defaults.tpl, {
  closeBtn: '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"><i class="material-icons">close</i></a>',
  next     : '<a title="Далее" class="fancybox-nav fancybox-next" href="javascript:;"><span class="icon-wrap"><svg class="icon"><use xlink:href="#arrow-right"></use></svg></span></a>',
  prev     : '<a title="Назад" class="fancybox-nav fancybox-prev" href="javascript:;"><span class="icon-wrap"><svg class="icon"><use xlink:href="#arrow-left"></use></svg></span></a>'
});
/*
* Noty default
*/ 
Noty.overrideDefaults({
  layout: "bottomRight",
  theme: 'sunset',
  timeout: "3000",
  killer: true,
  progressBar: true,
  animation: {
    open: 'animated bounceInRight', 
    close: 'animated bounceOutRight'
  }
});  
    
// Возвращает правильное окончание для слова
function genWordEnd(num, e, m, mm) {
  // Если забыли указать окончания
  if(typeof (e) == "undefined") { e = ''; }
  if(typeof (m) == "undefined") { e = 'а'; }
  if(typeof (mm) == "undefined"){ e = 'oв'; }
  // Если передали пустую строку, вместо цифры
  if(0 == num.length) { num = 0; }
  // Превращаем цифру в правильный INT
  num = GetSum(num).toString();
  // Получаем последний символ цифры
  ch1 = num.substring(num.length-1);
  // Получаем последний символ цифры
  ch2 = num.length == 1 ? 0 : num.substring(num.length-2, num.length-1);
  // Если последняя цифра - 1, вернем единственное число
  if(ch2!=1 && ch1==1)               {return e;}
  // Если последняя цифра - от 2 до 4х , вернем множественное чило из массива с индексом 2
  else if(ch2!=1 && ch1>1 && ch1<=4) {return m;}
  // Если последняя цифра - от 5 до 0 , вернем множественное чило из массива с индексом 3
  else if(ch2==1 || ch1>4 || ch1==0) {return mm;}
}

// Считает сумму  33 599,65 + 2000 - 1910-41,6
function GetSum(val,precision) {
  if(typeof (precision) == "undefined" || precision < 0) { precision = 0; }
  // Возводим в степень точности 10 для округления
  var p = Math.pow(10,precision);  
  try {return Math.round(parseFloat(eval(val.toString().replace(/\s/gi, "").replace(/,/gi, ".")))*p)/p;} catch (e) {return 0;}
}

// Форматирует цену
function number_format(n,e,t,r){var i=n,a=e,o=function(n,e){var t=Math.pow(10,e);return(Math.round(n*t)/t).toString()};i=isFinite(+i)?+i:0,a=isFinite(+a)?Math.abs(a):0;var u,d,f="undefined"==typeof r?",":r,h="undefined"==typeof t?".":t,l=a>0?o(i,a):o(Math.round(i),a),s=o(Math.abs(i),a);s>=1e3?(u=s.split(/\D/),d=u[0].length%3||3,u[0]=l.slice(0,d+(0>i))+u[0].slice(d).replace(/(\d{3})/g,f+"$1"),l=u.join(h)):l=l.replace(".",h);var c=l.indexOf(h);return a>=1&&-1!==c&&l.length-c-1<a?l+=new Array(a-(l.length-c-1)).join(0)+"0":a>=1&&-1===c&&(l+=h+new Array(a).join(0)+"0"),l}
// Добавляет пробел 1000 -> 1 000  /  10000 -> 10 000 
function addSpaces(nStr){
  return nStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}   
// Проверка вводимых значений в количестве товара
function keyPress(oToCheckField, oKeyEvent) {
  return oKeyEvent.charCode === 0 || /\d/.test(String.fromCharCode(oKeyEvent.charCode));
}

// Функция определения браузера
$(function() {
  var user = detect.parse(navigator.userAgent);
  if (user.browser.family === 'Safari') {
    $('body').addClass('Safari');
  }
  if (user.browser.family === 'IE') {
    $('body').addClass('IE');
  }
  if (user.browser.family === 'Firefox') {
    $('body').addClass('Firefox');
  }
  if (user.browser.family === 'Opera') {
    $('body').addClass('Opera');
  }
  if (user.browser.family === 'Chrome') {
    $('body').addClass('Chrome');
  }
});

// Функция определения ширины экрана пользователя
function getClientWidth() {return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;}

// Работа с cookie файлами. 
// Получение переменной из cookie
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Установка переменной в cookie
function setCookie(name, value, options) {
  options = options || {};
  var expires = options.expires;
  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) { 
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];    
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

// Удаление переменной из cookie
function deleteCookie(name, options ) {
  options = options || {};
  options.expires = -1;
  setCookie(name, "", options)
}

// Отправляет ошибку на сервер, для того чтобы служба тех поддержки могла разобраться в проблеме как можно быстрее.
function sendError (desc, page, line) {
  var img=document.createElement('img');
  img.src = 'https://storeland.ru/error/js?desc='+encodeURIComponent(desc)+'&page='+encodeURIComponent(window.location)+'&line=0';
  img.style.position = 'absolute';
  img.style.top = '-9999px';
  try { document.getElementsByTagName('head').appendChild(img) } catch (e){}
  return false;
}

// Превращает поле пароля в текстовое поле и обратно
// @LinkObject - ссылка по которой кликнули
// @InputObject - объект у которого нужно изменить тип поля
function ChangePasswordFieldType (LinkObject, InputObject) {
  var 
    // Ссылка по которой кликнули
    LObject = $(LinkObject),
    // Объект у которого изменяем тип с password на text
    IObject = $(InputObject),
    // Старый текст ссылки
    txtOld = LObject.html(),
    // Новый текст ссылки
    txtNew = LObject.attr('rel');
  // Если объекты не получены, завершим работу функции
  if( LObject.length==0 || IObject.length==0 ) {
    return false;
  }
  // Изменяем у ссылки текст со старого на новый
  LObject.html(txtNew);
  // Старый текст ссылки сохраняем в атрибуте rel 
  LObject.attr('rel', txtOld);
  // Изменяем тип input поля
  if(IObject[0].type == 'text') {
    IObject[0].type = 'password';
  } else {
    IObject[0].type = 'text';
  }
}

// Крутит изображение при обновлении картинки защиты от роботов
function RefreshImageAction(img,num,cnt) {
  if(cnt>13) { return false; }
  $(img).attr('src', $(img).attr('rel') + 'icon/refresh/' + num + '.gif');
  num = (num==6)?0:num;
  setTimeout(function(){RefreshImageAction(img, num+1, cnt+1);}, 50);
}

// Сравнение товаров
function comparePage(){
  // Сравнение товаров. Инвертирование свойств для сравнения товара
  $('.CompareCheckbox.invert').click(function(){
    var checked = true,
    checkboxes = $('.CompareCheckbox:not(.invert)');
    checkboxes.each(function(){
      if($(this).attr('checked')) {
        checked = false;
        return false;
      }
    });
    checkboxes.each(function(){
      $(this).attr('checked', checked);
    });
    $(this).attr('checked', checked);
  });
  
  // Сравнение товаров. Скрытие характеристик товара, которые выделил пользователь
  $('.CompareGoodsHideSelected').click(function(){
    $('.CompareGoodsTableTbodyComparisonLine').each(function(){
      var CheckedCheckbox = $(this).find('.CompareCheckbox:checked:not(.invert)');
      if(CheckedCheckbox.length>0) {
        $(this).hide();
      }
    });
    // отменяем выделение характеристик товаров
    $('.CompareCheckbox').attr('checked',false);
    return false;
  });
  
  // Сравнение товаров. Скрытие характеристик товара, которые выделил пользователь
  $('.CompareGoodsHideSelected').click(function(){
    $('.CompareGoodsShowAll').show();
    $('.CompareGoodsTableTbodyComparisonLine').each(function(){
      var CheckedCheckbox = $(this).find('.CompareCheckbox:checked:not(.invert)');
      if(CheckedCheckbox.length>0) {
        $(this).hide();
      }
    });
    // отменяем выделение характеристик товаров
    $('.CompareCheckbox').attr('checked',false);
    return false;
  });
  
  // Сравнение товаров. Отображение скрытых характеристик товара
  $('.CompareGoodsShowAll').click(function(){
    $(this).hide();
    $('.CompareGoodsTableTbodyComparisonLine:hidden').show();
    return false;
  });
  
  // Сравнение товаров. Верхняя навигация изменение фильтра на отображение всех характеристик товаров
  $('.CompareGoodsTableFilterShowAll').click(function(){
    $('.CompareGoodsTableFilterSelected').removeClass('CompareGoodsTableFilterSelected');
    $('.CompareGoodsTableTbodyComparisonLine:hidden').show();
    $(this).addClass('CompareGoodsTableFilterSelected');
    return false;
  });

  // Сравнение товаров. Фильтр в верхней навигации. Отображение только различающихся характеристик товара
  $('.CompareGoodsTableFilterShowOnlyDifferent').click(function(){
    $('.CompareGoodsTableFilterSelected').removeClass('CompareGoodsTableFilterSelected');
    $('.CompareGoodsTableTbodyComparisonLine:not(.same)').show();
    $('.CompareGoodsTableTbodyComparisonLine.same').hide();
    $(this).addClass('CompareGoodsTableFilterSelected');
    return false;
  });
  
  // При клике по строке выделяем свойство
  $('.CompareGoodsTableTbodyComparisonLine td:not(.cell)').click(function(){
    var CompareCheckbox = $(this).parent().find('.CompareCheckbox');
    if(CompareCheckbox.attr('checked')) {
      CompareCheckbox.attr('checked', false);
    } else {
      CompareCheckbox.attr('checked', true);
    }
  });
  
  function compareGetVars () {
    return new Array(
      $('.CompareGoodsTableTbody tr:first td').length - 1,
      parseInt($('.CompareGoodsTableTbody tr:first td:visible:not(.cell)').attr('class').replace(new RegExp('compare\-td compare\-td\-'), '')),
      parseInt($('.CompareGoodsTableTbody tr:first td:visible:last').attr('class').replace(new RegExp('compare\-td compare\-td\-'), ''))
    );
  }
  
  // Прокрутка списка сравнения вправо
  $('.CompareGoodsTableNext').click(function(){
    // Определяем используемые поля
    var data = compareGetVars(); 
    // Изменяем их если это возможно.
    if(data[0] > data[2]) {
      $('.compare-td-' + data[1]).hide();
      $('.compare-td-' + (data[2] + 1)).show();
      if((data[2] + 1) >= data[0]) {
        $(this).find('a').addClass('disable');
      }
      if(data[1] + 1 != 1) {
        $('.CompareGoodsTablePrev a').removeClass('disable');
      }
    }
    return false;
  });
  
  // Прокрутка списка сравнения влево
  $('.CompareGoodsTablePrev').click(function(){
    // Определяем используемые поля
    var data = compareGetVars(); 
    // Изменяем их если это возможно.
    if(1 < data[1]) {
      $('.compare-td-' + (data[1] - 1)).show();
      $('.compare-td-' + data[2]).hide();
      if((data[1] - 1) <= 1) {
        $(this).find('a').addClass('disable');
      }
      if(data[2] - 1 != data[0]) {
        $('.CompareGoodsTableNext a').removeClass('disable');
      }
    }
    return false;
  });
}

// Показать пароль 
$(function(){
  $('.showPass').click(function(){
    ChangePasswordFieldType(this, $('#sites_client_pass'));
    return false;
  });
});

// Уведомить о поступлении товара
$(document).on('click', 'a.empty, .goodsDataMainModificationEmpty', function(evt){
  evt.preventDefault();
  evt.stopPropagation()
  var $formBlock = $(this).closest('.goodsListForm, .goodsDataForm');
  var goodsMod = $formBlock.find('[name="form[goods_mod_id]"]').val();
  console.log(goodsMod);
  $('#fancy-notify-goods-mod').val(goodsMod)
  $.fancybox({
    padding: 0,
    autoSize: true,
    width: '100%',
    maxWidth: 1100,
    content: $('#fancybox-notify').html(),
    afterShow: function() {

    }
  });
})

// Основные функции
function MainFunctions() {
  $(function(){
  // Стилизация заголовков
  var $title = $('#page-title .block-title h1.title');
  var titleContent = '<span class="title-text">'+ $title.html() +'</span>';
  $title.html(titleContent)
  // Валидация формы на странице оформления заказа, а так же формы на страницы связи с администрацией
  $("#myform, .feedbackForm, .clientForm, #quickform, .goodsDataOpinionAddForm, .callback-info .callbackForm, .callback-form, #fancybox-callback .callbackForm").each(function () {
    $(this).validate({
      rules: {
        reg_name: "required",
        politics: {
          required: true
        }      
      }
    })    
  })


  // Отправка формы по Ctrl+Enter
  $('form').bind('keypress', function(e){
    if((e.ctrlKey) && ((e.which==10)||(e.which==13))) {$(this).submit();}
  // Отправка данных формы по нажатию на Enter в случае если курсор находится в input полях (В некоторых браузерах при нажатии по enter срабатывает клик по первому submit полю, которое является кнопкой назад. Для этого написан этот фикс)
  }).find('input').bind('keypress', function(e){
    if(((e.which==10)||(e.which==13))) { try{$(this.form).submit();} catch(e){} return false; }
  });
  
  // Функция собирает свойства в строку, для определения модификации товара
  function getSlugFromGoodsDataFormModificationsProperties(obj) {
    var properties = new Array();
    $(obj).each(function(i){
      properties[i] = parseInt($(this).val());
    });
    return properties.sort(function(a,b){return a - b}).join('_');
  }
   
  var 
    // Запоминаем поля выбора свойств, для ускорения работы со значениями свойств
    goodsDataProperties = $('form.goodsDataForm select[name="form[properties][]"]'),
    // Запоминаем блоки с информацией по модификациям, для ускорения работы
    goodsDataModifications = $('div.goodsDataMainModificationsList');
    
  // Обновляет возможность выбора свойств модификации, для отключения возможности выбора по характеристикам модификации которой не существует.
  function updateVisibility (y) {
    // Проверяем в каждом соседнем поле выбора модификаций, возможно ли подобрать модификацию для указанных свойств
    goodsDataProperties.each(function(j){
      // Если мы сравниваем значения свойства не с самим собой, а с другим списком значений свойств
      if( j != y ) {
        // Проходим по всем значениям текущего свойства модификации товара
        $(this).find('option').each(function(){
          // Записываем временный массив свойств, которые будем использовать для проверки существования модификации
          var checkProperties = new Array();
          $(goodsDataProperties).each(function(i){
            checkProperties[i] = parseInt($(this).val());
          });
          // Пытаемся найти модификацию соответствующую выбранным значениям свойств
          checkProperties[j] = parseInt($(this).attr('value'));
          // Собираем хэш определяющий модификацию по свойствам
          slug = checkProperties.sort(function(a,b){return a - b}).join('_');
          // Ищем модификацию по всем выбранным значениям свойств товара. Если модификации нет в возможном выборе, отмечаем потенциальное значение выбора как не доступное для выбора, т.к. такой модификации нет.
          if(!goodsDataModifications.filter('[rel="'+slug+'"]').length) {
           $(this).attr('disabled', true);
          // Если выбрав данное значение свойства товара можно подобрать модификацию, то выделяем вариант выбора как доступный.
          } else {
            $(this).attr('disabled', false);
          }
        });
      }
    });
  }
  // Обновляем возможность выбора модификации товара по свойствам. Для тех свойств, выбор по которым не возможен, отключаем такую возможность.
  // Проверяем возможность выбора на всех полях кроме первого, чтобы отключить во всех остальных варианты, которые не возможно выбрать
  updateVisibility (0);
  // Проверяем возможность выбора на всех полях кроме второго, чтобы в первом поле так же отключилась возможность выбора не существующих модификаций
  updateVisibility (1);


  // Меняет главное изображение товара на изображение с идентификатором goods_mod_image_id
  function changePrimaryGoodsImage(goods_mod_image_id) {
    // Если не указан идентификатор модификации товара, значит ничего менять не нужно.
    if(1 > goods_mod_image_id) {
      return true;
    }
    var 
      // Блок с изображением выбранной модификации товара
      goodsModImageBlock = $('div.owl-carousel a[data-image-id="' + parseInt(goods_mod_image_id) + '"]'),
      // Блок, в котором находится главное изображение товара
      MainImageBlock = $('#zoom1'),
      // Изображение модификации товара, на которое нужно будет изменить главное изображение товара.
      MediumImageUrl = goodsModImageBlock.attr('href'),
      // Главное изображение, в которое будем вставлять новое изображение
      MainImage = MainImageBlock.find('img.goods-image-medium'),
      // Блок, в котором ставится отметка о том, какое изображение сейчас стоит главным
      MainImageInfo = $('div.goodsImageZoom:eq(0)')
      
    ;
    // Если не удалось найти блок, в котором находится главное изображение товара
    if(!MainImageBlock.length) {
      console.log("GoodsModImage error: MainImageBlock not found");
      return false;
    }
    // Если не удалось найти главное изображение товара
    if(!MainImage.length) {
      console.log("GoodsModImage error: MainImage not found");
      return false;
    }
    // Если не удалось найти главное изображение товара
    if(!goodsModImageBlock.length) {
      console.log("GoodsModImage error: goodsModImageBlock not found");
      return false;
    }
    // Если не удалось найти URL изображения для модификации товара
    if(typeof MediumImageUrl === 'undefined') {
      console.log("GoodsModImage error: MediumImageUrl not found");
      return false;
    }

    // Если изображение модификации товара найдено - изменяем главное изображение
    MainImage.attr('src', MediumImageUrl)
    MainImageInfo.attr('data', parseInt(goods_mod_image_id));
    
    return true;
  }

  // Изменение цены товара при изменении у товара свойства для модификации
  goodsDataProperties.each(function(){
    $(this).change(function(){
      var slug = getSlugFromGoodsDataFormModificationsProperties(goodsDataProperties),
        modificationBlock             = $('.goodsDataMainModificationsList[rel="'+slug+'"]'),
        modificationId                = parseInt(modificationBlock.find('[name="id"]').val()),
        modificationArtNumber         = modificationBlock.find('[name="art_number"]').val(),
        modificationGoodsModImageId   = modificationBlock.find('[name="goods_mod_image_id"]').val(),
        modificationPriceNow          = parseInt(modificationBlock.find('[name="price_now"]').val()),
        modificationPriceNowFormated  = modificationBlock.find('.price_now_formated').html(),
        modificationPriceOld          = parseInt(modificationBlock.find('[name="price_old"]').val()),
        modificationPriceOldFormated  = modificationBlock.find('.price_old_formated').html(),
        modificationRestValue         = parseFloat(modificationBlock.find('[name="rest_value"]').val()),
        modificationDescription       = modificationBlock.find('.description').html(),
        modificationMeasureId         = parseInt(modificationBlock.find('[name="measure_id"]').val()),
        modificationMeasureName       = modificationBlock.find('[name="measure_name"]').val(),
        modificationMeasureDesc       = modificationBlock.find('[name="measure_desc"]').val(),
        modificationMeasurePrecision  = modificationBlock.find('[name="measure_precision"]').val(),
        modificationIsHasInCompareList= modificationBlock.find('[name="is_has_in_compare_list"]').val(),
        goodsModificationId           = $('.goodsDataMainModificationId'),
        goodsPriceNow                 = $('.goodsDataMainModificationPriceNow'),
        goodsPriceOld                 = $('.goodsDataMainModificationPriceOld'),
        goodsAvailable                = $('.goodsDataMainModificationAvailable'),
        goodsAvailableTrue            = goodsAvailable.find('.available-true'),
        goodsAvailableFalse           = goodsAvailable.find('.available-false'),
        goodsAvailableAddCart         = $('.add-to-form .add-to-cart'),
        goodsAvailableQty             = $('.add-to-form .wrap-qty'),
        goodsArtNumberBlock           = $('.goodsDataMainModificationArtNumber'),
        goodsArtNumber                = goodsArtNumberBlock.find('span'),
        goodsCompareAddButton         = $('.goodsDataCompareButton.add'),
        goodsCompareDeleteButton      = $('.goodsDataCompareButton.delete'),
        goodsModDescriptionBlock      = $('.goodsDataMainModificationsDescriptionBlock'),
        goodsModEmpty      = $('.goodsDataMainModificationEmpty');
       
      // Изменяем данные товара для выбранных параметров. Если нашлась выбранная модификация
      if(modificationBlock.length) {
        // Установим стоимость доставки
        if(typeof window.calcDeliveryItemsPrice === 'function'){
          $('.product-delivery._good').data('price', modificationPriceNow);
          window.calcDeliveryItemsPrice()
        }
        // Цена товара        
        goodsPriceNow.html(modificationPriceNowFormated);
        goodsPriceNow.data('price-now', modificationPriceNow);
        $('.related-box .related-box-checkbox').each(function(i, checkbox){
          var $checkbox = $(checkbox);
          var checkboxActive = $checkbox.prop('checked');
          if(checkboxActive) {
            changePrice($checkbox, checkboxActive);
          }
        })
        // Старая цена товара
        if(modificationPriceOld > modificationPriceNow) {
          goodsPriceOld.html(modificationPriceOldFormated);
        } else {
          goodsPriceOld.html('');
        }
        // Есть ли товар есть в наличии
        if(modificationRestValue>0) {
          goodsAvailableTrue.show();
          goodsAvailableFalse.hide();
          goodsAvailableAddCart.show();
          goodsAvailableQty.show();
          goodsModEmpty.hide();
        // Если товара нет в наличии
        } else {
          goodsAvailableTrue.hide();
          goodsAvailableFalse.show();
          goodsAvailableAddCart.hide();
          goodsAvailableQty.hide();
          goodsModEmpty.show();
        }
        // Если товар есть в списке сравнения
        if(modificationIsHasInCompareList>0) {
          goodsCompareAddButton.hide();
          goodsCompareDeleteButton.show();
        // Если товара нет в списке сравнения
        } else {
          goodsCompareAddButton.show();
          goodsCompareDeleteButton.hide();
        }
        // Покажем артикул модификации товара, если он указан
        if(modificationArtNumber.length>0) {
          goodsArtNumberBlock.show();
          goodsArtNumber.html(modificationArtNumber);
        // Скроем артикул модификации товара, если он не указан
        } else {
          goodsArtNumberBlock.hide();
          goodsArtNumber.html('');
        }
        // Описание модификации товара. Покажем если оно есть, спрячем если его у модификации нет
        if(modificationDescription.length > 0) {
          goodsModDescriptionBlock.show().html('<div>' + modificationDescription + '</div>');
        } else {
          goodsModDescriptionBlock.hide().html();
        }
        // Идентификатор товарной модификации
        goodsModificationId.attr('name','form[goods_mod_id][' + modificationId + ']');
        
         // Обновляем изображение товара, если оно указано у модификации товара.
         changePrimaryGoodsImage(modificationGoodsModImageId);
      } else {
        var activeId = $(this).next('.goodsDataMainModificationsValues').data('active-id')
        $('.goodsDataMainModificationsValue').filter('[data-value="'+ activeId +'"]').trigger('click')
        // Отправим запись об ошибке на сервер
        sendError('no modification by slug '+slug);
        alert('К сожалению сейчас не получается подобрать модификацию соответствующую выбранным параметрам.');
      }
    });
  });
  
  $('.related-box .related-box-checkbox').on('change', function(){
    var $checkbox = $(this);
    var modId = $checkbox.data('mod-id');
    var checkboxActive = $checkbox.prop('checked');

    if (checkboxActive) {
      // Создаём инпут с доп товаром
      var $input = $('<input>')
                        .attr('type', 'hidden')
                        .attr('name', 'form[goods_mod_id][' + modId + ']')
                        .val(1);
      $('.add-to-box').append($input);
      // Пересчёт цены
      changePrice($checkbox, checkboxActive);
    } else {
      // Удаляем  доп товар 
      $('.add-to-box').find('input[name="form[goods_mod_id][' + modId + ']"]').remove();
      // Пересчёт цены
      changePrice($checkbox, checkboxActive)
    }
  })
  
  function changePrice(currentCheckbox, checkboxActive){
    var $checkbox = currentCheckbox;
    var checkboxPrice = $checkbox.data('mod-price');
    var $priceNowBlock = $('.goodsDataMainModificationPriceNow');
    var nowPrice = $priceNowBlock.data('price-now');
    
    var newPrice = 0;
    
    if (checkboxActive) {
      newPrice = String(nowPrice + checkboxPrice);
      $priceNowBlock.data('price-now', nowPrice + checkboxPrice)
    } else {
      newPrice = String(nowPrice - checkboxPrice);
      $priceNowBlock.data('price-now', nowPrice  - checkboxPrice)
    }
    $priceNowBlock.find('.num').text(addSpaces(newPrice))
  }

  });
}

// Боковое меню сохранение открытой вложенности
function accordion() {
  $('.block.catalog .parent:not(".active") a').next('.sub').css('display', 'none');
  $('.block.catalog .parent a .open-sub').click(function(event){
  event.preventDefault();
    if ($(this).closest('.parent').hasClass('active')) {
      $(this).parent().next('.sub').slideUp(600);
      $(this).closest('.parent').removeClass('active');
      $(this).closest('.open-sub').removeClass('active');
    } else {
      $(this).parent().next('.sub').slideDown(600);
      $(this).closest('.parent').addClass('active');
      $(this).closest('.open-sub').addClass('active');
    }
  });
}
// Запуск блока Вы смотрели
function viewed(){
  var $carousel = $(".viewed .viewed-items");
  var deskItems = $carousel.hasClass('_catalog') ? 5 : 7;

  $carousel.owlCarousel({
    margin: 15,
    loop: false,
    rewind: true,
    lazyLoad: true,
    nav: true,
    navContainer: '.viewed .navigation',
    navText: ['<span class="material-icons">chevron_left</span>','<span class="material-icons">chevron_right</span>'],    
    dots: false,
    autoplay: false,
    autoplayHoverPause: true,
    onInitialized: changeNavBtn,
    responsive: {
      0:{items:1},
      320:{items:1},
      375:{items:2},
      480:{items:2},
      540:{items:2},
      768:{items:4},
      992:{items:5},
      1200:{items: deskItems}
    },    
  });  

  function changeNavBtn(event){
    var items = event.item.count;
    var size = event.page.size;
    var $nav = $(event.target).siblings('.block-title').find('.navigation');

    if (items >= size){
      $nav.show();
    } else {
      $nav.hide();
    }
  }  
}
function initFilterSlider($container) {
    // Фильтр по ценам
    var
    // Минимальное значение цены для фильтра
    priceFilterMinAvailable = parseInt($container.find('.goodsFilterPriceRangePointers .min').text())
    // Максимальное значение цены для фильтра
    ,priceFilterMaxAvailable = parseInt($container.find('.goodsFilterPriceRangePointers .max').text())
    // Максимальное значение цены для фильтра
    ,priceSliderBlock = $container.find('#goods-filter-price-slider')[0]
    // Поле ввода текущего значения цены "От"
    ,priceInputMin = $container.find( "#goods-filter-min-price" )
    // Поле ввода текущего значения цены "До"
    ,priceInputMax = $container.find( "#goods-filter-max-price" )
    // Блок с кнопкой, которую есть смысл нажимать только тогда, когда изменялся диапазон цен.
    ,priceSubmitButtonBlock = $container.find( ".goodsFilterPriceSubmit" );
    
  // Изменяет размер ячеек с ценой, т.к. у них нет рамок, есть смысл менять размеры полей ввода, чтобы они выглядили как текст
  function priceInputsChangeWidthByChars() {
    // Если есть блок указания минимальной цены
    if(priceInputMin.length) {
      priceInputMin.css('width', (priceInputMin.val().length*7 + 60) + 'px');
      priceInputMax.css('width', (priceInputMax.val().length*7 + 60) + 'px');
    }
  }
  // Обновить размеры полей ввода диапазона цен
  priceInputsChangeWidthByChars();

  // Слайдер, который используется для удобства выбора цены
  if(priceSliderBlock){
    noUiSlider.create(priceSliderBlock, {
        start: [parseInt($('#goods-filter-min-price').val()), parseInt($('#goods-filter-max-price').val())],
        connect: true,
        range: {
            'min': priceFilterMinAvailable,
            'max': priceFilterMaxAvailable
        }
    });
    
    priceSliderBlock.noUiSlider.on('slide', function (values, handle) {
      var newVal = parseInt(values[handle]);
  
      /*
      * 0 - left handle
      * 1 - right handle
      */ 
      if (handle) {
          priceInputMax.val( newVal );    
      } else {
          priceInputMin.val( newVal );
      }
      
      priceInputsChangeWidthByChars();
    });
    
    // При изменении минимального значения цены
    priceInputMin.keyup(function(){
      var newVal = parseInt($(this).val());
      if(newVal < priceFilterMinAvailable) {
        newVal = priceFilterMinAvailable;
      }
      priceSliderBlock.noUiSlider.set([newVal, null]);
      priceInputsChangeWidthByChars();
    });
    
    // При изменении максимального значения цены
    priceInputMax.keyup(function(){
      var newVal = parseInt($(this).val());
      if(newVal > priceFilterMaxAvailable) {
        newVal = priceFilterMaxAvailable;
      }
      priceSliderBlock.noUiSlider.set([null, newVal]);
      priceInputsChangeWidthByChars();
    });  
  }
}
// Функции для каталога 
function catalogFunctions(){
  // Стилизация селектов
  $('.selectBox').addClass('_catalog').styler()
  initFilterSlider($('.col-left .filters-price'))
  // Фильтры по товарам. При нажании на какую либо характеристику или свойство товара происходит фильтрация товаров
  $('.filters-goods input').click(function(){
    $(this)[0].form.submit();
    
    return;
    
  });

  $('.filters-goods-active input').click(function(){
    $(this)[0].form.submit();
  });
  $('.filter-btn').on('click', function (evt) {
    evt.preventDefault();
    
    var $containerFilter = $('.toolbar-filter-container');
    var $filters = $containerFilter.find('.block.filters');
    var hasFiltersBlock = $filters.length;

    if(!hasFiltersBlock) {
      $('.block.filters').clone(true).hide().slideToggle().appendTo($containerFilter);
      $containerFilter.find('#goods-filter-price-slider').html('')
      initFilterSlider($containerFilter)
    }
    $filters.slideToggle()
    $(this).toggleClass('_active');
  })
  $('#filters-close').on('click', function () {
    var $containerFilter = $('.toolbar-filter-container');
    var $filters = $containerFilter.find('.block.filters');
    $filters.slideToggle()
  })
  // Показать/скрыть категорию фильтра
  $('.block.filters').on('click', '.title', function(){
    var $title = $(this);
    
    if($(this).hasClass('_main')){
      return;
    }
    
    $title.toggleClass('active').next('.layout-slider, .filter-inner').slideToggle();
  });
  
  $('.block.filters').on('click', '.title', function(){
    if( getClientWidth() <= 991) {
      var $title = $(this);
      
      $title.next('.content').addClass('_active');
      $('.overlay').addClass('_active');        
    }
  })
  
  $('.overlay, .content-close-btn').off('click').on('click', function(){
    $('.overlay').removeClass('_active');
    $('.filters .content, .viewed  .content').removeClass('_active');
  })
  
  // Показать все/скрыть
  $('.block.filters').on('click', '.filter-more', function(){
    var $btn = $(this);
    var offsetTop = $btn.siblings('.title').offset().top

    $btn.prev('.filter-inner').toggleClass('crop');
    
    if($btn.hasClass('active')){
      $btn.removeClass('active').find('.filter-moreText').text('Показать все');
      
      if(getClientWidth() > 992){
        $('html, body').animate({scrollTop: offsetTop})
      }
      
    } else {
      $btn.addClass('active').find('.filter-moreText').text('Скрыть');
    }
  }); 
  
  // ajax вывод товаров списком/таблицей без обновления страницы
  $('.OrderFilterForm').on('click', '.view-mode > a', function(){
    var href = document.location.href;
    var dataHref = $(this).data('href').slice(1);
    var browser = null;
    var qwe = navigator.userAgent;
    var separator = (href.indexOf('?') + 1) ? '&' : '?';
    
    if (qwe.search(/MSIE/) != -1) {browser = 'IE'};
    if (href.indexOf('#page-title') != -1) { href = href.replace('#page-title', '')}
    
    var url = (browser === 'IE') ? encodeURI(href + separator + dataHref) : (href + separator + dataHref);

    $('.products-ajax').addClass('fadeout');
    $('.products-container').prepend('<span class="content-loading"></span>');
    $.ajax({
      url: url,
      cache: false,
      success: function(d){
        $('.products-ajax').parent().html($(d).find('.products-ajax').parent().html());
        lozad().observe();
        $('.view-mode').html($(d).find('.view-mode').html());
        Addto();
        AddCart();
        quantity();
      }
    });
  });  
  
}
// Выносим функции из шаблонов
function outFunctions() {
$(function(){
  // Вызов функции быстрого заказа в корзине
  $('#startOrder, #startOrderTab').on('click', function() {
    startOrder();
    return false;
  });
  // Возврашаем пользователя на страницу с которой был сделан обратный звонок
  $('.callbackredirect').val(document.location.href);

  // Добавление товара в корзину
  $('.wrapper').on('click', '.add-cart', function() {
    var form = $(this).closest('form');
    
    if ($(this).hasClass('quick')) {
      form.attr('rel', 'quick');
      quickOrder(form[0]);
      return (false);
    }
  })
  
  // Слайдер в подвале
  $('#footer .block.collapse .title').on('click', function(){
    if(getClientWidth() <= 991){
      $(this).toggleClass('active').next('.block-content').slideToggle();
    }
  })    
});
}

// Добавление товара в корзину
function AddCart() {
  $('.goodsToCartFromCompareForm, .goodsListForm').off('submit').submit(function() {
    
    // Выносим функции из шаблонов
    if ($(this).attr('rel') === 'quick') {
      quickOrder(this);
      return (false);
    }
    
    $('#header .cart').addClass('have-items');
    $('.cart .count').animate({opacity: 0,display: "none"},500);
    $('.cart .count').animate({display: "inline",opacity: 1} , 500 );
    
    // Находим форму, которую отправляем на сервер, для добавления товара в корзину
    var formBlock = $($(this).get(0));
    
      // Проверка на существование формы отправки запроса на добавление товара в корзину
      if (1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
        alert('Не удалось найти форму добавления товара в корзину');
        return false;
      }
      
      // Получаем данные формы, которые будем отправлять на сервер
      var formData = formBlock.serializeArray();
      // Сообщаем серверу, что мы пришли через ajax запрос
      formData.push({name: 'ajax_q', value: 1});
      // Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
      //formData.push({name: 'fast_order', value: 1});
      // Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
      $.ajax({
        type: "POST",
        cache: false,
        url: formBlock.attr('action'),
        data: formData,
        success: function(data) {
          $.fancybox({
            content: data,
          });
        }
      });
    return false;
  });
}
// Добавление в сравнение и избранное
function Addto() {
  // Добавление/удаление товара на сравнение/избранное через ajax
  $('.add-compare').off('click').click(function(){
    // Объект ссылки, по которой кликнули
    var 
      a = $(this)
      ,addUrl = a.attr('data-action-add-url')
      ,delUrl = a.attr('data-action-delete-url')
      ,addTitle = a.attr('data-action-add-title')
      ,delTitle = a.attr('data-action-delete-title')
      ,isAdd = a.attr('data-action-is-add')
      ,pName = a.attr('data-prodname')
      ,pImage = a.attr('data-prodimage')
      ,pPrice = a.attr('data-mod-id-price')
      ,pUrl = a.attr('data-produrl')
      ,pDataid = a.attr('data-id')
      ,pDataprice = a.attr('data-mod-id')
      ,pDataGoodsid = a.attr('data-goodsid')
      ,aText = a.parent().find('.add-compare')
      ,addTooltip = a.attr('data-add-tooltip')
      ,delTooltip = a.attr('data-del-tooltip')
      requestUrl = a.attr('href')
    ;
    var flag = 0;
    $('#compare-items li.item').each(function(){   
      if($(this).attr('data-id') == pDataid){  
      flag = 1;
      }
      if(flag == 1){
        $(this).remove();
        return false;
      }
      return flag;
    });
    $('.compare #compare-items .empty').hide();
    $('.compare #compare-items .actions').show();
    
    // Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
    if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
      requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsDataMainModificationId').val());
    }
    
    // Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
    if(addUrl && delUrl) {
      $.ajax({
        type : "POST",
        dataType: 'json',
        cache : false,
        url : requestUrl,
        data : {
          'ajax_q': 1
        },
        success: function(data) {
          if(flag == 0){   
            $('#compare-items .compare-items-list').prepend(
                "<li class=\"item\" data-id=\"" + pDataid +  "\">" +
                    "<a data-href=\"" + delUrl + "?id=" + pDataprice + "\" data-goods-mod-id=\"" + pDataprice + "\" class=\"remove item-remove\" title=\"Убрать товар из списка сравнения\" onclick=\"removeFromCompare($(this))\"></a>" +
                    "<a href=\"" + pUrl + "\" title=\"" + pName + "\" class=\"product-image\">" + 
                      "<img src=\"" + pImage + "\" alt=\"" + pName + "\" class=\"goods-image-icon\">" +
                    "</a>" + 
                    "<div class=\"product-details\">" + 
                      "<p class=\"product-name\">" + 
                        "<a href=\"" + pUrl + "\" title=\"" + pName + "\">" + pName + "</a>" +
                      "</p>" + 
                      "<span class=\"price RUB\" data-price=\"" + pPrice + "\"><span><span class=\"num\">" + addSpaces(String(pPrice)) + "&nbsp;</span></span></span>"+
                    "</div>"+
                "</li>"
              );
          }
          if('ok' == data.status) {
            if(isAdd == 1) {
              var 
                from = addUrl
                ,to = delUrl
                ,newIsAddStatus = 0
                ,newTitle = delTitle ? delTitle : ''
                ,newTooltip = delTooltip ? delTooltip : ''
              ;
              a.addClass('added');
            } else {
              var 
                from = delUrl
                ,to = addUrl
                ,newIsAddStatus = 1
                ,newTitle = addTitle ? addTitle : ''
                ,newTooltip = addTooltip ? addTooltip : ''
              ;
              a.removeClass('added');
            }
            
            // Если указано, что изменилось число товаров на сравнении
            if(typeof(data.compare_goods_count) != 'undefined') {
              // Блок информации о том, что есть товары на сравнении
              var sidecount = $('.compare .count');
              // Если на сравнении больше нет товаров
              // Указываем информацию о новом количестве товаров на сравнении
              // Блок обновления списка сравнения в каталога
              sidecount.animate({opacity: 0,display: "none"},500,function(){
              sidecount.text(data.compare_goods_count);                 
                if(data.compare_goods_count > 0){
                  $('.compare').addClass('have-items');
                  $('.compare #compare-items .empty').hide();
                  $('.compare #compare-items .actions').show();              
                }else{
                  $('.compare').removeClass('have-items');
                  $('.compare #compare-items .empty').show();
                  $('.compare #compare-items .actions').hide();               
                }
              }).animate({display: "inline",opacity: 1} , 500 );
            }
            
            // Обновляем ссылку, на которую будет уходить запрос и информацию о ней
            a.attr('href', a.attr('href').replace(new RegExp(from), to))
             .attr('title', newTitle)
             .attr('data-tooltip', newTooltip)
             .attr('data-action-is-add', newIsAddStatus);
          }
          
          var msgType = ('ok' == data.status) ? 'success' : 'error';
          var message = ('ok' == data.status) ? data.message.replace('сравнения', '<a href="/compare" class="underline">сравнения</a>') : data.message;
          // Если есть функция, которая отображает сообщения пользователю
          if(typeof(Noty) == "function") {
            new Noty({
              text: message,
              type: msgType,
              layout: "bottomRight",
              timeout: "2000",
              animation: {
                  open: 'animated bounceInRight', 
                  close: 'animated bounceOutRight'
              }              
            }).show();                
          }

        }
      });
      return false;
    }
  });

  // Добавление/удаление товара на сравнение/избранное через ajax
  $('.add-wishlist').off('click').click(function(){
    // Объект ссылки, по которой кликнули
    var 
      a = $(this)
      ,addUrl = a.attr('data-action-add-url')
      ,delUrl = a.attr('data-action-delete-url')
      ,addTitle = a.attr('data-action-add-title')
      ,delTitle = a.attr('data-action-delete-title')
      ,isAdd = a.attr('data-action-is-add')
      ,aText = a.parent().find('.add-wishlist')
      ,pName = a.attr('data-prodname')
      ,pImage = a.attr('data-prodimage')
      ,pUrl = a.attr('data-produrl')
      ,pDataid = a.attr('data-id')
      ,pDataprice = a.attr('data-mod-id')
      ,pPrice = a.attr('data-mod-id-price')
      ,pDataGoodsid = a.attr('data-goodsid')
      ,addTooltip = a.attr('data-add-tooltip')
      ,delTooltip = a.attr('data-del-tooltip')
      requestUrl = a.attr('href')
    ;
    var flag = 0;
    $('#favorites-items li').each(function(){       
      if($(this).attr('data-id') == pDataid){  
      flag = 1;
      }
      if(flag == 1){
        $(this).remove();
        return false;
      }
      return flag;
    });

    
    // Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
    if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
      requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsDataMainModificationId').val());
    }
    
    // Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
    if(addUrl && delUrl) {
      $.ajax({
        type : "POST",
        dataType: 'json',
        cache : false,
        url : requestUrl,
        data : {
          'ajax_q': 1
        },
        success: function(data) {
          if(data.status != 'error'){
            $('.favorites #favorites-items .empty').hide();
            $('.favorites #compare-items .actions').show();            
          }
          
          if(flag == 0 && data.status != 'error'){   
            $('#favorites-items .favorites-items-list').prepend(
              "<li class=\"item\" data-id=\"" + pDataid +  "\">" + 
                "<a data-href=\"" + delUrl + "?id=" + pDataprice + "\" data-goods-mod-id=\"" + pDataprice + "\" class=\"remove item-remove\" title=\"Убрать товар из списка сравнения\" onclick=\"removeFromFavorites($(this))\"></a>"+
                "<a href=\"" + pUrl + "\" title=\"" + pName + "\" class=\"product-image\">"+
                  "<img src=\"" + pImage + "\" alt=\"" + pName + "\" class=\"goods-image-icon\">"+
                "</a>"+
                "<div class=\"product-details\">"+
                  "<p class=\"product-name\">"+
                    "<a href=\"" + pUrl + "\" title=\"" + pName + "\">" + pName + "</a>"+
                  "</p>"+
                  "<span class=\"price RUB\" data-price=\"" + pPrice + "\"><span><span class=\"num\">" + addSpaces(String(pPrice)) + "&nbsp;</span></span></span>"+
                "</div>"+
              "</li>"
            );
          }
          if('ok' == data.status) {
            if(isAdd == 1) {
              var 
                from = addUrl
                ,to = delUrl
                ,newIsAddStatus = 0
                ,newTitle = delTitle ? delTitle : ''
                ,newTooltip = delTooltip ? delTooltip : ''
              ;
              a.addClass('added');
            } else {
              var 
                from = delUrl
                ,to = addUrl
                ,newIsAddStatus = 1
                ,newTitle = addTitle ? addTitle : ''
                ,newTooltip = addTooltip ? addTooltip : ''
              ;
              a.removeClass('added');
            }
            
            // Если указано, что изменилось число товаров на сравнении
            if(typeof(data.favorites_goods_count) != 'undefined') {
              // Блок информации о том, что есть товары на сравнении
              var sidecount = $('.favorites .count');
              // Если на сравнении больше нет товаров
              // Указываем информацию о новом количестве товаров на сравнении
              // Блок обновления списка сравнения в каталога
              sidecount.animate({opacity: 0,display: "none"},500,function(){
              sidecount.text(data.favorites_goods_count);                 
                if(data.favorites_goods_count > 0){
                  $('.favorites').addClass('have-items');
                  $('.favorites #favorites-items .empty').hide();
                  $('.favorites #favorites-items .actions').show();                     
                }else{
                  $('.favorites').removeClass('have-items');
                  $('.favorites #favorites-items .empty').show();
                  $('.favorites #favorites-items .actions').hide();                   
                }
              }).animate({display: "inline",opacity: 1} , 500 );
            }
            
            // Обновляем ссылку, на которую будет уходить запрос и информацию о ней
            a.attr('href', a.attr('href').replace(new RegExp(from), to))
             .attr('title', newTitle)
             .attr('data-tooltip', newTooltip)
             .attr('data-action-is-add', newIsAddStatus);
          }
          
          var msgType = ('ok' == data.status) ? 'success' : 'error';
          var message = ('ok' == data.status) ? data.message.replace('избранное', '<a href="/user/favorites" class="underline">избранное</a>') : data.message;
          // Если есть функция, которая отображает сообщения пользователю
          if(typeof(Noty) == "function") {
            new Noty({
              text: message,
              type: msgType,
              layout: "bottomRight",
              timeout: "2000",
              animation: {
                  open: 'animated bounceInRight', 
                  close: 'animated bounceOutRight'
              }               
            }).show();                
          }
          
        }
      });
      return false;
    }
  });
}

// Регистрация и выбор доставки
function OrderScripts(){
$(function(){
  // Стилизация селектов
  $('#quickform select').styler();
  // Выбор времени
  $('#quickform select.quickform-select-convenient').on('change', function(){
    var convenientArr = $(this).val().split('-')
    
    if(convenientArr.length){
      $('input[name="form[delivery][convenient_time_from]"]').val(convenientArr[0])
      $('input[name="form[delivery][convenient_time_to]"]').val(convenientArr[1])
    }
  })
  
  // Форма регистрации нового пользователя, при оформлении заказа
  $('.OrderShowPass').click(function(){
    ChangePasswordFieldType(this, $('#contactPassWord'));
    return false;
  });
  $('#pp-order').change(function(){
    $('#quickform').find('button[type="submit"]').toggleClass('_disabled', !$(this).prop('checked'))
  })  
  // При оформлении заказа дадим возможность зарегистрироваться пользователю
  $('#contactWantRegister').click(function(){
    if($(this).prop("checked")) {
      $('.contactRegisterNeedElement').show();
      $('#contactEmail, #contactPassWord').addClass('required');
    } else {
      $('.contactRegisterNeedElement').hide();
      $('#contactEmail, #contactPassWord').removeClass('required');
    }
  });
  
  $(function(){
    $('.deliveryRadio').each(function(){
     var 
      id = $(this).val(),
      fz = $($('.deliveryZoneRadio[deliveryid='+id+']')[0]);  
    price = fz.next().find('.num').text();
    oldPrice = $('tbody[rel='+ id +']').find('.pricefield').find('.num');
    if(price != ''){
      oldPrice.text(price);
    }
    });
  });
  $(function(){   
    $('.orderStageDeliveryListTable').on('change','.deliveryRadio',function(){
      $('.deliveryRadio, .deliveryZoneRadio').each(function(){
        $(this).removeAttr('checked');
      });
      var 
        id = $(this).val(),
        fz = $($('.deliveryZoneRadio[deliveryid='+id+']')[0]);          
      $(this).prop('checked',true);
      fz.prop('checked',true);   
      price = fz.next().find('.num').text();
      oldPrice = $('tbody[rel='+ id +']').find('.pricefield').find('.num');
      if(price != ''){
        oldPrice.text(price);
      }
    });
  });
  // Действия при выборе зоны внутри варианта доставки на этапе оформления заказа
  $('.deliveryZoneRadio').click(function(){
    var id = $(this).attr('deliveryid'),
    price = $(this).next().find('.num').text()
    ,oldPrice = $('tbody[rel='+ id +']').find('.pricefield').find('.num');
    if(price != ''){
      oldPrice.text(price);
    }
    $('.deliveryRadio').each(function(){ 
      $(this).removeAttr('checked');   
      if($(this).val() == id){
        $(this).prop('checked',true);
      }else{
        $(this).removeAttr('checked');
      }
    });
  });
  
  // Выбор даты доставки
  // Документация к плагину //t1m0n.name/air-datepicker/docs/index-ru.html
  var TIME_ZONE = 0; // Учёт временной зоны магазина: 0 - выключен, 1 - включен
  $("#deliveryConvenientDate").datepicker({
    // Если true, то при активации даты, календарь закроется.
    autoClose: true,
    // Можно выбрать только даты, идущие за сегодняшним днем, включая сегодня
    minDate: new Date(),
    onSelect: function(date) {
      var d = new Date();
      var nowDate = d.toLocaleDateString();
      var utcOffset = 3; // Москва
      var offsetTime = 0; // Дополнительный отступ по времени
      var hours = d.getUTCHours() + utcOffset + offsetTime;
      if (hours > 23) {
        hours = (d.getUTCHours() - 24) + utcOffset + offsetTime;
      }
      
      var $selectTime = $("#selectTime");
      var template = $('<div>').html(
        '<option value=""></option>' +
        '<option value="9-10">09:00 - 10:00</option>' +
        '<option value="11-12">11:00 - 12:00</option>' +
        '<option value="12-13">12:00 - 13:00</option>' +
        '<option value="13-14">13:00 - 14:00</option>' +
        '<option value="14-15">14:00 - 15:00</option>' +
        '<option value="15-16">15:00 - 16:00</option>' +
        '<option value="16-17">16:00 - 17:00</option>' +
        '<option value="17-18">17:00 - 18:00</option>' +
        '<option value="18-19">18:00 - 19:00</option>' +
        '<option value="19-20">19:00 - 20:00</option>' +
        '<option value="20-21">20:00 - 21:00</option>' +
        '<option value="21-22">21:00 - 22:00</option>'     
      )
      var $options = template.children();
      
      $selectTime.removeAttr("disabled");

      if (date == nowDate && TIME_ZONE) {
        var $filterdOptions = $options.filter(function(){
          var value = $(this).val();
          var timeOption = parseInt(value.split('-'));
          
          return (hours < timeOption)
        })
        
        if($filterdOptions.length){
          $selectTime
            .html('')
            .append($options.first())
            .append($filterdOptions)
        } else {
          $selectTime.html('<option value="0-0">На сегодня доставок нет</option>');
          $selectTime.attr('disabled', 'disabled');
          $selectTime.trigger('change')
        }
      } else {
        $selectTime.html(template.html())
      }
      $('input[name="form[delivery][convenient_time_from]"]').val(0)
      $('input[name="form[delivery][convenient_time_to]"]').val(0)      
      $('#quickform .quickform-select-convenient').trigger('refresh')
    }
  })
});
}

// Скрипты для Быстрого заказа
function quickOrderScripts(){
$(function(){
  
  $(function(){
  var ID = $('input[name="form[delivery][id]"]:checked').val();

  $('.quick_order_payment').hide();
  $('.quick_order_payment[rel="' + ID + '"]').show();
  $('.quick_order_payment[rel="' + ID + '"]').find('input:first').attr('checked', true);

  });
  
  $('.deliveryRadio').click(function(){  
    var ID = $('input[name="form[delivery][id]"]:checked').val();  
    $('.quick_order_payment').hide();
    $('.quick_order_payment[rel="' + ID + '"]').show();
    $('.quick_order_payment[rel="' + ID + '"]').find('input:first').attr('checked', true);
  });
  
  // Действия при выборе варианта доставки на этапе оформления заказа
  $(function(){
    sd = $($('.deliveryRadio')[0]);
    id = sd.val(),
    fz = $($('.deliveryZoneRadio[deliveryid='+id+']')[0]);
    sd.prop('checked',true);
    fz.prop('checked',true);
    price = fz.next().find('.num').text();
    oldPrice = $('tbody[rel='+ id +']').find('.pricefield').find('.num');
    oldPrice.text(price);
  });
    
  $(function(){
    selectPayment = $('.quick_order_payment').css('display'); 
    $('.quick_order_payment').change(function(){
      selectValue = $(this).find('option:checked').attr('value');
      $('.hiddenRadio .quick_order_payment').each(function(){
        if($(this).css('display') == 'block'){
          $(this).find('input[value=' + selectValue + ']').click();
        }
      });
    });
    
    $('.mainSelect > option').attr('selected',false);
    $('.mainSelect > option:first-of-type').attr('selected',true);
    
    loadPage = $('.mainSelect').find('option:selected').attr('delid');
    
    $(function(){
      $('.zoneSelect option').each(function(){
        id = $(this).attr('deliveryid');    
        select = $(this).parent('select').length;
        $('.zoneSelect select').addClass('input');
      })
      currentDelivery = $('.mainSelect option:checked').attr('delid');
      $('div.zoneSelect select').each(function(){
        if($(this).attr('del') != currentDelivery){
          $(this).parent().hide();
        }
      });
    });
    
    $('.mainSelect').change(function() {
      selectedDelId = $(this).find('option:selected').attr('delid');
      $('.zoneSelect select').parent().hide();
      $('.zoneSelect select[del="' + selectedDelId + '"]').parent().show();
      $('.zoneSelect select option').attr('selected', false)
      $('.zoneSelect select[del="' + selectedDelId + '"] option:first-of-type').attr('selected', true);
      $('.deliveryOption .deliveryRadio[value="' + selectedDelId + '"]').click();
    
      WithoutZone = $('tbody[rel=' + selectedDelId + '] input.deliveryRadio:checked').attr('pricewithoutzones');
      WithZone = $('tbody[rel=' + selectedDelId + '] input.deliveryZoneRadio:checked').attr('price');
    
      if (WithZone >= 0) {
        startprice = WithZone;
      } else {
        startprice = WithoutZone;
      }
    
      currentPriceWithoutChange = parseInt($('.formfast-cart .total-sum').data('total-sum'));
      NewPriceWithChange = String(parseInt(startprice) + currentPriceWithoutChange);
      $('.formfast-cart .subtotal .delivery-sum .num').text(startprice);
      $('.formfast-cart .total-sum .num').text(addSpaces(NewPriceWithChange));
    
      $('.changeprice').text(startprice);
      $('.quick_order_payment').hide();
      $('.quick_order_payment[rel="' + selectedDelId + '"]').show();
    
      startInputId = $('input.deliveryRadio:checked').attr('value');
      $('.hiddenpayment input').attr('checked', false);
      $('.hiddenpayment[rel="' + startInputId + '"] input').each(function() {
        $(this).click();
        return false;
      })
      DeliveryDescription = $('input.deliveryRadio:checked').next('div').html();
      $('.currentDeliveryDescription').html(DeliveryDescription);
      PaymentDescription = $('input.paymentRadio:checked').next('div').html();
      $('.currentPaymentDescription').html(PaymentDescription);
      if ($('input.paymentRadio:checked').next('div').length && $('input.paymentRadio:checked').next('div').html().trim() === '') {
        $('.currentPaymentDesc').css("display", "none");
      } else {
        $('.currentPaymentDesc').css("display", "block");
      }
      
      //  Проверка на самовывоз 
      var selectedName = $(this).find('option:selected').text();
      var $orderCustom = $('.order-user-wrapper');
      
      if(selectedName == 'Курьером'){
        $orderCustom.show().find('input').addClass('required')
      } else {
        $orderCustom.hide().find('input').removeClass('required')
      }
      
      // $('.adress').toggleClass('_hidden', selectedName == 'Самовывоз')
      
      var $deliveryTitleSpan = $('.deliveryConvenientTime, .deliveryConvenientDate').find('span');
      if(selectedName == 'Самовывоз'){
        $('.adress').find('.form-list > div').hide().filter('.deliveryConvenientDate, .deliveryConvenientTime , .quickDeliveryComment').show();
        $deliveryTitleSpan.text('самовывоза')
      } else {
        $('.adress').find('.form-list > div').show().filter('.deliveryConvenientDate, .deliveryConvenientTime , .quickDeliveryComment').show();
        $deliveryTitleSpan.text('доставки')
      }
    });

  });
   
  $(function() {
    WithoutZone = $('input.deliveryRadio:checked').attr('pricewithoutzones');
    WithZone = $('.deliveryZoneRadio:checked').attr('price');
    var startprice = 0;
    if (WithZone > 0) {
      startprice = WithZone;
    } else
    if (WithZone == 0 || WithoutZone == 0) {
      startprice = 0;
    } else {
      startprice = WithoutZone;
    }
  
    currentPriceWithoutChange = parseInt($('.formfast-cart .total-sum').data('total-sum'));
    NewPriceWithChange = String(parseInt(startprice) + currentPriceWithoutChange);
    $('.formfast-cart .subtotal .delivery-sum .num').text(startprice);
    $('.formfast-cart .total-sum .num').text(addSpaces(NewPriceWithChange));
  
    $('.orderStageDeliveryZonePrice .changeprice').text(startprice);
    $('.hiddenpayment input').attr('checked', false);
    startInputId = $('input.deliveryRadio:checked').attr('value');
    $('.hiddenpayment[rel="' + startInputId + '"] input').each(function() {
      $(this).click();
      return false;
    });
    DeliveryDescription = $('input.deliveryRadio:checked').next('div').html();
    $('.currentDeliveryDescription').html(DeliveryDescription);
    PaymentDescription = $('input.paymentRadio:checked').next('div').html();
    $('.currentPaymentDescription').html(PaymentDescription);
    if ($('input.paymentRadio:checked').next('div').length && $('input.paymentRadio:checked').next('div').html().trim() === '') {
      $('.currentPaymentDesc').css("display", "none");
    } else {
      $('.currentPaymentDesc').css("display", "block");
    }
  });

  
  $('.paymentSelect').change(function(){
    selectedDelId = $(this).find('option:selected').attr('value');
    $('.orderStagePayment .paymentRadio[value="'+selectedDelId+'"]').click();
    PaymentDescription = $('input.paymentRadio:checked').next('div').html();
    $('.currentPaymentDescription').html(PaymentDescription);
    if ($('input.paymentRadio:checked').next('div').length && $('input.paymentRadio:checked').next('div').html().trim() === '') {
      $('.currentPaymentDesc').css("display", "none");
    }else{
      $('.currentPaymentDesc').css("display", "block");
    }
  });


  // Валидация формы на странице оформления заказа
  $("#quickform").submit(function(){
    // Если форма невалидна не отправляем её на сервер
    if(!$(this).valid()) {
      return false;
    }

    // Получаем данные формы, которые будем отправлять на сервер
    var formData = $(this).serializeArray();
    // Сообщаем серверу, что мы пришли через ajax запрос
    formData.push({name: 'ajax_q', value: 1});

    // Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
    $.ajax({
      type    : "POST",
      dataType: 'json',
      cache    : false,
      url  	  : $(this).attr('action'),
      data		: formData,
      success: function(data) {
        // Если заказ был успешно создан
        if( data.status == 'ok' ) {
          window.location = data.location;
        } else if( data.status == 'error' ) {
          alert(data.message);
        } else {
          alert('Во время оформления заказа возникла неизвестная ошибка. Пожалуйста, обратитесь в службу технической поддержки.');
        }
      }
    });
    return false;      
  }).validate();
});

$(function() {
  $('.zoneSelect select').change(function() {
    optValue = $(this).find('option:selected').attr('value');
    $('.zones input[value="' + optValue + '"]').click();
    WithZone = $('.deliveryZoneRadio:checked').attr('price');
    $('.changeprice').text(WithZone);

    currentPriceWithoutChange = parseInt($('.formfast-cart .total-sum').data('total-sum'));
    NewPriceWithChange = String(parseInt(WithZone) + currentPriceWithoutChange);
    $('.formfast-cart .subtotal .delivery-sum .num').text(WithZone);
    $('.formfast-cart .total-sum .num').text(addSpaces(NewPriceWithChange));
  })
})


}

// Быстрый заказ
function quickOrder(formSelector) {
  // Находим форму, которую отправляем на сервер, для добавления товара в корзину
  var formBlock = $($(formSelector).get(0));
  // Проверка на существование формы отправки запроса на добавление товара в корзину
  if(1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
    alert('Не удалось найти форму добавления товара в корзину');
    return false;
  }
  // Получаем данные формы, которые будем отправлять на сервер
  var formData = formBlock.serializeArray();
  // Сообщаем серверу, что мы пришли через ajax запрос
  formData.push({name: 'ajax_q', value: 1});
  // Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа 
  formData.push({name: 'fast_order', value: 1});
  // Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
  $.ajax({
    type    : "POST",
		cache	  : false,
		url		  : formBlock.attr('action'),
		data		: formData,
		success: function(data) {
			$.fancybox({
        content : data,
        // При изменении размера окна изменяем размер окна оформления заказа
        afterShow  : function(){
          ppModal();
          return false;
        }
			});
		}
	});
  return false;
}

// Функция Быстрого просмотра товара
function quickView() {
// Получение центральной разметки страницы (для быстрого просмотра)
$(function(){
  $.fn.getColumnContent = function() {
    var block = ($(this).length && $(this).hasClass('product-view') ? $(this).filter('.product-view') : $('div.product-view:eq(0)'));

    // Размер заголовка
    block.find('.product-name').addClass('quick-view')
    block.find('.product-order').addClass('quick-view')
    // Удаляем блоки, которые не отображаются в быстром просмотре.
    block.find('.custom-block').remove()
    // Отключаем увеличение
    block.find('.general-img').find('a').attr('href', 'javascript:void(0)');
    // Меняем ссылки со скролом 
    var $scrollLinks = block.find('.scroll-link');
    $scrollLinks.each(function(i, link){
      var tabId = $(link).attr('href').slice(-1);
      
      $(link).attr('href', $(link).data('href') + '#show_tab_'  + tabId )
    })

    var productShopSize = block.find('.product-shop').children().length;

    if(!productShopSize) {
      // Удаляем пустой блок без характеристик и кр. описания
      block.find('.product-shop').remove();
      // Меняем разметку оставшихся блоков
      block.find('.product-img-box, .product-order').removeClass('col-md-4 col-md-3 col-lg-3 ').addClass('col-md-6');
    } else {
      block.find('.product-shop').removeClass('col-md-5 col-lg-5').addClass('col-md-4')
      block.find('.product-order').removeClass('col-md-3 col-lg-3').addClass('col-md-4')
    }
    
    return block;
  }
});
// Быстрый просмотр товара
$(function(){
  // При наведении на блок товара загружаем контент этого товара, который будет использоваться для быстрого просмотра, чтобы загрузка происходила быстрее.
  $('div.products-container .item').mouseover(function() {
    // Если в блоке нет ссылки на быстрый просмотр, то не подгружаем никаких данных
    var link = $(this).find('a.quickview');
    if(link.length < 1) {
      return true;
    }
    // Если массив с подгруженными заранее карточками товара для быстрого просмотра ещё не создан - создадим его.
    if(typeof(document.quickviewPreload) == 'undefined') {
      document.quickviewPreload = [];
    }
    var href = link.attr('href');
    href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
    // Если контент по данной ссылке ещё не загружен
    if(typeof(document.quickviewPreload[href]) == 'undefined') {
      // Ставим отметку о том, что мы начали загрузку страницы товара
      document.quickviewPreload[href] = 1;
      // Делаем запрос на загрузку страницы товара
      $.get(href, function(content) {
        // Сохраняем контент, необходимый для быстрого просмотра в специально созданный для этого массив
        document.quickviewPreload[href] = $(content).getColumnContent();
      })
      // Если загрузить страницу не удалось, удаляем отметку о том, что мы подгрузили эту страницу
      .fail(function() {
        delete document.quickviewPreload[href];
      });
    }
  });
});
// Действие при нажатии на кнопку быстрого просмотра.  
$(function(){
  $(document).on('click', 'a.quickview', function() {
    var href = $(this).attr('href');
    href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
    quickViewShow(href);
    return false;
  });
});
}
// Быстрый просмотр товара
function quickViewShow(href, atempt) {
  // Если данные по быстрому просмотру уже подгружены
  if(typeof(document.quickviewPreload[href]) != 'undefined') {
    // Если мы в режиме загрузки страницы и ждём результата от другой функции, то тоже подождём, когда тот контент загрузится и будет доступен в этом массиве.
    if(1 == document.quickviewPreload[href]) {
      // Если попытки ещё не указывались, ставим 0 - первая попытка
      if(typeof(atempt) == 'undefined') {
        atempt = 0;
      // Иначе прибавляем счётчик попыток
      } else {
        atempt += 1;
        // Если больше 500 попыток, то уже прошло 25 секунд и похоже, что быстрый просмотр не подгрузится, отменяем информацию о том, что контент загружен
        if(atempt > 500) {
          delete document.quickviewPreload[href];
          // TODO сделать вывод красивой таблички
          alert('Не удалось загрузить страницу товара. Пожалуйста, повторите попытку позже.');
          return true;
        }
      }
      // Запустим функцию быстрого просмотра через 5 сотых секунды, вероятно запрошендная страница товара уже подгрузится. 
      setTimeout('quickViewShow("' + href + '", '+ atempt +')', 50);
      return true;
    } else {
      $.fancybox.close();
      var productShopContent = $(document.quickviewPreload[href]).find('.product-shop').length;
      
      $.fancybox({
        padding: 0,
        autoSize: true,
        width: '100%',
        maxWidth: 1100,
        wrapCSS: (!productShopContent) ? 'quickView' : '',
        content: document.quickviewPreload[href],
        afterShow: function() {
          // Обновление доступности модификаций
          MainFunctions();
          AddCart();
          quantity();
          newModification();
        }
      });
    }
  } else {
    $.get(href, function(content) {
      $.fancybox.close();
      var productShopContent = $(document.quickviewPreload[href]).find('.product-shop').length;
      $.fancybox({
        padding: 0,
        autoSize: true,
        maxWidth: 960,
        wrapCSS: (!productShopContent) ? 'quickView' : '',
        content: $(content).getColumnContent(),
        afterShow: function() {
          // Обновление доступности модификаций
          MainFunctions();
          AddCart();
          quantity();
          newModification();
          $('.product-img-box .product-image .general-img').find('a').attr('href', 'javascript:void(0)');
        }
      });
    });
  }
}

// Функция быстрого оформления заказа в корзине
function startOrder(){  
  var globalOrder = $('#globalOrder');
  var closeOrder = $('#closeOrder'); // объект кнопки отмены заказа
  // Если форма уже открыта то ничего не делаем.
  if (globalOrder.css('display') != 'none') {
    // Если блок с формой заказа не скрыт то выходим из функции
    return false;
  }
  //объект блока куда будет выводиться форма быстрого заказа
  var OrderAjaxBlock = $('#OrderAjaxBlock');
  // объект кнопки "Заказать"
  var buttonStartOrder = $('#startOrder');
  //объект блока с ajax анимацией
  var ajaxLoaderQuickOrder = $('.content-loading');
  var urlQuickForm = '/cart/add'; // адрес страницы с формой
  // данные которые отарвятся на сервер чтобы получить только форму быстрого заказа без нижней части и верхней части сайта
  var quickFormData = [
    {name: 'ajax_q', value: 1},
    {name: 'fast_order', value: 1}
  ];
  // Скрываем кнопку "Заказать"
  buttonStartOrder.hide();
  // Скрываем элементы в корзине
  $('#main .cart-info .cartForm').hide();
  $('#page-title .title-tab').toggleClass('disabled');
  // Отключаем возможность клика по неактивной кнопке
  $('#page-title .title-tab.disabled').prop('disabled', true)
  // Отключаем возможность редактирования формы
  var cartTable = $('.cartTable');
  // открываем общий, глобальный блок
  globalOrder.show().addClass('loading');
  $('html, body').delay(400).animate({scrollTop : jQuery('#globalOrder').offset().top - 100}, 800);
  // включаем gif анимацию загрузки  
  ajaxLoaderQuickOrder.show();
  $.ajax({
    type: "POST",
    cache: false,
    url: urlQuickForm,
    data: quickFormData,
    success: function(data) {
      OrderAjaxBlock.html($(data).find('.quickformfast').wrap('<div></div>').html());
      $('.formfast').addClass('col-sm-12 col-md-8 col-xs-12');
      $('.formfast div.col').addClass('col-md-6 col-sm-12');
      $('.formfast-cart').hide();
      // Включаем возможность клика по неактивной кнопке
      $('#page-title .title-tab.disabled').prop('disabled', false)      
      // скрываем блок с анимацией
      ajaxLoaderQuickOrder.hide();
      globalOrder.removeClass('loading')
      // раскрываем блок с формой
      OrderAjaxBlock.show();
      // удалим обработчик события на кнопке отмена
      $('.formfast-cart').css('display','block');
      closeOrder.css('display','block');
      cartTable.toggleClass('disable');
      q = cartTable.find('.cartqty');
      // if(q.prop('disabled') == true){q.prop('disabled',false)}else{q.prop('disabled',true)}
      quickOrderScripts();
      OrderScripts();
      coupons();
      address();
      ppModal();
      
      $('.formfast-cart .cart-products-list .item.--with-mod').each(function(){
        var id = $(this).data('id');
        var href = $('.cartTable .items[data-id='+ id +']').find('.image img').attr('src');
        
        $(this).find('.product-image img').attr('src', href)
      })
      $('#closeOrder, #closeOrderTab').off('click').on('click',function() {
        // Если таб уже активен выходим
        if($(this).hasClass('title-tab') && !$(this).hasClass('disabled')){ 
          return;
        }
        //Скрываем блок оформления заказа
        ajaxLoaderQuickOrder.hide();
        OrderAjaxBlock.hide();
        globalOrder.hide();
        closeOrder.css('display','none'); // Скрываем кнопку "Отменить"
        $('#main .cart-info .cartForm').show();
        $('#page-title .title-tab').toggleClass('disabled');
        buttonStartOrder.css('display','block'); // Возвращаем кнопку "Заказать"
        // Включаем возможность редактирования формы
        cartTable.toggleClass('disable');                
        // if(q.prop('disabled') == true){q.prop('disabled',false)}else{q.prop('disabled',true)}
        return false;
      });
    }
  });
  return false;
}

// Функция + - для товаров
function quantity() {
  //Regulator Up копки + в карточке товара при добавлении в корзину
  $('.qty-plus').off('click').click(function(){
    var 
      quantity = $(this).parent().find('.quantity'),
      currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal + 1);
      quantity.trigger('keyup');
    }
    return false;
  });
  //Regulator Down копки - в карточке товара при добавлении в корзину
  $('.qty-minus').off('click').click(function(){
    var 
      quantity = $(this).parent().find('.quantity'),
      currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal) && !(currentVal <= 1) ){
      quantity.val(currentVal - 1);
      quantity.trigger('keyup');
    }
    return false;
  });
  // Если вводят 0 то заменяем на 1
  $('.qty-wrap .quantity').off('change').change(function(){
    if($(this).val() < 1){
      $(this).val(1); 
    }
  });
}

// Скрипты для карточки товара
function goodspage() {

    
  
  // Вывод стоимости модификаций
  var modValues = [];  // переменная, которая будет хранить модификации элементов
   
  $(".goodsDataMainModificationsValue").each(function(indx, element){
    modValues.push($(element).data('value') || $(element).attr('data-value'));
  });

  $.each(modValues, function(ind, modId){
    if($('.goodsDataMainModificationsList[rel="'+ modId +'"]').length){
      var price = $('.goodsDataMainModificationsList[rel="'+ modId +'"]').find('[name="price_now"]').val()
      var $priceBlock = $('<span>').addClass('modPrice').text(addSpaces(price)).append('<span>руб.</span>')
      
      $('[data-value="'+ modId +'"]').append($priceBlock)
    }
  })

  // Скролл по ссылкам
  $('.scroll-link').on('click', function(evt){
    evt.preventDefault();
    var href = $(this).attr('href');
    var tabNumber = href.slice(-1);
  
    tabSwitch(tabNumber);
    $('html, body').animate({scrollTop : jQuery(href).offset().top}, 700);
  })

  // Фильтр отзывов
  $('.goodsDataOpinionListNavigateTop > a').click(function(){
    var $btn = $(this);
    var $reviews = $btn.parent().next('.goodsDataOpinionList').find('.bord');
    
    $btn.addClass('active').siblings().removeClass('active');
    
    if($btn.hasClass('goodOpinions')){
      $reviews.filter('.good').fadeIn();
      $reviews.filter('.bad').hide();
    }
    else if($btn.hasClass('badOpinions')){
      $reviews.filter('.good').hide();  
      $reviews.filter('.bad').fadeIn();
    }else{
      $reviews.fadeIn()
    }
  })

  // Добавление отзыва о товаре. Рейтинг
  if(typeof($('.goodsDataOpinionRating').rating) == "function" ) {
    $('.goodsDataOpinionRating input').rating({
      split: 2,
      required: true
    });
  }

  // Список отзывов о товаре. Ссылка на отображение формы для добавление отзыва о товаре
  $('.goodsDataOpinionShowAddForm').click(function(){
    if(0 == $('#goodsDataOpinionAddBlock:visible').length) {
      $('#goodsDataOpinionAddBlock').show('blind');
      $('html, body').animate({scrollTop : jQuery('.goodsDataOpinionAddForm').offset().top}, 400);
    } else {
      $('#goodsDataOpinionAddBlock').hide('blind');
      $('html, body').animate({scrollTop : jQuery('.goodsDataOpinion').offset().top - 60}, 400);
      return false;
    }
  });

  // Добавление отзыва о товаре. кнопка reset скрывающая форму добавления отзыва о товаре
  $('.goodsDataOpinionFormReset').click(function(){
    $('#goodsDataOpinionAddBlock').hide('blind');
    $('html, body').animate({scrollTop : jQuery('.goodsDataOpinion').offset().top - 60}, 400);
    return false;
  });

  // Иконка для обновления изображение капчи
  $('.goodsDataOpinionCaptchaRefresh').click(function(){
    RefreshImageAction(this,1,1);
    $('.goodsDataOpinionCaptchaImg').attr('src',$('.goodsDataOpinionCaptchaImg').attr('src')+'&rand'+Math.random(0,10000));
    return false;
  });

  // Сопутствующие 
  $('.related-box .related-goods-list').owlCarousel({
    margin: 15,
    loop: false,
    rewind: true,
    lazyLoad: true,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    navContainer: '.related-box .navigation',
    navText: [ , ],      
    navText: ['<span class="material-icons">chevron_left</span>','<span class="material-icons">chevron_right</span>'],    
    smartSpeed: 500,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    responsiveClass: true,
    responsiveRefreshRate: 100,
    responsive: {
      0:{items:1},
      320:{items:1},
      375:{items:2},
      480:{items:2},
      540:{items:2},
      768:{items:4},
      992:{items:3},
      1200:{items:4}
    },
    onInitialized: changeNavBtn
  });
  
  // С этим товаром смотрят
  $(".related-views .products-grid").owlCarousel({
    margin: 15,
    loop: false,
    rewind: true,
    lazyLoad: true,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navContainer: '.related-views .navigation',
    navText: [ , ],      
    navText: ['<span class="material-icons">chevron_left</span>','<span class="material-icons">chevron_right</span>'],    
    smartSpeed: 500,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    responsiveClass: true,
    responsiveRefreshRate: 100,
    responsive: {
      0:{items:1},
      320:{items:1},
      480:{items:1},
      540:{items:2},
      768:{items:3},
      992:{items:3},
      1200:{items:4}
    },
    onInitialized: changeNavBtn
  });

  function changeNavBtn(event){
    var items = event.item.count;
    var size = event.page.size;
    var $nav = $(event.target).prev('.block-title').find('.navigation');
    
    if (items > size){
      $nav.show();
    } else {
      $nav.hide();
    }    
  }

}

// Скрипты для изображения товара
function goodsImage() {
// Другие изображения товара
$(function(){
  var owl = $(".thumblist-box .owl-carousel");

  owl.owlCarousel({
    margin: 13,
    autoWidth: true,
    loop: false,
    rewind: true,
    lazyLoad: false,
    nav: true,
    navContainer: '.thumblist-box .navigation',    
    navText: [ , ],      
    navText: ['<span class="material-icons">chevron_left</span>','<span class="material-icons">chevron_right</span>'],     
    dots: false,
    autoplay: false,
    autoplayHoverPause: true,
    smartSpeed: 500,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    responsiveClass: true,
    responsiveRefreshRate: 100,
    responsive: {
      0:{items:1},
      320:{items:2},
      480:{items:3},
      640:{items:4},
      768:{items:5},
      992:{items:3},
      1200:{items:4}
    }
  });
  // Увеличение изображения при нажатии изображение
  $(function() {
    $('a[rel="gallery"]').fancybox({
      padding: 0
    });
    // Увеличение изображение при клике на него и открытие галереи изображений
    $('.goodsImageZoom a, .thumblist a').click(function(){
      if($(this).closest('.thumblist').length) {
        $('.goodsImageZoom').attr('data', $(this).attr('data'));
        return(true);
      }

      $('.goodsImageList a[data="' + $('.goodsImageZoom').attr("data") + '"]').trigger('click');
      return(false);
    });
    // Увеличение при нажатии на кнопку
    $("#zoom1").click(function(event){
      event.preventDefault();
      $('div.owl-carousel a[data-image-id="' + parseInt( $('div.goodsImageZoom').attr('data')) + '"]').click();
    });
  });

});
}


// Удаление товара из Сравнения без обновлении страницы
function removeFromCompare(e){
  if(confirm('Вы точно хотите удалить товар из сравнения?')){
  var del = e;
  var num = $('.compare .count').text();
  e.parent().fadeOut().remove();
  url = del.data('href');
  goodsModId = $(del).attr('data-goods-mod-id');
  $.ajax({ 
    cache : false,
    url		: url,
    success: function(d){
      var oldCount = num;
      var newCount = oldCount - 1;
      $('.compare .count').text(newCount);
      var flag = 0;
      
      if(newCount != 0){
        $('#compare-items li.item').each(function(){
          if(flag == 0){
            if($(this).css('display') == 'none'){
              $(this).show();
            flag++;
            }
          }
        })}else{
          $('.compare').removeClass('have-items');
          $('.compare #compare-items .empty').show();
          $('.compare .actions').hide();
        }
      var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');
      if(obj.length) {
        obj.attr("data-action-is-add", "1")
        .removeAttr("title")
        .removeClass("added")
        .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
      }
		}
  })
  }
}

// Удаление ВСЕХ товаров из Сравнения без обновлении страницы
function removeFromCompareAll(e){
  if(confirm('Вы точно хотите очистить корзину?')){
  var del = e;
  url = del.data('href');

  $.ajax({ 
    cache   : false,
    url		  : url,
    success: function(d){
      // Очищаем активные кнопки сравнения на товарах
      $('.compare #compare-items .item .item-remove').each(function(){
        var goodsModId = $(this).attr('data-goods-mod-id');
        var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');
         
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }         
      })
      
      $('.compare').removeClass('have-items');
      $('.compare .count').text("0");
      $('.compare .actions').hide();
      $('.compare #compare-items .item').remove();
      $('.compare #compare-items .empty').show();
      $('.add-compare').removeAttr("title").removeClass("added");
		}
  })
  }
}

// Удаление товара из Избранного без обновлении страницы
function removeFromFavorites(e){
  if(confirm('Вы точно хотите удалить товар из избранного?')){
  var del = e;
  var num = $('.favorites .count').text();
  e.parent().fadeOut().remove();
  url = del.data('href');
  goodsModId = $(del).attr('data-goods-mod-id');
  $.ajax({ 
    cache    : false,
    url		  : url,
    success: function(d){
      var oldCount = $('.favorites .count').text();
      var newCount = oldCount - 1;
      $('.favorites .count').text(newCount);
      var flag = 0;
      
      if(newCount != 0){
        $('#favorites-items li.item').each(function(){
          if(flag == 0){
            if($(this).css('display') == 'none'){
              $(this).show();
            flag++;
            }
          }
        })}else{
          $('.favorites').removeClass('have-items');
          $('.favorites #favorites-items .empty').show();
          $('.favorites .actions').hide();          
        }
      var obj = $('.add-wishlist[data-mod-id="' + goodsModId + '"]');
      if(obj.length) {
        obj.attr("data-action-is-add", "1")
        .removeAttr("title")
        .removeClass("added")
        .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
      }
		}
  })
  }
}

// Удаление ВСЕХ товаров из Избранное без обновлении страницы
function removeFromFavoritesAll(e){
  if(confirm('Вы точно хотите очистить избранное?')){
  var del = e;
  url = del.data('href');
  
  $.ajax({ 
    cache   : false,
    url		  : url,
    success: function(d){
      // Очищаем активные кнопки избранное на товарах
      $('.favorites #favorites-items .item .item-remove').each(function(){
        var goodsModId = $(this).attr('data-goods-mod-id');
        var obj = $('.add-wishlist[data-mod-id="' + goodsModId + '"]');
        
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }        
      })    
      
      $('.favorites').removeClass('have-items');
      $('.favorites .count').text("0");
      $('.favorites .actions').hide();
      $('.favorites #favorites-items .item').remove();
      $('.favorites #favorites-items .empty').show();
      $('.add-wishlist').removeAttr("title").removeClass("added");
		}
  })
  }
}

// Удаление товара из корзины без обновлении страницы
function removeFromCart(e){
  if(confirm('Вы точно хотите удалить товар из корзины?')){
  var del = e;  
  e.parent().fadeOut().remove();
  url = del.data('href');
  quantity = del.data('count');
  
  $('.total-sum').animate({opacity: 0},500);
  $.ajax({
    cache   : false,
		url		  : url,
    success: function(d){
      var oldCount = $('.cart .count').text();
      var oldQuantity = quantity;
      var newCount = oldCount - oldQuantity;
      
      $('.cart .count').text(newCount);
      $('.total-sum').animate({opacity: 1},500);
      $('.total-sum').html($(d).find('.total-sum').html());
        var flag = 0; 
        if(newCount != 0){
        $('.cart-products-list li.item').each(function(){
          if(flag == 0){
            if($(this).css('display') == 'none'){
              $(this).show();
            flag++;
            }
          }
        })}else{
          $('.header .cart .cart-content .cart-products-list').hide();
          $('.header .cart  .cart-content .subtotal').hide();
          $('.header .cart  .cart-content .actions').hide();
          $('.header .cart  .cart-content .empty').show();
        }
      }
    })
  }
}

// Удаление ВСЕХ товаров из Корзины без обновлении страницы
function removeFromCartAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить корзину?')){
  var del = e;  
  e.parent().fadeOut().remove();
  url = del.data('href');
  $.ajax({ 
    cache   : false,
    url		  : url,
    success: function(d){
      $('.cart .count').text("0");
      $('.header .cart  .cart-content .cart-products-list').hide();
      $('.header .cart  .cart-content .subtotal').hide();
      $('.header .cart  .cart-content .actions').hide();
      $('.header .cart  .cart-content .empty').show();
		}
  })
  }
}

// Корзина
function ajaxnewqty(){
  $('.cartqty').change(function(){
    s = $(this);
    id = $(this).closest('tr').data('id');
    qty = $(this).val();
    if(qty < 1) {
      s.val(1)
    }    
    data = $('.cartForm').serializeArray();
    data.push({name: 'only_body', value: 1});
    $('tr[data-id="' + id + '"] .ajaxtotal').css('opacity','0');
    $('.TotalSum').css('opacity','0');
    $.ajax({
      data: data,
      cache:false,
      success:function(d){        
        s.val($(d).find('tr[data-id="' + id + '"] .cartqty').val())
        $('tr[data-id="' + id + '"] .ajaxtotal').css('opacity','1');
        $('.TotalSum').css('opacity','1');
        tr = $('tr[data-id="' + id + '"]');
        tr.find('.ajaxtotal').html($(d).find('tr[data-id="' + id + '"] .ajaxtotal').html()); 
        $('.TotalSum').html($(d).find('.TotalSum').html());
        $('.discounttr').each(function(){
          $(this).remove();
        });
        $(d).find('.discounttr').each(function(){
          // $('.cartTable tfoot tr:first-child').before($(this));
          $('.cart-footer table').append($(this));
        });
        c = $(d).find('tr[data-id="' + id + '"] .cartqty');
        qw = c.val();
        if(qty > qw){
          $('.cartErr').remove();
          $('.cartTable').before('<div class="cartErr warning">Вы пытаетесь положить в корзину товара больше, чем есть в наличии</div>');
          $('.cartErr').fadeIn(500).delay(2500).fadeOut(500, function(){$('.cartErr').remove();});
          $('.cartqty').removeAttr('readonly');
        }
      }
    })
  })
}

// Удаление товара из корзины
function ajaxdelete(s){
  var yep = confirm('Вы точно хотите удалить товар из корзины?');
  if(yep == true){
    var closeimg = s;
    s.closest('tr').fadeOut();
    url = closeimg.data('href');
    $.ajax({
      url:url,
      cache:false,
      success:function(d){
        $('.cart-info').html($(d).find('.cart-info').html());
        ajaxnewqty();
        $('.cartqty').first().trigger('change');
        $('#startOrder').on('click', function() {
          startOrder();
          return false;
        });
        // Если корзина пуста
        if($(d).find('.attention').length){
          $('#page-title .title').html('Корзина покупок пуста')
        }
        
       }      
    })}else{
      return false;
    }
}

// Отправка купона при оформлении заказа
function coupons() {
  var $submitBtn = $('.coupons .coupon-btn');
  var $cuponInput = $('#quick_form_coupon_code');
  var $resetBtn = $('.coupons .coupon_clear');
  
  $submitBtn.click(function(){
  var url = '/order/stage/confirm';
  var val = $cuponInput.val();
  var orderSumDefaul = $('.coupons input[name="orderSumDefaul"]').val()
  // Получаем данные формы, которые будем отправлять на сервер
  var formData = $('#myform').serializeArray();
  formData.push({name: 'ajax_q', value: 1});
  formData.push({name: 'only_body', value: 1});
  formData.push({name: 'form[coupon_code]', value: val});
  $.ajax({
   type: "POST",
   cache: false,
   url: url,
   data: formData,
   success: function(data) {
     var $discountBlock = $(data).closest('#myform').find('tr.discount');
     var discountName = $discountBlock.find('td.name').text();
     var discountPercent = $discountBlock.find('td.percent').text();
     var $totalBlock = $(data).closest('#myform').find('tr.total');
     // Записываем название и размер скидки по купону
     $('.subtotal .discount .label').html(discountName);
     $('.subtotal .discount .price').html(discountPercent);
     // Получаем новую итоговую стоимость заказа
     var newTotalSum = $totalBlock.find('td.total-sum').data('total-sum');
     // Обновляем значение
     $('.subtotal .total .total-sum').data('total-sum', newTotalSum);
     // Получаем текущую стоимость выбранной доставки
     var deliverySum = $('.formfast-cart .subtotal .delivery-sum .num').text();
     // Считаем итоговую сумму заказа вместе с доставкой
     var totalPriceWithDelivery = String(parseInt(deliverySum) + Math.floor(newTotalSum));
     $('.formfast-cart .total-sum .num').text(addSpaces(totalPriceWithDelivery));
     // Считаем размер скидки
     var discountRub = String(Math.floor(orderSumDefaul) - Math.floor(newTotalSum));
     $('.coupons .couponBlockSale').toggleClass('active', discountRub > 0);
     if(discountRub > 0) {
             $('.subtotal .discount').show();               
             $('.coupons .couponNum').text(addSpaces(discountRub))          
     } else {
             $('.coupons .couponNum').text('0')
             $('.subtotal .discount').hide();
     }
     },
     error: function(data){
     console.log("Возникла ошибка: Невозможно отправить форму купона.");
   }
  });
  });
  $cuponInput.on('input',function(){
    var $input = $(this);
    
    if( $input.val() ) {
     $input.next('.coupon_clear').addClass('active')
    } else {
     $input.next('.coupon_clear').removeClass('active')
    }
  })
  $resetBtn.on('click', function(){
    $('#quick_form_coupon_code').val('').trigger('input');
    $('.coupons .coupon-btn').trigger('click');
  })
}

// Наверх
$(function(){
  // hide #back-top first
  $("#back-top").hide();
	// fade in #back-top
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#back-top').fadeIn();
		} else {
			$('#back-top').fadeOut();
		}
	});
	// scroll body to 0px on click
	$('#back-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
});

// Инициализация табов на странице товара
function initTabs() {
  // Блок в котором находятся табы
  var tabBlock = $('.product-tabs');
  if(!tabBlock.length) {
    return false;
  }
  // По умолчанию делаем отметку о том что активного таба не найдено
  var isFind = 0;
  tabBlock.find('.tabs a').each(function(i){
    // Если нашёлся активный там
    if($(this).hasClass('active')) {
      // Инициализируем найденный таб
      $(this).click();
      // Ставим отметку, о том что не нужно инициализировать первый таб на странице
      isFind = 1;
    }
  });
  // Если не найдено ни одного таба с отметкой о том что он активен
  if(!isFind) {
    // Ставим активным первый таб на странице.
    var tab = $('ul.tabs > li > a').attr('id').slice(-1);
    tabSwitch(tab, true);
  }
  // Проверяет хэш и если по нему была открыта вкладка, то эта функция автоматически откроет её.
  checkTabHash();
  // Если текущий адрес страницы предполагает добавление отзыва
  if('#goodsDataOpinionAdd' == document.location.hash) {
    $('#goodsDataOpinionAddBlock').show();
    $('html, body').animate({scrollTop : jQuery('.goodsDataOpinion').offset().top - 160}, 400);
  } else if (document.location.hash.indexOf('show_tab_')  !== -1){
    var id = document.location.hash.slice(-1);
    
    if($('#tab_' + id).length) {
      $('html, body').animate({scrollTop : jQuery('#tab_' + id ).offset().top - 10}, 400);  
    }
  }
  // Биндим изменение хэша - проверка какой таб нужно открыть.
  $(window).bind('hashchange', function() { checkTabHash(); });
}

// Проверяет хэш, переданый пользователем и открывает соответствующий раздел
function checkTabHash() {
  // Определяем текущий хэш страницы
  var hash = window.location.hash.substr(1);
  if(hash == 'goodsDataOpinionAdd') {
    hash = 'show_tab_4';
  }
  if(!hash.length || hash.indexOf('show_tab_') == -1) {
    return false;
  }
  // Открываем тот таб, который был указан в hash-е
  tabSwitch(hash.replace("show_tab_", ''))
}

// Выбор вкладки на странице товара
function tabSwitch(nb, noScroll) {
  var tabBlock = $('.product-tabs');
  tabBlock.find('.tabs a').removeClass('active');
  tabBlock.find('div.tab-content').hide();
  $('#tab_' + nb).addClass('active');
  $('#content_' + nb).show();
  if('#goodsDataOpinionAdd' != document.location.hash && !noScroll) {
    // Записываем в хэш информацию о том какой таб сейчас открыт, для возможности скопировать и передать ссылку с открытым нужным табом
    document.location.hash = "#show_tab_" + nb;  
  }
}


// Разделение поле адрес на Улица, Дом, Квартира
function address(){
    // Проверка на заполненность email
    var $email = $('#contactEmail');
    $email.on('input', function(){
      if($email.val()){
        function generatePassword() {
            var length = 8,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal;
        }
        $('#contactPassWord').val(generatePassword())
      }
    })
    /* END */  
  $('#quickform .button').click(function(){
    var $quickDeliveryAddress = $('#quickDeliveryAddress'),
        quickDeliveryAddressStreetValue = $('#quickDeliveryAddressStreet').val(),
        quickDeliveryAddressHomeValue = $('#quickDeliveryAddressHome').val(),
        quickDeliveryAddressFlatValue = $('#quickDeliveryAddressFlat').val();
    
    if(!$quickDeliveryAddress.length){
      return;
    }
    
    if(quickDeliveryAddressStreetValue !='' || quickDeliveryAddressHomeValue !='' || quickDeliveryAddressFlatValue !=''){
      if ($quickDeliveryAddress.val().match( /(.*)(улица)+(.*)/i )) {
        $quickDeliveryAddress.val(null);
      }
      $quickDeliveryAddress.val('Улица: ' + quickDeliveryAddressStreetValue + ', Дом/Корпус: ' + quickDeliveryAddressHomeValue + ', Квартира: ' + quickDeliveryAddressFlatValue);
      $(this).submit();
      return false;
    }
  });
}

// Функции для главной страницы
function indexPage() {

  function initIndexBannerList() {
    var $bannerList = $(".banner-list");

    if(getClientWidth() <= 991){
      // Баннеры на главной
      $bannerList.owlCarousel({
        loop: false,
        rewind: true,
        lazyLoad: false,
        nav: false,
        dots: false,
        autoplay: false,
        smartSpeed: 500,
        touchDrag: true,
        pullDrag: true,
        autoWidth:true,
        responsiveClass: true,
        responsiveRefreshRate: 100,      
        responsive: {
          0:{items:1},
          320:{items:2,margin: 15},
          480:{items:2,margin: 15},
          768:{items:3,margin: 15},
          992:{items:3,margin: 80}
        }
      });
    } else {
      $bannerList.trigger('destroy.owl.carousel');
    }    
  }
  initIndexBannerList();
  $(window).on('resize', $.debounce(100, initIndexBannerList))
  // Преимущества
  $("#features .features-list").owlCarousel({
    loop: false,
    rewind: true,
    lazyLoad: false,
    nav: false,
    dots: false,
    autoplay: false,
    smartSpeed: 500,
    touchDrag: true,
    pullDrag: true,
    responsiveClass: true,
    responsiveRefreshRate: 100,
    // autoWidth:true,
    responsive: {
      0:{items:1},
      320:{items:2,margin: 15,autoWidth:true},
      480:{items:2,margin: 15,autoWidth:true},
      768:{items:3,margin: 15,autoWidth:true},
      992:{items:3,margin: 80,autoWidth:true},
      1200:{items:4,margin: 50,autoWidth:false}
    }
  });
    // Отсчет даты до окончания акции
    counterDate();
    function counterDate() {
      // Устанавливаем дату обратного отсчета ММ-ДД-ГГ
      var end = $('.sale-counter').first().attr('end');
      if(!end) return;
      var countDownDate = new Date(end).getTime();
      function drawCounter() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);     
        // Вывод
        $('.sale-counter').each(function(i, el){
          $(el).find('.days span').text(days);
          $(el).find('.hours span').text(hours);
          $(el).find('.minutes span').text(minutes);
          $(el).find('.seconds span').text(seconds);
        })
        // Счетчик завершен
        if (distance < 0) {
          clearInterval(x);
          $(el).find('span').text("0");
        }
      }
      // Обновление счетчика каждую минуту
      var x = setInterval(drawCounter, 60000);      
      drawCounter();

    }  
  // Клик по табам в блоке новости
  $('#news .tabs-headerList').on('click', '.tabs-headerLink', function(event){
    event.preventDefault()
    
    var $link = $(this);
    var $parent = $link.parent('.tabs-headerItem');
    var tabId = $link.data('href');
    
    if ($parent.hasClass('active')){
      return;
    };

    preloadShow($('#news .tabs-body .preloader'))
 
    $parent.addClass('active').siblings().removeClass('active')
    $('#news .tabs-body .tabs-content').removeClass('active').filter('[id="' + tabId +'"]').addClass('active');
  })
  // Слайдер новостей (все новости без группировки)
  $("#news .all.owl-carousel").owlCarousel({
    margin: 30,
    loop: false,
    rewind: true,
    lazyLoad: true,
    nav: false,
    dots: false,
    navContainer: $('#news .navigation'),
    navText: [, ],        
    navText: ['<span class="material-icons">chevron_left</span>','<span class="material-icons">chevron_right</span>'],    
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    autoHeight: false,
    smartSpeed: 500,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    responsiveClass:true,
    responsive:{
      0:{items:2, margin: 15},
      481:{items:2, margin: 15},
      768:{items:3, margin: 30},
      992:{items: 4},
      1199:{items:4}
    }
  });

  // Количество товара для показа 
  var GOODS_INDEX = 8;
  
  // Весь каталог на главной
  if(catalog_full){
    var promises = $.map(catalog_full, function(el){
        return $.ajax(el.href + '?only_body=1&goods_view_type=1')
                  .then(function(d){
                      var $parentGridContainer = $('.products-container.' + el.id).find('.products-grid');
                      var $data = $(d);
                      var itemsLength = $data.find('.products-grid .item').length;
                      
                      
                      var $newProducts = $data.find('.products-grid').find('.item').removeClass('col-md-4').addClass('col-md-3').parent();
                      
                      $newProducts = $newProducts.html();
                      
                      if(!$parentGridContainer.find('.products-grid').length){
                        $parentGridContainer.append($newProducts);
                      }
                      
                      if(itemsLength > GOODS_INDEX){
                        $parentGridContainer.append($('<div class="show-more"><button class="button more">Показать все</button></div>'))
                      }
                      
                      lozad().observe();
                      Addto();
                      AddCart();
                      quantity();
                    });
    });

    $.when.apply(this, promises)
      .then(function(){
          // catalog_full = null;
          // $('.products-container').show();
    })
  }
  
  // Показать ещё
  $(document).on('click', '.show-more .button', function() {
    var $btn = $(this);
  
    if ($btn.hasClass('active')) {
      $btn
        .removeClass('active')
        .text('Показать все')
        .parent().siblings('.item').slice(GOODS_INDEX).hide()
    } else {
      $btn
        .addClass('active')
        .text('Скрыть все')
        .parent().siblings('.item').show()
    }
  })

  // Товары на главной
  ;(function(element){
      var $element = $(element);
      var itemNav = $('.item-nav', $element);
      var itemContent = $('.products-container', $element);  
      var $arrows = $('.pdt-nav-arrows .navigation')  
      itemNav.on('click', function(){
        var $this = $(this);
        var id = $this.data('href');

        if($this.hasClass('tab-nav-actived')) return false;
        itemNav.removeClass('tab-nav-actived');
        $this.addClass('tab-nav-actived');
        var itemActive = '.' + $this.data('href');
        itemContent.hide();
        preloadShow($(itemActive).find('.preloader'))

        setTimeout(function(){
          preloadHide($(itemActive).find('.preloader'))
        }, 300);
        $(itemActive, $element).fadeIn();
        $arrows.removeClass('_show').filter('[data-id="'+ id +'"]').addClass('_show');
      });
  })('#producttabs');

  $(".products-container.pdt-sale").each(function () {
    var $navBlock = $(this).find('.navigation');
    // 
    $(this).find('.products-grid').owlCarousel({        
      loop: false,
      rewind: true,
      lazyLoad: true,
      nav: true,
      dots: false,
      autoplay: false,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      navContainer: $navBlock,
      navText: [, ],        
      navText: ['<span class="material-icons">chevron_left</span>','<span class="material-icons">chevron_right</span>'],
      smartSpeed: 500,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      responsiveClass: true,
      responsiveRefreshRate: 100,
      responsive: {
        0:{items:1, margin: 15},
        320:{items:2, margin: 15},
        480:{items:2, margin: 15},
        540:{items:2, margin: 15},
        768:{items:3,margin: 30},
        992:{items:4,margin: 30},
        1200:{items:4,margin: 30}
      },          
      onInitialized: changeNavBtn
    });            
  })

  $(".products-container.pdt-best, .products-container.pdt-new, .products-container.pdt-index ").each(function () {
    var productId =  $(this).attr('data-id');
    var $navBlock = $(this).closest('#producttabs').find('.navigation[data-id="'+ productId +'"]');

    // 
    $(this).find('.products-grid').owlCarousel({        
      loop: false,
      rewind: true,
      lazyLoad: true,
      nav: true,
      dots: false,
      autoplay: false,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      navContainer: $navBlock,
      navText: [, ],        
      navText: ['<span class="material-icons">chevron_left</span>','<span class="material-icons">chevron_right</span>'],
      smartSpeed: 500,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      responsiveClass: true,
      responsiveRefreshRate: 100,
      responsive: {
        0:{items:1, margin: 15},
        320:{items:2, margin: 15},
        480:{items:2, margin: 15},
        540:{items:2, margin: 15},
        768:{items:3,margin: 30},
        992:{items:4,margin: 30},
        1200:{items:4,margin: 30}
      },          
      onInitialized: changeNavBtn
    });            
  })  

  function changeNavBtn(event){
    var items = event.item.count;
    var size = event.page.size;
    var $nav = $(event.target).siblings('.block-title').find('.navigation');
    
    if (items >= size){
      $nav.show();
    } else {
      $nav.hide();
    }
  }
}

// Дополнительные пункты меню в шапке Перенос пунктов меню
$(function(){
  if(getClientWidth() > 991){
    mainnav()
  }
})

function mainnav(){
  var overMenuExist = $('.overflowMenu li').length;
  if(overMenuExist){
   $('.overflowMenu li').removeClass('mainnav__replaced');
   $('.header-sections .mainnav__more').remove();
   $('.overflowMenu li').each(function(){
     $('.header-sections .header-sectionsList ').append($(this));
   })
  }
  menuWidth = $('.header-sections').width();
  menuCount = $('.header-sections .header-sectionsList  li').length + 1;
  var nextCheck = 0;
  var CurrentWidthCounter = 0;
  
  for(var i=1; i < menuCount;  i++){
    currentWidth = parseInt(Math.ceil($('.header-sections .header-sectionsList  li:nth-child('+i+')').width())) + 46;
    nextCheck += currentWidth;
    if(nextCheck > menuWidth){
      var a = i;
      for(a;a < menuCount;a++){
        $('.header-sections .header-sectionsList  li:nth-child('+ a +')').addClass('mainnav__replaced');
      }
      $('.header-sections .header-sectionsList').append('<li class="header-sectionsItem mainnav__more"><a class="header-catalogLink">Еще...</a></li>');
      $('.header-sections .header-sectionsList').find('.header-sectionsItem.mainnav__more').append('<ul class="overflowMenu header-subcatalog"></ul>')
      $('.header-sections .mainnav__replaced').each(function(){
        $('.overflowMenu').append($(this));
      });
      menuMorePosition = parseInt($('.mainnav__more').position().left);

      return false;
    }
  }
}

// Предзагрузчик
function preloadHide(currentPreloader) {
  var $preloader = currentPreloader || $('.preloader'),
  $spinner = $preloader.find('.content-loading');
  $spinner.fadeOut();
  $preloader.delay(500).fadeOut('slow');
}

function preloadShow(currentPreloader) {
  var $preloader = currentPreloader || $('.preloader'),
  $spinner = $preloader.find('.content-loading');
  $spinner.show();
  $preloader.show();
}

// Адаптивное меню и каталог
function OpenMenu() {
  $('.header-nav-btn').on('click', function () {
    $('.header-nav, .header-overlay').toggleClass('_visible');

    if(getClientWidth() <= 991 ){
      $('.header-nav').find('.header-nav__search').before($('.header-sectionsList'))
    }
  })
  $('.header-overlay, .header-nav__close-btn').on('click', function () {
    $('.header-nav, .header-overlay').removeClass('_visible');
  })
  $('.header-nav__tab').on('click', function () {
    var $tab = $(this);

    if($tab.hasClass('_active')){
      return
    }
    $tab.addClass('_active').siblings().removeClass('_active');

    if($tab.hasClass('_menu')){
      $('.header-nav__list').show();
      $('.header-sectionsList').hide();
    }
    if($tab.hasClass('_catalog')){
      $('.header-nav__list').hide();
      $('.header-sectionsList').show();
    }
  })    
  // Основной каталог в шапке
  function headerCatalog() {
    var e,
        $headerCatalog = $(".header-catalog"),
        $catalogBtn = $(".header-catalogBtn"),
        $catalogMenu = $(".header-catalogMenu"),
        $headerSubcatalog = $(".header-subcatalog"),
        $headerOverlay = $(".header-overlay"),                          
        $headerCloseBtn = $('.header-closeBtn');
        
      $catalogMenu.on('click', '.parent .header-arrow', function(evt){
        if (getClientWidth() <= 991) {
          evt.preventDefault()
          
          var $arrow = $(this);
          var $link = $arrow.parent();
          
          if($arrow.hasClass('active')){
            $arrow.removeClass('active')
            $link.removeClass('active').next('.sub').slideUp();
          } else {
            $arrow.addClass('active')
            $link.addClass('active').next('.sub').slideDown() ;
          }
          
        }                              
      });
  }
  headerCatalog();
  
  function removeActiveLinks(){
    if (getClientWidth() > 992) {
      var $headerCatalog = $('.header-catalogMenu');
      
      $headerCatalog.find('.header-catalogLink, .header-subcatalogTitle, .header-catalogMenu').removeClass('active');
      $headerCatalog.find('.header-subcatalog-third, .sub').show();
    }
  }
  $(window).on('resize', $.debounce(300, removeActiveLinks))

}

// Радио кнопки для модификаций
function newModification() {
  $('.goodsDataMainModificationsBlockProperty').each(function(){
    a = $(this).find('select option:selected').attr('value');
    $(this).find('.goodsDataMainModificationsValue[data-value="'+ a +'"]').addClass('active');
  });
  $('.goodsDataMainModificationsValue').click(function(){
    var prevModId = $(this).parent().find('.goodsDataMainModificationsValue').filter('.active').data('value')
    $(this).parent('.goodsDataMainModificationsValues').data('active-id', prevModId)
    $(this).parent().find('.goodsDataMainModificationsValue').removeClass('active');
    $(this).addClass('active');
    a = $(this).data('value');

    $(this).parent().parent().find('select option[value="' + a + '"]').prop('selected',true);
    $(this).parent().parent().find('select').trigger('change');
    
    $('.goodsDataMainModificationsBlockProperty').each(function(){
      dis = $(this).find('select option:disabled').attr('value');
      $(this).find('.goodsDataMainModificationsValue[data-value="'+ dis +'"]').removeClass('active');
      $(this).find('.goodsDataMainModificationsValue[data-value="'+ dis +'"]').addClass('disable');
    });
  });
}
// Поиск в шапке
$(function(){
  var $searchForm = $('#search_mini_form');
  
  $('.header-searchLink').click(function(e){
    e.preventDefault();
    if( getClientWidth() > 991 ){
      $(this).hide()
      $searchForm.fadeIn().addClass('_active')
    } else {
      $('.header-nav, .header-overlay').toggleClass('_visible');
      $('.header-nav').find('.header-nav__search').before($('.header-sectionsList'))
    }
  })
  // Запуск функций при изменении экрана
  function moveHeaderSectionList() {
    if(getClientWidth() > 991){
      $('.header-action').before($('.header-sectionsList'))
    }
  }
  $(window).resize($.debounce(300, moveHeaderSectionList));  
  $('.search .search-close').click(hideSearch);
  
  $(document).on('click', function(e){
    if($searchForm.hasClass('_active')) {
      if(!$(e.target).closest('#headerSearch').length){
        hideSearch()
      }
    }
  })
  
  function hideSearch(){
    $searchForm.fadeOut("fast", function() {
        // Анимация завершена.
        $('.header-searchLink').fadeIn().removeClass('_active')
    })
  }  
})
// Загрузка основных функций шаблона
$(function(){
  viewed();
  MainFunctions();
  outFunctions();
  ajaxnewqty();
  AddCart();
  Addto();
  quantity();
  OpenMenu();
  ppModal();
  newModification();
});

// Запуск основных функций для разных разрешений экрана
$(function(){
  if(getClientWidth() > 767){
    
  }
  // Запуск функций при изменении экрана
  $(window).resize(function(){
    if(getClientWidth() > 767){
      
    }
  });
});

// Политика конфиденциальности в модальном окне
function ppModal() {
  $(".pp a").click(function(event){
    event.preventDefault();
    var data = $("#fancybox-pp").html();
    $.fancybox({
      autoSize: true,
      maxWidth: 700,
      padding: 15,
      content: data
    });
  });
}
// Модальное окно
$(function(){
  function modal() {
    if(!$.cookie('modal')){
      // Если cookie не установлено появится окно с задержкой 3 секунды
      var delay = 3000;
      var data = $("#fancybox-popup").html();
      setTimeout(function(){
        $.fancybox({
          autoSize: true,
          maxWidth: 700,
          padding: 15,
          content: data
        });       
      }, delay)
      
     // Запоминаем в куках, что посетитель уже заходил
     $.cookie('modal', true, {
      // Время хранения cookie в днях
       expires: 1,
       path: '/'
     });    
    }
  }  
  // Уберите комментарии // со строчек ниже для запуска
  // modal();
})
// Баннер уведомления
$(function(){
  function banner() {
    // Если в куках нет записи
    if(!$.cookie('banner-top')){
     var $bannerTop = $('.banner-top');
     // Показываем баннер
     $bannerTop.show()
     
     $('.banner-top .banner-top-closeBtn').on('click', function(){
       // Скрываем баннер
       $bannerTop.hide()
       // Запоминаем в куках, что посетитель уже заходил
       $.cookie('banner-top', true, {
        // Время хранения cookie в днях
         expires: 1,
         path: '/'
       });         
     })
    }
  }  
  // Уберите комментарии // со строчек ниже для запуска
  // banner();
})

$(function() {
  $("tr.items td.cart-qty .input.cartqty").each(function() {
  if ($(this).val()> 1) {
      $(this).closest(".cart-qty").addClass("red-block");
      $(this).addClass("red-block");
  }
  })
})