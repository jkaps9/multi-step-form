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

nextButton.addEventListener("click", () => {
  // TODO: check form validation first
  currentStep++;
  changeSections();
});

prevButton.addEventListener("click", () => {
  currentStep--;
  changeSections();
});

toggleSwitch.addEventListener("change", (e) => {
  if (e.target.checked) {
    currentPlan = "yearly";
    updatePrices();
  } else {
    currentPlan = "monthly";
    updatePrices();
  }
});

// TODO: remove for prod
currentStep = 2;
changeSections();
