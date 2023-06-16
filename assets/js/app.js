// We select the forms
const formNewsletter = document.querySelector('#form-newsletter'),
      formSuccess = document.querySelector('#form-success');

// Select the discard button of the form success 
const dismissButton = formSuccess.querySelector('.dismiss-button');
const subscribedEmail = document.querySelector('#subscribed-email');

// Regular Expression to validate e-mail
const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

// Arrow function to change the visible state of a form
const toggleFormVisibility = ({ target }) => {
  
  // We avoid use magic strings and instead create an object with the variables
  const TYPE_FORM = Object.freeze({
    newsletter: 'form-newsletter',
    success: 'form-success'
  });

  const elementId = target.getAttribute('id');
  const isNewsletterForm = elementId === TYPE_FORM.newsletter; 

  // We condition which form will be shown and which one will be hidden
  const visibleForm = isNewsletterForm ? formSuccess    :  formNewsletter;
  const hiddenForm  = isNewsletterForm ? formNewsletter :  formSuccess;
  
  visibleForm.classList.remove('fade');

  setTimeout(() => {
    hiddenForm.classList.add('fade');
  }, 1500);

  // // We add the 'form--hidden' class for the hidden form and remove it for the visible form  
  setTimeout(() => {
    hiddenForm.classList.add('d-none');
    visibleForm.classList.remove('d-none');
    
    if(isNewsletterForm){
      formNewsletter.reset();
    }
  }, 2000);
}

// Arrow function to validate the newsletter form
const validFormNewsletter = (event) => {
  event.preventDefault();

  const { target } = event;

  const inputEmail = target.querySelector('.form__control');
  const messageError = target.querySelector('.form__error');

  const valueEmail = inputEmail.value.trim();
  const validEmail = regexEmail.test(valueEmail);

  // If the validation is incorrect then we add error classes for the input and for the message
  inputEmail.classList.toggle('form__control--error', !validEmail);
  messageError.classList.toggle('form__error--visible', !validEmail);

  try{
    if(!validEmail) throw('Valid email required');

      // If the validation is successful then show the spinner
      const messageSuccess = target.querySelector('.form__button__text');
      const spinner = target.querySelector('.spinner');

      messageSuccess.classList.add('d-none');
      spinner.classList.remove('spinner--hidden');

      toggleFormVisibility(event);

      // Restore the default values of the message and the spinner
      setTimeout(() => {
        messageSuccess.classList.remove('d-none');
        spinner.classList.add('spinner--hidden');
      }, 2000);

      subscribedEmail.textContent = valueEmail;
  }catch(error){
  }
}

// We add 'submit' listener event for the form newsletter and a 'click' listener event for the discard button 
formNewsletter.addEventListener('submit', validFormNewsletter);
dismissButton.addEventListener('click', toggleFormVisibility)