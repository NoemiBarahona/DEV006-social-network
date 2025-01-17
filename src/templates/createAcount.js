/* eslint-disable no-alert */
/* eslint-disable no-console */
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, create } from '../lib/firebase.js';
import logoFoodiegram from '../img/logoSinfondo.png';
import retornar from '../img/arrow.png';

function createAcount(navigateTo) {
  const section = document.createElement('section');
  const logo = document.createElement('img');
  const caption = document.createElement('h2');
  const backgroundCreate = document.createElement('div');
  const form = document.createElement('form');
  const alertEmailParagraph = document.createElement('p');
  const alertPassparagraph = document.createElement('p');
  const alertConfirmPassparagraph = document.createElement('p');
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const inputConfPass = document.createElement('input');
  const buttonSingUp = document.createElement('button');
  const buttonReturn = document.createElement('button');

  logo.src = logoFoodiegram;
  logo.classList.add('logoimg');

  caption.textContent = 'Create Acount';
  caption.classList.add('caption');

  backgroundCreate.classList.add('backgroundCreate');

  inputName.placeholder = 'Name';
  inputName.classList.add('nameCreateacount');

  inputEmail.placeholder = 'Email';
  inputEmail.classList.add('emailCreateacount');
  inputEmail.type = 'email';
  inputEmail.name = 'email';
  alertEmailParagraph.classList.add('alerEmailParagraph');

  inputPass.placeholder = 'Password';
  inputPass.classList.add('passCreateacount');
  inputPass.type = 'password';
  inputPass.setAttribute('id', 'pass1');
  alertPassparagraph.classList.add('alertPassparagraph');

  inputConfPass.placeholder = 'Confirm password';
  inputConfPass.classList.add('confirmPassCreateacount');
  inputConfPass.type = 'password';
  inputConfPass.setAttribute('id', 'pass2');
  alertConfirmPassparagraph.classList.add('alertConfirmPassparagraph');

  buttonSingUp.textContent = 'Login';
  buttonSingUp.classList.add('login');
  buttonSingUp.addEventListener('submit', () => {
    navigateTo('/wall');
  });

  buttonReturn.src = retornar;
  buttonReturn.textContent = '.';
  buttonReturn.classList.add('returnCreateAcount');
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  inputEmail.addEventListener('input', (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(e.target.value)) {
      console.log(e.target.value);
      console.log('pasa la validación');
      alertEmailParagraph.textContent = '';
    } else {
      alertEmailParagraph.textContent = 'Email is not valid';
    }
  });

  inputPass.addEventListener('input', (e) => {
    const passRegex = /^.{6,12}$/;
    if (passRegex.test(e.target.value)) {
      console.log('pasa el pass');
      alertPassparagraph.textContent = '';
    } else {
      alertPassparagraph.textContent = 'Pass is not valid';
    }
  });

  inputConfPass.addEventListener('input', () => {
    // eslint-disable-next-line consistent-return
    function verificarClave() {
      const pass1 = document.getElementById('pass1');
      const pass2 = document.getElementById('pass2');
      if (pass1.value !== pass2.value) {
        alertConfirmPassparagraph.textContent = 'Pass not mach';
      } else {
        alertConfirmPassparagraph.textContent = '';
        return true;
      }
    } verificarClave();
  });

  buttonSingUp.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const pass = inputPass.value;
    // const confPass = inputConfPass.value;

    // form.appendChild(paragraph);
    // if (pass.length < 6) {
    //   paragraph.textContent = 'The password must be at least 6 characters';
    //   return;
    // }
    // if (pass !== confPass) {
    //   paragraph.textContent = 'Passwords do not match';
    //   return;
    // }
    try {
      const userCredentials = await create(auth, email, pass);
      console.log(userCredentials);
      navigateTo('/wall');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use');
      } else if (error.code === 'auth/invalid-email') {
        alert('Invalid email');
      } else if (error.code === 'auth/weak-password') {
        alert('Password is too weak');
      }
      alertEmailParagraph.textContent = 'Email no es valido';
    }
  });

  form.append(
    inputName,
    inputEmail,
    alertEmailParagraph,
    inputPass,
    alertPassparagraph,
    inputConfPass,
    alertConfirmPassparagraph,
    buttonSingUp,
    // paragraph,
  );

  section.append(buttonReturn, logo, caption, form, backgroundCreate);
  return section;
}

export default createAcount;
