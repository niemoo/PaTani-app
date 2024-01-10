// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const FirebaseConfig = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyApIHcTpuzy8YSEH-bT7MGzf5HoNscB0G4',
    authDomain: 'patani-app.firebaseapp.com',
    databaseURL: 'https://patani-app-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'patani-app',
    storageBucket: 'patani-app.appspot.com',
    messagingSenderId: '1091022522698',
    appId: '1:1091022522698:web:1074a89967f4ba3b0f19b3',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
};

export default FirebaseConfig;
