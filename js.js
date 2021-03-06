"use strict";
const light = document.querySelector(".fa-sun");
const dark = document.querySelector(".fa-moon");
const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const screen = document.querySelector(".screen");
const equals = document.querySelector(".equals");
const resultBox = document.querySelector(".result");
const workings = document.querySelector(".workings");
console.log(eval("2 + 2"));

//
btn.querySelectorAll("div").forEach((ev) => {
  ev.classList.add("light");
});
dark.addEventListener("click", function () {
  dark.classList.toggle("not-active");
  light.classList.toggle("not-active");
  container.style.backgroundColor = "#292d36";
  container.style.color = "white";
  //   console.log(btn.querySelectorAll("div")[0]);
  btn.querySelectorAll("div").forEach((ev) => {
    ev.style.boxShadow = "4px 4px 5px #181b20, -1px -1px 5px #24282c";
    ev.classList.remove("light");
    ev.classList.add("dark");
  });
  screen.style.boxShadow =
    "inset 6px 6px 6px  #181b20 , inset -6px -3px 6px #777777";
});
light.addEventListener("click", function () {
  light.classList.toggle("not-active");
  dark.classList.toggle("not-active");
  container.style.backgroundColor = "#ebeff2";
  container.style.color = "black";
  //   console.log(btn.querySelectorAll("div")[0]);
  btn.querySelectorAll("div").forEach((ev) => {
    ev.style.boxShadow = "5px 5px 5px #cbced1, -5px -5px 10px white";
    ev.classList.add("light");
    ev.classList.remove("dark");
  });
  screen.style.boxShadow =
    "inset 6px 6px 6px #cbced1, inset -6px -6px 6px white";
});

//function for the caculations
const calculator = function (exp) {
  if (exp.includes("+")) {
    const data = exp.split("+");
    if (data[1] === "") return;
    return data.reduce((acc, cur) => acc + Number(cur), 0);
  }
  if (exp.includes("−")) {
    const data = exp.split("−");
    if (data[1] === "") return;
    let total = data[0];
    for (let index = 1; index < data.length; index++) {
      total -= data[index];
      return total;
    }
  }
  if (exp.includes("×")) {
    const data = exp.split("×");
    if (data[1] === "") return;
    return data.reduce((acc, cur) => acc * Number(cur), 1);
  }
  if (exp.includes("%")) {
    const data = exp.split("%");
    if (data[1] === "") return;
    let total = data[0];
    for (let index = 1; index < data.length; index++) {
      total %= data[index];
      if (total === 0) total = "0";
      return total;
    }
  }
  if (exp.includes("÷")) {
    const data = exp.split("÷");
    if (data[1] === "") return;
    let total = data[0];
    for (let index = 1; index < data.length; index++) {
      total /= data[index];
      if (total === Infinity) total = "0";
      return total;
    }
  }
};
let box1 = "";
let box2 = "";
let operator = "";
let counter = 0; //to let us know whether we are just starting the operation
let index = 0;
let clicked = 0;
function clearAll() {
  box1 = "";
  box2 = "";
  operator = "";
  counter = 0; //to  us know whether we are just starting the operation
  index = 0;
  clicked = 0;
  workings.textContent = "";
  resultBox.textContent = "";
}
const animateDown = function (resultBox) {
  //bring it down
  resultBox.style.transform = "translateY(0px)";
  resultBox.style.fontSize = "1.5rem";
  resultBox.style.transition = "transform 0s ease-in-out";
};
clearAll();
btn.addEventListener("click", function (e) {
  //guard clause
  if (e.target.classList.contains("btn")) return;
  //operators
  if (e.target.classList.contains("n") || e.target.classList.contains("o")) {
    if (e.target.textContent == "AC") {
      clearAll();
      return;
    }
    operator = e.target.textContent;
    if (workings.textContent == "") {
      animateDown(resultBox);
      //as if you are continuing the operation
      workings.textContent = box1 = resultBox.textContent;
      resultBox.textContent = box2 = "";
    }
    //plus or minus sign
    if (e.target.textContent == "⁺⁄₋") {
      box2 = resultBox.textContent;
      if (!box2) {
        box2 = workings.textContent;
        if (!Number(box2)) {
          clearAll();
          return;
        }
      }
      let n = box2;
      n = Number(n) * -1;
      box2 = String(n);
      box1 = workings.textContent = box2;
      box2 = "";
      counter = 0;
      return;
    }
    counter += 1;
    clicked += 1;
    if (counter > 1) {
      if (clicked > 1) {
        counter = 1;
      } else {
        box1 = resultBox.textContent;
        box2 = "";
      }
    }

    if (Number(workings.textContent.slice(-1))) {
      workings.textContent += operator;
      index = workings.textContent.length;
    } else {
      workings.textContent = workings.textContent.slice(0, -1) + operator;
      index = workings.textContent.length;
    }
    return;
  }
  clicked = 0;
  //del button
  if (e.target.textContent == "del") {
    if (counter == 0) {
      box1 = box1.slice(0, -1);
      workings.textContent = box1;
    } else {
      box2 = box2.slice(0, -1);
      workings.textContent = workings.textContent.slice(0, index) + box2;
      const data = box1 + operator + box2;
      // const result = eval(data);
      const result = calculator(data);
      resultBox.textContent = result;
    }
    return;
  }

  //moves up ahead of the condition below
  if (e.target.classList.contains("equals")) {
    //move up
    resultBox.style.transform = "translateY(-30px)";
    resultBox.style.fontSize = "3rem";
    resultBox.style.transition = "transform 0.2s ease-in-out";
    workings.textContent = "";
    counter = 0;
    return; //stop execution
  }
  //if what you press after the result button is a number
  if (resultBox.style.transform == "translateY(-30px)") {
    animateDown(resultBox);
    //clear all
    //similar to as if you are starting again
    workings.textContent = box1 = box2 = resultBox.textContent = "";
  }
  if (counter == 0) {
    box1 += e.target.textContent;
    // console.log(box1);
    workings.textContent = box1;
  } else {
    box2 += e.target.textContent;
    // console.log(box2);
    workings.textContent = workings.textContent.slice(0, index) + box2;
    const data = box1 + operator + box2;
    const result = calculator(data);
    if (!result && result != 0) {
      clearAll();
      return;
    }
    resultBox.textContent = result;
  }
});
