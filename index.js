const body = document.querySelector("body");
const img = document.createElement("IMG");
const div = document.createElement("div");
const closeIcon = document.createElement("IMG");

// Отдел Меню
showIcon();
// записать масив в локал сторедж
checkWhiteList();

function showIcon() {
  img.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGkbFuRb3ztcaOF476Gj2izinzlBsVSpE5h58DamEnwcmiy_2z";
  img.style.position = "absolute";
  img.style.right = "10px";
  img.style.top = "100px";
  img.style.width = "30px";
  img.id = "icon_id";

  body.append(img);
}

const closeIconListener = closeIcon.addEventListener("click", () => {
  showIcon();
  const menu = document.getElementById("menu_id"),
    like = document.getElementById("like_id"),
    check = document.getElementById("check_id"),
    subscribe = document.getElementById("subscribe_id"),
    unsubscribe = document.getElementById("unsubscribe_id");
  whiteListBlock = document.getElementById("whiteListBlock_id");

  removeElementFrpmDon(
    menu,
    check,
    like,
    subscribe,
    unsubscribe,
    whiteListBlock
  );
});

const imgListener = img.addEventListener("click", () => {
  div.style.position = "absolute";
  div.style.right = "0";
  div.style.top = "200px";
  div.style.width = "300px";
  div.style.border = "2px solid";
  div.style.height = "auto";
  div.style.background = "ghostwhite";
  div.style.backgroundColor = "#38b8be75";
  div.style.borderRadius = "30px";
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.padding = "2%";
  div.id = "menu_id";

  function createButton(textContent, id, listener) {
    const button = document.createElement("BUTTON");
    button.style.width = "100%";
    button.style.borderRadius = "30px";
    button.style.border = "none";
    button.style.height = "40px";
    button.style.marginBottom = "20px";
    button.id = id;
    button.textContent = textContent;
    button.addEventListener("click", listener);
    return button;
  }
  const like = createButton("LIKE", "like_id", getFirstPostLike),
    check = createButton("лайкает случайный", "check_id", () =>
      checkAccaunt(init())
    ),
    subscribe = createButton(
      "подписаться",
      "subscribe_id",
      getFollowersSubscribe
    ),
    unsubscribe = createButton(
      "отписаться от неподписаных",
      "unsubscribe_id",
      openReaders
    ),
    whiteListBlock = document.createElement("div"),
    input = document.createElement("input");
  addPersoneToWhiteList = createButton(
    "ADD",
    "addToList_id",
    functionAddPersoneToWhiteList
  );
  whiteListBlock.id = "whiteListBlock_id";
  whiteListBlock.append(input, addPersoneToWhiteList);
  input.type = "text";
  input.id = "inputAddToWhiteList_id";
  closeIcon.src =
    "https://shopbarn.ru/catalog/view/theme/default/image/close-icon.png";
  closeIcon.style.width = "45px";
  closeIcon.style.position = "absolute";
  closeIcon.style.right = "10px";
  closeIcon.style.top = "-55px";
  div.append(closeIcon, like, check, subscribe, unsubscribe, whiteListBlock);
  body.append(div);

  const menuIcon = document.getElementById("icon_id");
  menuIcon.remove();
});

// додає користувача до білого списку
function functionAddPersoneToWhiteList() {
  const input = document.querySelector("#inputAddToWhiteList_id");
  const value = input.value.trim();
  const whiteListInLOcalStarage = JSON.parse(localStorage.getItem("whiteList"));
  const chechValidate = whiteListInLOcalStarage.includes(value);

  if (input.value.length && !chechValidate) {
    whiteListInLOcalStarage.push(value);
    localStorage.setItem("whiteList", JSON.stringify(whiteListInLOcalStarage));
    alert(`added  : ${value}`);
  }
}

