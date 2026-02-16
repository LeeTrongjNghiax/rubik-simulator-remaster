const initiateForm = () => {
  const form = document.querySelector(`.c-form`);

  if (!form) throw new Error(`Form not found`);

  form.addEventListener(`submit`, (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    console.log(Object.fromEntries(formData));
  });
}

document.addEventListener(`DOMContentLoaded`, initiateForm);
