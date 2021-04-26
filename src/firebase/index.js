import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDZjB-IdJyRr0vCLojy8QMoLPQf9paD1oM",
    authDomain: "image-react-52fcf.firebaseapp.com",
    projectId: "image-react-52fcf",
    storageBucket: "image-react-52fcf.appspot.com",
    messagingSenderId: "851176846105",
    appId: "1:851176846105:web:f13ac35d7022d3dabb4b88"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };