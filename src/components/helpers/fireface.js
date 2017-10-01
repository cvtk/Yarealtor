import firebase from '../../firebase.js';
import md5 from 'js-md5';

const companiesRef = firebase.database().ref('companies'),
      usersRef = firebase.database().ref('users');

export default {
  storage: {
    uploadImage(file) {
      let result = [],
          subdir = md5(file.lastModified + file.size + file.name),
          ref = firebase.storage().ref();

      ['orig', 'small', 'medium' ].forEach( size => {
          let task = ref.child(`/images/${subdir}/${size}.jpg`).put(file);
          result.push(task);
      })

      return Promise.all(result);
    }
  },

  company: {
    remove(key) {
      return usersRef.orderByChild('company').equalTo(key).once('value', (users) => {
        users.forEach( user => usersRef.child(user.key).remove() )
        companiesRef.child(key).remove()
          .then( () => console.log('Company removed') )
          .catch(error => console.log( error ));
      })
    }
  },
  employee: {
    remove(key) {
      return usersRef.child(key).remove()
        .then( () => console.log('User removed') )
        .catch(error => console.log( error ));
    }
  }
}