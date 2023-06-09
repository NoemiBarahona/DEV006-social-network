/* eslint-disable no-console */
/* eslint-disable arrow-parens */
import {
  onGetPost,
  deleteTask,
  getTask,
  addLike,
  removeLike,
  auth,
  signOutUser,
} from '../lib/firebase.js';

import iconoAgregarPost from '../img/iconoAgregar.png';
import exitPag from '../img/exit(1).png';
import likeCorazon from '../img/like.png';
import likeSinCorazon from '../img/like(1).png';
import editar from '../img/edit.png';
import eliminar from '../img/trash.png';

function wall(navigateTo) {
  const divWall = document.createElement('div');
  divWall.classList.add('divWall');
  const exit = document.createElement('img');
  const contenedor = document.createElement('div');
  contenedor.classList.add('contenedor');
  const iconoAgregar = document.createElement('img');
  const postContenedor = document.createElement('div');
  postContenedor.setAttribute('id', 'postContenedor');
  postContenedor.classList.add('postContenedor');

  exit.src = exitPag;
  exit.classList.add('exit');

  exit.addEventListener('click', (e) => {
    e.preventDefault();
    signOutUser()
      .then(() => {
        navigateTo('/');
      });
  });

  iconoAgregar.src = iconoAgregarPost;
  iconoAgregar.classList.add('iconoAgregar');
  iconoAgregar.addEventListener('click', () => {
    navigateTo('/newpost');
  });

  let mostrar = false;

  contenedor.append(iconoAgregar);

  divWall.append(exit, postContenedor, contenedor);

  onGetPost((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const isCurrentUser = post.userid;
      // Verificar si el usuario actual coincide con el usuario asociado a la publicación

      html += `
        <div>
          <div class='nameUser'>
            <h3>${post.username.charAt(0).toUpperCase() + post.username.split('@')[0].slice(1)}</h3>
            <p class='mood'>${post.mood}</p>
          </div>
          <div class='statusUser'>
            <h3>${post.title}</h3>
            <p>${post.description}</p>
          </div>
              <div id='editDelete'>
                ${post.likes.includes(auth.currentUser.uid) ? `
                <img class='btn-like' data-id='${doc.id}' data-liked='${post.likes.includes(auth.currentUser.uid)}' src = ${likeCorazon} alt='like' />` : `<img class='btn-like' data-id='${doc.id}' 
                data-liked='${post.likes.includes(auth.currentUser.uid)}' src= ${likeSinCorazon} alt='like' />`}
                <span class='count-like'>${post.likes.length || ''}</span>
                <div id='acciones'${isCurrentUser === auth.currentUser.uid ? '' : ' class="hidden"'}> 
                <img class='deleteButton' data-id='${doc.id}' data-uid='${post.userid}' src= ${eliminar} alt='trash'/>
                <img class='editButton' data-id='${doc.id}' data-uid='${post.userid}' src= ${editar} alt='edit'/>
              </div>
          </div>

        </div>
        <div id='avisoBorrar' style='display:none'> 
          <p>Delete post?</p>
          <button id='delete'>Delete</button>
          <button id='cancel'>Cancel</button>
        </div>
      `;
    });

    postContenedor.innerHTML = html;

    const btnsDelete = postContenedor.querySelectorAll('.deleteButton');
    const avisoBorra = document.getElementById('avisoBorrar');

    btnsDelete.forEach(btn => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        // console.log(dataset)
        const borrando = avisoBorra.querySelector('#delete');
        const cancelar = avisoBorra.querySelector('#cancel');
        borrando.addEventListener('click', () => {
          // const username = id.userid
          const user = auth.currentUser;
          console.log(user.uid, 'user');

          if (dataset.uid === user.uid) {
          // console.log(userid, 'userid')
            deleteTask(dataset.id);
            console.log(deleteTask, 'task');
          } // estaba el else
        });

        cancelar.addEventListener('click', () => {
          avisoBorra.style.display = 'none';
        });

        avisoBorra.style.display = 'block';
      });
    });

    const editButton = postContenedor.querySelectorAll('.editButton');

    editButton.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const doc = await getTask(e.target.dataset.id);
        console.log(doc);
        const newusuario = e.target.dataset.uid;
        const user = auth.currentUser;
        const identidad = doc.id;
        const post = doc.data();
        if (newusuario === user.uid) {
          navigateTo('/newpost', { post, identidad });
        }
      });
    });

    const btnLike = postContenedor.querySelectorAll('.btn-like');

    btnLike.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // console.log(e.target.dataset.liked, "***");
        if (e.target.dataset.liked === 'false') {
          addLike(e.target.dataset.id);
          mostrar = true;
          console.log(mostrar);
        } else if (e.target.dataset.liked === 'true') {
          removeLike(e.target.dataset.id);
        }
      });
    });
  });
  return divWall;
}

// eslint-disable-next-line eol-last
export default wall;
