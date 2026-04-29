const nextButton = document.querySelector("#nextBtn");
const prevButton = document.querySelector("#prevBtn");
const confirmButton = document.querySelector("#confirmBtn");

const sectionList = document.querySelectorAll(".form-section");
const headerList = document.querySelectorAll(".form-header");
const stepNumberList = document.querySelectorAll(
  ".progress-steps__item > .step-number",
);
const toggleSwitch = document.querySelector(".switch > input");
const planPrices = document.querySelectorAll(".plan__price");
const annualFreebies = document.querySelectorAll(".annual-freebie");
const addOnPriceList = document.querySelectorAll(".checkbox__price");

const nameInput = document.querySelector("input#name");
const emailInput = document.querySelector("input#email");
const phoneInput = document.querySelector("input#phone");

let currentStep = 0;
const steps = ["one", "two", "three", "four"];

let currentPlan = "monthly";

const prices = {
  monthly: ["$9/mo", "$12/mo", "$15/mo"],
  yearly: ["$90/yr", "$120/yr", "$150/yr"],
};

const addOnPrices = {
  monthly: ["+$1/mo", "+$2/mo", "+$2/mo"],
  yearly: ["+$10/yr", "+$20/yr", "+$20/yr"],
};

let summaryData = {
  name: "",
  email: "",
  phone: "",
  planTerm: "monthly",
  plan: "arcade",
  addOn1: false,
  addOn2: false,
  addOn3: false,
};

function addClassToListExceptOne(elementList, exception, className) {
  elementList.forEach((e) => {
    e.classList.add(className);
  });

  exception.classList.remove(className);
}

function addClassToOneInList(elementList, addToMe, className) {
  elementList.forEach((e) => {
    e.classList.remove(className);
  });

  addToMe.classList.add(className);
}

function changeSections() {
  if (currentStep > 0) {
    prevButton.classList.remove("hidden");
  } else if (currentStep === 0) {
    prevButton.classList.add("hidden");
  }

  if (currentStep === steps.length - 1) {
    confirmButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
  } else {
    confirmButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
  }

  addClassToListExceptOne(
    headerList,
    document.querySelector(`.form-header#${steps[currentStep]}`),
    "hidden",
  );
  addClassToListExceptOne(
    sectionList,
    document.querySelector(`.form-section#${steps[currentStep]}`),
    "hidden",
  );
  addClassToOneInList(
    stepNumberList,
    document.querySelector(
      `.progress-steps__item#${steps[currentStep]} > .step-number`,
    ),
    "active",
  );
}

function updatePrices() {
  const priceValues = currentPlan === "yearly" ? prices.yearly : prices.monthly;
  planPrices.forEach((planPrice, index) => {
    planPrice.textContent = priceValues[index];
  });

  annualFreebies.forEach((e) => {
    if (currentPlan === "yearly") {
      e.classList.remove("hidden");
    } else {
      e.classList.add("hidden");
    }
  });

  const addOnPriceValues =
    currentPlan === "yearly" ? addOnPrices.yearly : addOnPrices.monthly;
  addOnPriceList.forEach((addOnPrice, index) => {
    addOnPrice.textContent = addOnPriceValues[index];
  });
}

function checkStep() {
  let isValid = true;
  if (currentStep === 0) {
    if (nameInput.value.trim() === "") {
      showError(nameInput, "Name is required");
      isValid = false;
    }

    if (emailInput.value.trim() === "") {
      showError(emailInput, "Email is required");
      isValid = false;
    }

    if (phoneInput.value.trim() === "") {
      showError(phoneInput, "Phone is required");
      isValid = false;
    }
  }

  return isValid;
}

function showError(input, message) {
  const formControl = input.parentElement;
  const errorSpan = formControl.querySelector(".error-message");
  errorSpan.classList.add("active");
  errorSpan.textContent = message;
}

function clearError(input) {
  const formControl = input.parentElement;
  const errorSpan = formControl.querySelector(".error-message");
  errorSpan.classList.remove("active");
  errorSpan.textContent = "";
}

nextButton.addEventListener("click", () => {
  // TODO: check form validation first
  if (checkStep()) {
    currentStep++;
    changeSections();
  }
});

prevButton.addEventListener("click", () => {
  currentStep--;
  changeSections();
});

toggleSwitch.addEventListener("change", (e) => {
  if (e.target.checked) {
    currentPlan = "yearly";
    summaryData.planTerm = "yearly";
    updatePrices();
  } else {
    currentPlan = "monthly";
    summaryData.planTerm = "monthly";
    updatePrices();
  }
});

nameInput.addEventListener("change", (e) => {
  summaryData.name = e.target.value;
  if (nameInput.value.trim() !== "") {
    clearError(nameInput);
  } else {
    showError(nameInput, "Name is required");
  }
});

emailInput.addEventListener("change", (e) => {
  summaryData.email = e.target.value;
  if (emailInput.value.trim() !== "") {
    clearError(emailInput);
  } else {
    showError(emailInput, "Email is required");
  }
});

phoneInput.addEventListener("change", (e) => {
  summaryData.phone = e.target.value;
  if (phoneInput.value.trim() !== "") {
    clearError(phoneInput);
  } else {
    showError(phoneInput, "Phone is required");
  }
});

const planTypeInputs = document.querySelectorAll('[id^="plan-type"]');
planTypeInputs.forEach((e, index) => {
  e.addEventListener("input", () => {
    summaryData.plan = e.value;
    const priceValues =
      currentPlan === "yearly" ? prices.yearly : prices.monthly;
    planPrices.forEach((planPrice, index) => {
      planPrice.textContent = priceValues[index];
    });
    summaryData.planPrice = priceValues[index];
    console.log(summaryData);
  });
});

document.querySelector("#add-on-1").addEventListener("input", (e) => {
  summaryData.addOn1 = e.target.checked;
  console.log(summaryData);
});

document.querySelector("#add-on-2").addEventListener("input", (e) => {
  summaryData.addOn2 = e.target.checked;
  console.log(summaryData);
});

document.querySelector("#add-on-3").addEventListener("input", (e) => {
  summaryData.addOn3 = e.target.checked;
  console.log(summaryData);
});

// TODO: remove for prod
currentStep = 2;
changeSections();
