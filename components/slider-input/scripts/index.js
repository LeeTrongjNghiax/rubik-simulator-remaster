import { clamp } from "../../../scripts/utilities/index.js";

const initiateSliderInput = () => {
  const sliderInputs = document.querySelectorAll(`.c-slider-input`);

  sliderInputs.forEach((sliderInput) => {
    const lowerBoundInput = sliderInput.querySelector(`.c-slider-input__input-lower`);

    const upperBoundInput = sliderInput.querySelector(`.c-slider-input__input-upper`);

    const rangeInput = sliderInput.querySelector(`.c-slider-input__input-range`);
    const rangeValue = sliderInput.querySelector(`.c-slider-input__input-range-value`);

    rangeInput.min = +lowerBoundInput.value;

    lowerBoundInput.addEventListener(`input`, () => {
      rangeInput.min = +lowerBoundInput.value;
    });

    rangeInput.max = +upperBoundInput.value;

    upperBoundInput.addEventListener(`input`, () => {
      rangeInput.max = +upperBoundInput.value;
    });

    rangeValue.textContent = rangeInput.value;

    const normalizedValue = clamp(
      +rangeInput.value,
      +lowerBoundInput.value,
      +upperBoundInput.value
    );

    rangeValue.style.left = `${normalizedValue * 100}%`;

    rangeInput.addEventListener(`input`, () => {
      rangeValue.textContent = rangeInput.value;

      const normalizedValue = clamp(
        +rangeInput.value,
        +lowerBoundInput.value,
        +upperBoundInput.value
      );

      rangeValue.style.left = `${normalizedValue * 100}%`;
    });
  });
}

document.addEventListener(`DOMContentLoaded`, initiateSliderInput);