//------------------------------------------------------------------------------------------------------------------------------------------
// // выбирает первый пост
function getFirstPostLike() {
  document.querySelector("#like_id").style.backgroundColor = "red";

  setTimeout(() => {
    const div = document.querySelector("._9AhH0");
    div.click();
    show(6000, 10000);
  }, 3000);
}

function show(min, max) {
  const time = randomInteger(min, max);
  setTimeout(function () {
    const likeButton = document.querySelector(".fr66n").children[0];
    const likeSvg = likeButton.children[0];
    const validate = likeSvg.getAttribute("fill") !== "#ed4956";
    const arrow = document.querySelector(".coreSpriteRightPaginationArrow");

    if (validate) {
      likeButton.click();
    }
    arrow.click();

    show(min, max);
  }, time);
}

//------------------------------------------------------------------------------------------------------------------------------------------
// часть бота . который лайкает случайный аккаунт
// на страничке инициализирует кнопки , по которым брать доступ
function init() {
  let menuButtomn,
    posts,
    followers,
    following,
    arr = [];
  arr.push(
    (menuButtomn = document.querySelectorAll(".-nal3")),
    (posts = menuButtomn[0]),
    (followers = menuButtomn[1]),
    (following = menuButtomn[2])
  );
  return arr;
}

// // открывает список пользователей
function getFollowers() {
  let arr = init();
  arr[2].click();
}

// // выбирает первый пост
function getFirstPost() {
  const post = document.querySelectorAll("._9AhH0");
  const getNumber = randomInteger(1, post.length);

  setTimeout(() => {
    post[getNumber - 1].click();
    setTimeout(likeFirstPhoto, 2100);
    // setTimeout(closeLikedPost, 3400);
    setTimeout(getFollowers, 5000);
    setTimeout(chooseOpenFolowers, 10000);
    setTimeout(() => {
      checkAccaunt(init());
    }, 15000);
  }, 4000);
}

//стравим лайк открывшему пользователю
function likeFirstPhoto() {
  const likeButton = document.querySelector(".fr66n").children[0];
  const likeSvg = likeButton.children[0];
  const validate = likeSvg.getAttribute("fill") !== "#ed4956";

  if (validate) {
    likeButton.click();
  }
}

// проверка на тип аккаунта
async function checkAccaunt(arr) {
  setTimeout(() => {
    try {
      if (checkPrivetAccaunt()) {
        console.log("Private accaunt");
        chooseFollowersInCloseAccount()
          ? setTimeout(() => {
              checkAccaunt(init());
            }, 5000)
          : () => {
              console.log("users nont found in privet ackaunt");
            };
      } else if (
        parseInt(arr[1].innerText) === 0 &&
        !checkPrivetAccaunt() &&
        parseInt(arr[2].innerText) !== 0
      ) {
        console.log("0 posts");
        setTimeout(getFollowers, 2300);
        setTimeout(chooseOpenFolowers, 10000);
        setTimeout(() => {
          checkAccaunt(init());
        }, 18000);
      } else if (
        parseInt(arr[1].innerText) === 0 &&
        !checkPrivetAccaunt() &&
        parseInt(arr[2].innerText) === 0 &&
        parseInt(arr[3].innerText) > 1
      ) {
        console.log("0 post 0 folowers");
        arr[3].click();
        setTimeout(() => {
          chooseOpenFolowers();
        }, 4000);
        setTimeout(() => {
          checkAccaunt(init());
        }, 8000);
      } else if (
        parseInt(arr[1].innerText) === 0 &&
        !checkPrivetAccaunt() &&
        parseInt(arr[2].innerText) === 0 &&
        parseInt(arr[3].innerText) === 0
      ) {
        let home = document.querySelector(
          ".glyphsSpriteUser__outline__24__grey_9.u-__7"
        );
        home.click();
        setTimeout(() => {
          checkAccaunt(init());
        }, 5000);
      } else if (parseInt(arr[1].innerText) >= 1) {
        console.log("normal accaunt");
        setTimeout(() => {
          getFirstPost();
        }, 5000);
      }
    } catch (error) {
      stsrtEgain();
    }
  }, 5000);
}
function stsrtEgain() {
  const homeButton = document.querySelector(".cq2ai");
  homeButton.click();

  setTimeout(() => {
    const people = document.querySelectorAll("._2dbep.qNELH.kIKUG");
    const length = randomInteger(
      0,
      document.querySelectorAll("._2dbep.qNELH.kIKUG").length
    );
    setTimeout(() => {
      people[length - 1].click();
    }, 1000);

    setTimeout(() => {
      checkAccaunt(init());
    }, 3000);
  }, 2000);
}

