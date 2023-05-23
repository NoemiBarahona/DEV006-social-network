function newPost(navigateTo) {
  const section = document.createElement('section');
  const buttonReturn = document.createElement('button');
  const titleNewPost = document.createElement('h1');
  const form = document.createElement('form');
  const paragraphImg = document.createElement('p');
  const buttonPlus = document.createElement('img');
  const paragraphTitle = document.createElement('p');
  const textAreaTitle = document.createElement('textarea');
  const paragraphReview = document.createElement('p');
  const textAreaReview = document.createElement('textarea');
  const buttonSave = document.createElement('button');

  titleNewPost.textContent = 'New Post';
  titleNewPost.classList.add('titleNewPost');

  paragraphImg.textContent = 'Add Image';
  paragraphImg.classList.add('paragraphImg');

  buttonPlus.classList.add('buttonPlus');

  paragraphTitle.textContent = 'Add Title';
  paragraphTitle.classList.add('paragraphTitle');

  paragraphReview.textContent = 'Add Description';
  paragraphReview.classList.add('paragraphReview');

  textAreaTitle.classList.add('textAreaTitle');
  textAreaReview.classList.add('textAreaReview');

  buttonPlus.src = './img/icons-plus.png';
  buttonPlus.classList.add('buttonPlus');

  buttonReturn.textContent = '.';
  buttonReturn.classList.add('returnNewPost');
  buttonReturn.addEventListener('click', () => {
    navigateTo('/wall');
  });

  buttonSave.textContent = 'Save';
  buttonSave.classList.add('save');
  buttonSave.addEventListener('click', () => {
    navigateTo('/wall');
  });

  form.append(
    paragraphImg,
    buttonPlus,
    paragraphTitle,
    textAreaTitle,
    paragraphReview,
    textAreaReview,
  );

  section.append(buttonReturn, titleNewPost, form, buttonSave);
  return section;
}
export default newPost;

// window.addEventListener('DOMcontentloaded', () => {
//   console.log('works');
// });
