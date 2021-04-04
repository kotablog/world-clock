'use strict';

// 各々変数の定義
const showTimeZones = document.getElementById("showTimeZones"),
  noTimeZone = document.getElementById("noTimeZone"),
  selectTimeZonesForm = document.getElementById("selectTimeZonesForm"),
  timeZonesElement = document.getElementById("timeZonesElement"),
  selectedTimeZones = [],
  timeZones = [
    'Pacific/Auckland',  // オークランド（ニュージーランド）
    'Asia/Tokyo',  // 東京（日本）
    'Asia/Singapore',  // シンガポール
    'Asia/Shanghai',  // 上海
    'Asia/Hong_Kong',  // 香港
    'Asia/Calcutta',  // カルカッタ（インド）
    'Asia/Bahrain',  // バーレーン
    'Africa/Johannesburg',  // ヨハネスブルグ（南アフリカ）
    'Europe/Berlin',  // ベルリン（ドイツ）
    'Europe/Zurich',  // チューリッヒ（スイス）
    'Europe/London',  // ロンドン（イギリス）
    'America/New_York',  // ニューヨーク（アメリカ）
    'America/Toronto',  // トロント（カナダ）
  ];

// フォームのための設定
// timeZones配列を基に選択肢を作成
for (let i = 0; i < timeZones.length; i++) {
  let timeZoneElement = timeZones[i];
  const option = document.createElement("option");
  option.value = timeZoneElement;
  option.textContent = timeZoneElement;
  timeZonesElement.appendChild(option);
}

// 初期設定として入力フォームを非表示
selectTimeZonesForm.style.display = 'none';

// 説明文を非表示にするための関数
function hideHowto() {
  document.getElementById("howto").style.display = 'none';
}

// 入力フォームを表示するための関数
function showForm() {
  selectTimeZonesForm.style.display = '';
  document.getElementById("formBgSetting").style.backgroundColor = 'black';
}

// 入力フォームを非表示にするための関数
function hideForm() {
  selectTimeZonesForm.style.display = 'none';
}

// 入力フォームにて選択された場所を配列に追加
function addTimeZone() {
  // フォームのvalue値を取得
  const selectedTimeZone = timeZonesElement.value;

  // value値が存在するかどうかで分岐
  if (selectedTimeZone) {
    // セレクトボックスの初期化
    timeZonesElement.selectedIndex = 0;

    // 入力フォームの非表示
    selectTimeZonesForm.style.display = 'none';

    // 配列に地名を格納
    selectedTimeZones.push(selectedTimeZone);

    // li要素を作成
    const li = document.createElement("li");
    li.id = selectedTimeZone;

    showTimeZones.appendChild(li);

    // #noTimeZone要素を非表示
    noTimeZone.style.display = 'none';

    // clock();

  } else {
    // 要素が選択されていなけれは警告を表示
    alert('Alert - No Items Selected.');
  }
}

// 時間表示するための設定
// 日付を表示する関数
function showDate(timeZone) {
  const day = new Date();
  let tz = timeZone;
  let options = { timeZone: tz, hour12: false };
  const dayInfo = day.toLocaleDateString('en-GB', options);

  const ary = dayInfo.split("/");

  return `${ary[2]}/${ary[1]}/${ary[0]}`;
}

// 曜日を表示するための関数
function showDay(timeZone) {
  const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = new Date();
  let tz = timeZone;
  let options = { timeZone: tz, hour12: false };
  const dayInfo = day.toLocaleDateString('en-GB', options);

  const ary = dayInfo.split("/");
  const weekday = new Date(Number(ary[2]), Number(ary[1]) - 1, Number(ary[0]));
  const weekdayNumber = weekday.getDay();

  return dayArray[weekdayNumber];
}

// 時間をデジタル形式で表示する関数
function showDigitalClock(timeZone) {
  const time = new Date();
  const tz = timeZone;
  let options = { timeZone: tz };
  const timeInfo = time.toLocaleTimeString('en-GB', options);

  const ary = timeInfo.split(':');

  return `${ary[0]} : ${ary[1]} : ${ary[2]}`;
}

// 時間帯がAMかPMかを判別
function ampm(timeZone) {
  const time = new Date();
  const tz = timeZone;
  let options = { timeZone: tz };
  const timeInfo = time.toLocaleTimeString('en-GB', options);

  const ary = timeInfo.split(':');

  if (Number(ary[0]) < 12) {
    return "AM";
  } else {
    return "PM";
  }
}

// アナログ時計の基盤を作成
function makeAnalogClock(num) {
  const analogClock = document.createElement("div");

  const clock = document.createElement("div");
  clock.id = "clock";

  const divHour = document.createElement("div");
  divHour.id = "hour";
  const divMin = document.createElement("div");
  divMin.id = "min";
  const divSec = document.createElement("div");
  divSec.id = "sec";

  const divHr = document.createElement("div");
  divHr.id = "hr_" + num;
  divHr.classList.add("hr");
  const divMn = document.createElement("div");
  divMn.id = "mn_" + num;
  divMn.classList.add("mn");
  const divSc = document.createElement("div");
  divSc.id = "sc_" + num;
  divSc.classList.add("sc");

  divHour.appendChild(divHr);
  divMin.appendChild(divMn);
  divSec.appendChild(divSc);

  clock.appendChild(divHour);
  clock.appendChild(divMin);
  clock.appendChild(divSec);

  analogClock.appendChild(clock);

  return analogClock;
}

// 時間をアナログ形式で表示する関数
function showAnalogClock(timeZone, num) {
  const time = new Date();
  const tz = timeZone;
  let options = { timeZone: tz };
  const timeInfo = time.toLocaleTimeString('en-GB', options);

  const ary = timeInfo.split(':');

  const deg = 6;
  const hr = document.getElementById("hr_" + num);
  const mn = document.getElementById("mn_" + num);
  const sc = document.getElementById("sc_" + num);

  let hh = Number(ary[0]) * 30;
  let mm = Number(ary[1]) * deg;
  let ss = Number(ary[2]) * deg;

  hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
  mn.style.transform = `rotateZ(${mm}deg)`;
  sc.style.transform = `rotateZ(${ss}deg)`;
}

// li要素に時計を表示
function clock() {
  const li = document.querySelectorAll("li");

  for (let i = 0; i < li.length; i++) {
    li[i].innerHTML = `<p id="timeZone">${li[i].id}</p>`;
    li[i].insertAdjacentElement("beforeend", makeAnalogClock(i));
    li[i].insertAdjacentHTML("beforeend", `<p id="date">${showDate(li[i].id)} (${showDay(li[i].id)})</p>`);
    li[i].insertAdjacentHTML("beforeend", `<p id="time">${showDigitalClock(li[i].id)}</p>`);
    li[i].insertAdjacentHTML("beforeend", `<span id="ampm">${ampm(li[i].id)}</span>`);
    showAnalogClock(li[i].id, i);
  }
  setTimeout(clock, 1000);
}

// 表示した時計を全て非表示にし#noTimeZone要素を表示する関数
function deleteAll() {
  const li = document.querySelectorAll("li");
  for (let i = 0; i < li.length; i++) {
    li[i].style.display = 'none';
  }
  noTimeZone.style.display = '';
}

clock();