// выбрать пользователи из открытого списка
function chooseOpenFolowers() {
  let openFollowers = document.querySelectorAll(".FPmhX.notranslate._0imsa");
  openFollowers[Math.floor(Math.random() * openFollowers.length)].click();
  return true;
}

// выбрать случайного пользователя у закрытого аккаунта
function chooseFollowersInCloseAccount() {
  if (!(document.querySelectorAll(".FPmhX.notranslate.Qj3-a").length > 2)) {
    document.querySelectorAll(".XrOey")[2].firstElementChild.click();
    return true;
  }

  let closeFolowers = document.querySelectorAll(".FPmhX.notranslate.Qj3-a");

  if (closeFolowers.length === 0) {
    let home = document.querySelector(".FPmhX.notranslate.Qj3-a");
    home.click();
    return true;
  } else {
    closeFolowers[Math.floor(Math.random() * closeFolowers.length)].click();
    return true;
  }
}

// проверка , приватный ли аккаунт
function checkPrivetAccaunt() {
  let closeAccaunt = document.querySelector(".rkEop");
  if (closeAccaunt) {
    if (
      closeAccaunt.textContent === "This Account is Private" ||
      closeAccaunt.textContent === "Це приватний обліковий запис" ||
      closeAccaunt.textContent === "Это закрытый аккаунт"
    ) {
      return true;
    }
  }
  return false;
}

//------------------------------------------------------------------------------------------------------------------------------------------
//бот который подписывается

// // открывает список пользователей
function getFollowersSubscribe() {
  let arr = init();
  arr[2].click();
  setTimeout(scroll, 1000);
}

// проскроливает открытый список
function scroll() {
  let list = document.querySelector(".isgrP");
  let val1 = 0;
  let val2 = 100;

  let interval = setInterval(() => {
    list.scrollTo(val1, val2);
    val2 += 100;
    if (val2 > 25000) {
      subscribe();
      return clearInterval(interval);
    }
  }, 200);
}

// функция подписки
function subscribe() {
  let arr2 = document.querySelectorAll('.sqdOP.L3NKy[type="button"]');

  let item = 0;

  function show(min, max) {
    let time = randomInteger(min, max);

    setTimeout(function () {
      if (!arr2[item].className.includes("_8A5w5")) {
        arr2[item].click();
        item++;
        console.log(arr2[item], item, time);
        show(min, max);
      } else {
        item++;
        show(min, max);
      }
    }, time);
  }

  setTimeout(() => {
    console.log("start subscribe");
    show(10000, 25000);
  }, 1000);
  //------------------------------------------------------------------------------------------------------------------------------------------
}
//unsubscribe  who dont subscribe

// // открывает список пользователей кто подписан на тебя
function openReaders() {
  let nodeListButton = document.querySelectorAll(".-nal3");

  if (nodeListButton && nodeListButton.length) {
    const numberFolowers = getNumberFollowers(nodeListButton[1].text);

    nodeListButton[1].click();

    setTimeout(() => {
      unsubscribeScroll(numberFolowers);
    }, 2000);
  } else {
    alert("getFollowers тут ошибка");
  }
}

