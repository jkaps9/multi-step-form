const nextButton = document.querySelector("#nextBtn");
const prevButton = document.querySelector("#prevBtn");
const confirmButton = document.querySelector("#confirmBtn");
const sectionList = document.querySelectorAll(".form-section");
const headerList = document.querySelectorAll(".form-header");
const stepNumberList = document.querySelectorAll(
  ".progress-steps__item > .step-number",
);

let currentStep = 0;
const steps = ["one", "two", "three", "four"];

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

nextButton.addEventListener("click", () => {
  // TODO: check form validation first
  currentStep++;
  changeSections();
});

prevButton.addEventListener("click", () => {
  currentStep--;
  changeSections();
});
