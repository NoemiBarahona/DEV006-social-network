// import { loginFirebase } from ".";

function login(navigateTo) {
  const section = document.createElement('section');
  const logo = document.createElement('img');
  const title = document.createElement('h1');
  const caption = document.createElement('h2');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonLogin2 = document.createElement('button');
  const buttonGoogle = document.createElement('button');
  const buttonReturn = document.createElement('button');

  logo.src = './img/logoSinfondo.png';
  logo.classList.add('logoimg');

  title.textContent = 'Welcome to Foodiegram';
  title.classList.add('title');

  caption.textContent = 'Login';
  caption.classList.add('caption');

  inputEmail.placeholder = 'Email';
  inputEmail.classList.add('email');

  inputPass.placeholder = 'Password';
  inputPass.classList.add('password');

  buttonLogin2.textContent = 'Login';
  buttonLogin2.classList.add('login2');
  buttonLogin2.addEventListener('click', () => {
    navigateTo('/wall');
    // loginFirebase()
  });
  buttonGoogle.textContent = 'continue with GOOGLE';
  buttonGoogle.classList.add('google');
  buttonGoogle.addEventListener('click', () => {
    navigateTo('/wall');
  });
  buttonReturn.textContent = '.';
  buttonReturn.classList.add('return');
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  form.append(inputEmail, inputPass, buttonLogin2, buttonGoogle, buttonReturn);
  section.append(logo, title, caption, form);
  return section;
}

export default login;