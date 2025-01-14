import imagenComida from '../img/comidaSinFondo.png';

function error(navigateTo) {
  const sectionerror = document.createElement('section');
  const imgcomida = document.createElement('img');
  const textoerror = document.createElement('h2');
  const buttonReturn = document.createElement('button');

  buttonReturn.textContent = '.';
  buttonReturn.classList.add('return');
  buttonReturn.addEventListener('click', () => {
    navigateTo('/wall');
  });

  imgcomida.src = imagenComida;
  imgcomida.classList.add('img-comida');

  textoerror.textContent = 'oops! Looks like you got lost in the alphabet soup. But dont worry,we are here to help you find the right path.';
  textoerror.classList.add('textoerror');

  sectionerror.append(buttonReturn, imgcomida, textoerror);
  return sectionerror;
}

export default error;
