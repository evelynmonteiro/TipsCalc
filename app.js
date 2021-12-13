// ==================== MONEY MASK ============================

String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

function moneyMask(field) {
  let numberValue = field.value.replace(/[^\d]+/gi, "").reverse();
  let result = "";
  const mask = "##.###.###,##".reverse();
  for (let x = 0, y = 0; x < mask.length && y < numberValue.length; ) {
    if (mask.charAt(x) != "#") {
      result += mask.charAt(x);
      x++;
    } else {
      result += numberValue.charAt(y);
      y++;
      x++;
    }
  }
  field.value = result.reverse();
}

// ==================== TIPS APP ========================

/* Elements Select */

const tipsBtns = document.querySelectorAll(".tip-btn");
const customInput = document.getElementById("custom");
const bill = document.getElementById("bill");
const numberPeople = document.getElementById("numberPeople");

const tipAmout = document.getElementById("tipAmount");
const totalAmount = document.getElementById("totalAmount");
const resetBtn = document.getElementById("resetBtn");

const cantZeroMessage = document.getElementById("cantZero");

/* Control */

let selectedTip = "";
let hasBeenReset = true;

/* Validate Fields */

const validateFields = function () {
  if (
    bill.value !== "" &&
    selectedTip !== "" &&
    numberPeople.value !== "" &&
    numberPeople.value !== "0"
  ) {
    return true;
  } else {
    resetResultBoard();
    if (numberPeople.value == "0" || numberPeople.value == "") {
      numberPeople.classList.add("cant");
      cantZeroMessage.classList.remove("hidden");
    } else if (numberPeople.value !== "") {
      numberPeople.classList.remove("cant");
      cantZeroMessage.classList.add("hidden");
    }
  }
};

/* Calculate */

const calculate = function () {
  const billValueConvert = parseFloat(
    bill.value.replace(".", "").replace(",", ".")
  );

  const tipPercent = parseInt(selectedTip);
  const tipValue = billValueConvert * (tipPercent / 100);
  const total = tipValue + billValueConvert;

  const tipAmoutPerson = tipValue / parseInt(numberPeople.value);
  const totalAmountPerson = total / parseInt(numberPeople.value);

  tipAmout.innerHTML = "$" + tipAmoutPerson.toFixed(2);
  totalAmount.innerHTML = "$" + totalAmountPerson.toFixed(2);
  numberPeople.classList.remove("cant");
  cantZeroMessage.classList.add("hidden");
};

/* Resets */
const enableReset = function () {
  if (hasBeenReset == false) {
    resetBtn.classList.remove("disable");
  } else {
    resetBtn.classList.add("disable");
  }
};

const resetResultBoard = function () {
  tipAmout.innerHTML = "$0,00";
  totalAmount.innerHTML = "$0,00";
};

const resetAll = function () {
  bill.value = "";
  selectedTip = "";
  numberPeople.value = "1";
  numberPeople.classList.remove("cant");
  cantZeroMessage.classList.add("hidden");
  tipsBtns.forEach((tipBtn) => {
    tipBtn.classList.remove("tip-btn-selected");
  });
  customInput.value = "";
  resetResultBoard();
  hasBeenReset = true;
  enableReset();
};

/* Event Listernes */

tipsBtns.forEach((tipBtn) => {
  tipBtn.addEventListener("click", function () {
    tipsBtns.forEach((tipBtn) => {
      tipBtn.classList.remove("tip-btn-selected");
    });
    this.classList.add("tip-btn-selected");
    selectedTip = this.dataset.tip;
    if (validateFields()) {
      calculate();
    }
    hasBeenReset = false;
    enableReset();
  });
});

customInput.addEventListener("focus", function () {
  tipsBtns.forEach((tipBtn) => {
    tipBtn.classList.remove("tip-btn-selected");
  });
  selectedTip = customInput.value;
  if (validateFields()) {
    calculate();
  }
});

customInput.addEventListener("keyup", function () {
  selectedTip = customInput.value;
  if (validateFields()) {
    calculate();
  }
  hasBeenReset = false;
  enableReset();
});

resetBtn.addEventListener("click", function () {
  resetAll();
});

bill.addEventListener("keyup", function () {
  if (validateFields()) {
    calculate();
  }
  hasBeenReset = false;
  enableReset();
});

numberPeople.addEventListener("keyup", function () {
  if (validateFields()) {
    calculate();
  }
  hasBeenReset = false;
  enableReset();
});
