// 取得所有 checkbox
var chk_arr = Array.from(document.getElementsByName("chkRights[]"));
// var chklength = chk_arr.length;
var tableEle1 = document.getElementById("openNum1");
var tableEle2 = document.getElementById("openNum2");

// 亂數函數（修正缺少的 rand()）

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 清除所有號碼勾選函數及清除結果
function reset() {
  chk_arr.forEach((chk) => {
    chk.checked = false;
    let label = document.querySelector(`label[for='${chk.id}']`);
    if (label) label.classList.remove("active");
  });
  let openani = document.getElementById("content_Open2");
  openani.classList.remove("content_Open2_aniopen");
  tableEle1.innerHTML = `
    
  `;
  tableEle2.innerHTML = `
    <p>投注號碼:</p>
    <p>中獎號碼數量:</p>
    <p>中獎號碼:</p>
    <p>特別號:</p>
    <p>獎項:</p>
    `;
  tableEle1.classList.remove("ball_style");
  tableEle2.classList.remove("ball_style");
}

// 自動選號函數
// function autoChoice() {
//   //檢查已選擇的ID
//   let u = chk_arr.filter((chk) => chk.checked).length;
//   if (u >= 5) {
//     reset();
//     u = 0;
//   }
//   let interva = setInterval(()=>{

//   }
//   )
//   while (u < 6) {
//     let chkData = rand(0, 48);
//     if (!chk_arr[chkData].checked) {
//       chk_arr[chkData].checked = true;

//       let label = document.querySelector(`label[for='${chk_arr[chkData].id}']`);

//       if (label) label.classList.add("active");
//       u++;
//     }
//   }

// }
function autoChoiceAniment() {
  autoChoice();
}

function autoChoice() {
  let u = chk_arr.filter((chk) => chk.checked).length;
  if (u >= 5) {
    reset();
    u = 0;
  }
  let interval = setInterval(() => {
    // 選滿 6 個後停止
    if (u >= 6) {
      clearInterval(interval);
      return;
    }
    let chkData = Math.floor(Math.random() * 49);
    if (!chk_arr[chkData].checked) {
      chk_arr[chkData].checked = true;
      let label = document.querySelector(`label[for='${chk_arr[chkData].id}']`);
      if (label);
      label.classList.add("active");
      u++; // 只選一個號碼
    }
  }, 120); // 每秒選 1 個號碼
}

// 監聽 checkbox 變化來切換 label 樣式
document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(function (checkbox) {
    let label = document.querySelector(`label[for='${checkbox.id}']`);
    if (!label) return; // 避免找不到對應的 label
    // 初始化時設定 label 樣式
    label.classList.toggle("active", checkbox.checked);
    // 監聽 change 事件
    checkbox.addEventListener("change", function () {
      label.classList.toggle("active", this.checked);
    });
  });
});

// 開獎函數
function openWinner() {
  let winBall = [];
  let Ball = [];
  let selectBall = [];
  // let totalBonus = rand(200000000, 20000000000);

 

  for (let i = 0; i <= 48; i++) {
    if (chk_arr[i].checked) {
      selectBall.push(addZero(i + 1));
    }
  }

  if (selectBall.length !== 6) {
    alert("投注號碼必須為 6 個");
    return false;
  }
  let openani = document.getElementById("content_Open2");
  openani.classList.add("content_Open2_aniopen");
  // 抽獎
  while (Ball.length < 7) {
    let chkData = rand(1, 49);
    if (!Ball.includes(chkData)) {
      Ball.push(addZero(chkData)); // 加入開獎號碼
      if (selectBall.includes(chkData)) {
        winBall.push(addZero(chkData));
      }
    }
  }

  function addZero(num) {
    return num < 10 ? "0" + num : num;
  }

  //把每個字各別打包在class裡面
  function coverToBall(arr, className, u) {
    let BallBgcolor = "";
    for (let i = 0; i < u; i++) {
      BallBgcolor += `<span class='${className}'>${arr[i]}</span>`;
    }
    return BallBgcolor;
  }
  //   coverToBall(Ball[6],style_red,1);
  let BallShow = coverToBall(Ball, "ball_style style_golden", 6);
  let specialNum = coverToBall([Ball[6]], "ball_style style_red", 1);
  let speciaWinBall = selectBall.includes(Ball[6]) ? specialNum : null;
  let winBallShow = coverToBall(
    winBall.sort((a, b) => a - b),
    "ball_style style_golden",
    winBall.length
  );

  tableEle1.innerHTML = `
    <p> ${BallShow}${specialNum}</p> 
    
    `;
  tableEle2.innerHTML = `
    <p>投注號碼: ${coverToBall(selectBall, "ball_style style_color", 6)}</p>
    <p>中獎號碼數量: ${winBall.length}</p>
    <p>中獎號碼: ${winBallShow || "無"}</p>
    <p>特別號: ${speciaWinBall || "無"}</p>
    <p>獎項: ${getBonus(winBall.length, speciaWinBall ? 1 : 0)}</p>
  `;
}

// 取得中獎資訊
function getBonus(level, speciaWinBall) {
  let bonusKey = `${level}-${speciaWinBall ? 1 : 0}`;

  switch (bonusKey) {
    case "6-0":
      return "頭獎";
    case "5-1":
      return "2獎（含特別號）";
    case "5-0":
      return "3獎";
    case "4-1":
      return "4獎（含特別號）:500";
    case "4-0":
      return "5獎:1000";
    case "3-1":
      return "6獎（含特別號）:500";
    case "2-1":
      return "7獎（含特別號）:400";
    case "3-0":
      return "普獎:400";
    default:
      return "無中獎";
  }
}
//按鈕控制新增或移除CSS
//開關
document.getElementById("slotRule").addEventListener("click", ListenrOpenClose  );
//關閉按鈕
document.querySelector(".bt_rule_close").addEventListener("click", ListenrOpenClose );

function ListenrOpenClose(){
  let ruleArea = document.querySelector(".rule_area");
  if (
    !ruleArea.classList.contains("rule_open") &&
    !ruleArea.classList.contains("rule_close")
  ) {
    ruleArea.classList.add("rule_open");
  } else {
    ruleArea.classList.toggle("rule_open");
    ruleArea.classList.toggle("rule_close");
  }
}

// document.getElementById("").addEventListener("click",function(){
  
// });