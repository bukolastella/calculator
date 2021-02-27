"use strict";
const light = document.querySelector(".fa-sun");
const dark = document.querySelector(".fa-moon");
const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const screen = document.querySelector(".screen");
const equals = document.querySelector(".equals");
const resultBox = document.querySelector(".result");
const workings = document.querySelector(".workings");
dark.addEventListener("click", function () {
  dark.classList.toggle("not-active");
  light.classList.toggle("not-active");
  container.style.backgroundColor = "#292d36";
  container.style.color = "white";
  console.log(btn.querySelectorAll("div")[0]);
  btn
    .querySelectorAll("div")
    .forEach(
      (ev) =>
        (ev.style.boxShadow = "4px 4px 5px #181b20, -1px -1px 5px #24282c")
    );
  screen.style.boxShadow =
    "inset 6px 6px 6px  #181b20 , inset -6px -3px 6px #777777";
});
light.addEventListener("click", function () {
  light.classList.toggle("not-active");
  dark.classList.toggle("not-active");
  container.style.backgroundColor = "#ebeff2";
  container.style.color = "black";
  console.log(btn.querySelectorAll("div")[0]);
  btn
    .querySelectorAll("div")
    .forEach(
      (ev) => (ev.style.boxShadow = "5px 5px 5px #cbced1, -5px -5px 10px white")
    );
  screen.style.boxShadow =
    "inset 6px 6px 6px #cbced1, inset -6px -6px 6px white";
});

//function for the caculations
const calculator = function (exp) {
  // if (exp.includes("⁺⁄₋")) {
  //   const neww = exp.split("⁺⁄₋");
  //   const newData = neww;
  //   console.log(exp.slice(0, 1));
  //   if (exp.slice(0, 1).includes("−")) {
  //     const data = "".concat(newData);
  //     console.log(data);
  //   } else {
  //     const data = "−".concat(newData);
  //     console.log(data);
  //   }
  // }
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
      console.log(total);
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

let workBox = "";
let showWorkBox = "";
let box1 = "";
let box2 = "";
let operator = [];
btn.addEventListener("click", function (e) {
  //guard clause
  if (e.target.classList.contains("btn")) return;
  if (e.target.classList.contains("n") || e.target.classList.contains("o")) {
    operator.push(e.target.textContent);
    if (operator.length > 1) workBox = resultBox.textContent;
    box1 = box2;
    box2 = "";
    console.log(box1, box2);
  } else {
    box2 += e.target.textContent;
    const data = [box1, box2].join(operator);
    const results = calculator(data);
    workings.textContent = showWorkBox;
    if (!results) {
      console.log("not ggod");
      return;
    }

    // workBox = results;
    resultBox.textContent = results;
    console.log("djksk");
    return;
  }

  workBox += e.target.textContent;
  showWorkBox += e.target.textContent;
  console.log("haa");
  if (resultBox.style.transform == "translateY(-30px)") {
    if (e.target.classList.contains("n") || e.target.classList.contains("o")) {
      workBox = resultBox.textContent + workBox;
      showWorkBox = workBox;
      resultBox.style.transform = "translateY(0px)";
      resultBox.style.fontSize = "1.5rem";
      resultBox.style.transition = "transform 0s ease-in-out";
      // resultBox.textContent = "";
    } else {
      resultBox.textContent = "";
      resultBox.style.transform = "translateY(0px)";
      resultBox.style.fontSize = "1.5rem";
    }
  }
  if (e.target.classList.contains("equals")) {
    //equals
    resultBox.style.transform = "translateY(-30px)";
    resultBox.style.fontSize = "3rem";
    resultBox.style.transition = "transform 0.2s ease-in-out";
    //clear
    workBox = "";
    showWorkBox = "";
    operator = [];
    workings.textContent = "";
    return;
  }
  const results = calculator(workBox);
  workings.textContent = showWorkBox;
  if (!results) {
    console.log("not ggod");
    return;
  }

  // workBox = results;
  resultBox.textContent = results;
});
//else {
//   //replace the last element (=) with the element before it
//   const replacement = String(operator.slice(-2, -1));
//   //   console.log();
//   //remove the = from the array
//   operator.pop();
//   operator.push(replacement);
//   //split from the second operator
//   let workingBox = workBox.slice(0, -1);
//   workBox = "";
//   //for 2+2+3+4 examples
//   if (operator.every((ev) => operator[0] == ev)) {
//     const results = calculator(workingBox);
//     console.log(results);
//     return;
//   }
//   //for both 2+6-3 and 2+2+2-6 examples
//   operator = [...new Set(operator)];
//   console.log(operator);
//   //remove the first element
//   operator.shift();
//   const replacement2 = String(operator.slice(-1));
//   console.log(replacement2);
//   operator.push(replacement2);
//   console.log(operator);
//   operator.forEach((ev, i) => {
//     if (i == operator.length - 1) {
//       console.log(operator);
//       const results = calculator(workingBox);
//       console.log(results);
//       operator = [];
//     } else {
//       const operate = workingBox.split(ev, 1);
//       console.log(operate);
//       const results = String(calculator(String(operate)));
//       workingBox = workingBox.replace(operate, results);
//     }
//   });
// }

// if (operator.length < 3) {
//     //removes the equals to sign which is the last element in the array
//     operator.pop();
//     //removes the equals to sign which is the last element in the string
//     const workingBox = workBox.slice(0, -1);
//     //clear the workBox
//     workBox = "";
//     operator = [];
//     console.log(workingBox);
//     const results = calculator(workingBox);
//     resultBox.textContent = results;
//   }