// проскроливает открытый список
function unsubscribeScroll(folowers) {
  // 3
  const list = document.querySelector(".isgrP");
  let val1 = 0;
  let val2 = 300;

  let count = 0;
  let folowersArrLength = document.querySelectorAll(".wo9IH").length;

  const interval = setInterval(() => {
    list.scrollTo(val1, val2);
    val2 += 150;

    if (count >= 10) {
      setTimeout(() => {
        closeFolowersBlock(getNames());
      }, 1000);
      return clearInterval(interval);
    }

    if (document.querySelectorAll(".wo9IH").length > folowersArrLength) {
      count = 0;
      folowersArrLength = document.querySelectorAll(".wo9IH").length;
    } else {
      count += 1;
    }
  }, 400);
}
//скрол для тех на кого подписан

function secontScroll(arr, folowers) {
  let list = document.querySelector(".isgrP");
  let val1 = 0;
  let val2 = 300;

  let count = 0;
  let folowersArrLength = document.querySelectorAll(".wo9IH").length;

  let interval = setInterval(() => {
    list.scrollTo(val1, val2);
    val2 += 150;
    if (count >= 10) {
      setTimeout(() => {
        checkOrSubscribeUser(arr);
      }, 1000);
      return clearInterval(interval);
    }

    if (document.querySelectorAll(".wo9IH").length > folowersArrLength) {
      count = 0;
      folowersArrLength = document.querySelectorAll(".wo9IH").length;
    } else {
      count += 1;
    }
  }, 400);
}

// функция которая берет весь список имен пользователей
const getNames = () => {
  // 4
  let arrA = document.querySelectorAll(".FPmhX.notranslate._0imsa");
  return Array.from(arrA).map((e) => e.textContent);
};

// закрыть окно после получения масива имен
function closeFolowersBlock(arr) {
  // 5

  document.querySelectorAll(".wpO6b")[1].click();
  setTimeout(() => {
    openUserFollow(arr);
  }, 2000);
}
// функция которая откроет список на кого я подписан
function openUserFollow(arr) {
  // 6
  const whiteListInLOcalStarage = JSON.parse(localStorage.getItem("whiteList"));
  const arrWithWhiteList = [...arr, ...whiteListInLOcalStarage];

  const nodeListButton = document.querySelectorAll(".-nal3");
  const numberFolowers = getNumberFollowers(nodeListButton[2].text);

  nodeListButton[2].click();
  setTimeout(() => {
    console.log("arr :", arrWithWhiteList);
    secontScroll(arrWithWhiteList, numberFolowers);
  }, 2000);
}

// функция проверки
function checkOrSubscribeUser(arr) {
  // 8
  const li = document.querySelectorAll(".wo9IH");
  let num = 0;

  myLoop();

  function myLoop() {
    setTimeout(() => {
      if (
        arr.includes(
          li[num].querySelector(".FPmhX.notranslate._0imsa").textContent
        )
      ) {
        // console.log("подписан ");
        num++;
        myLoop();
      } else {
        setTimeout(() => {
          li[num].querySelector('.sqdOP.L3NKy._8A5w5[type="button"]').click();
        }, randomInteger(30000, 40000));
        setTimeout(() => {
          console.log("dellete");
          document.querySelector(".aOOlW.-Cab_").click();
          num++;
          myLoop();
        }, randomInteger(41000, 50000));
      }
    }, 500);
  }
}

const getNumberFollowers = (folowers) =>
  parseInt(folowers.replace(/[^\d]/g, ""));

//------------------------------------------------------------------------------------------------------------------------------------------
// white List (LOCAL STARAGE)

function checkWhiteList() {
  const key = localStorage.getItem("whiteList");
  if (key === null) {
    localStorage.setItem("whiteList", JSON.stringify([]));
  }
}

//------------------------------------------------------------------------------------------------------------------------------------------
//helper function
function removeElementFrpmDon(...args) {
  args.forEach((el) => {
    el.remove();
  });
}

// получить число от диапазона
const randomInteger = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));
