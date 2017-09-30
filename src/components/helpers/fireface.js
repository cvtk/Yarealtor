import firebase from '../../firebase.js';
const companiesRef = firebase.database().ref('companies'),
      usersRef = firebase.database().ref('users');

export default {
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