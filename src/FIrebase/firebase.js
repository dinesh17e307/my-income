import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAAI3gpzWCvFAn6O2WS1FkrZEPG2_ykHcA",
  authDomain: "my-income-fbd33.firebaseapp.com",
  projectId: "my-income-fbd33",
  storageBucket: "my-income-fbd33.appspot.com",
  messagingSenderId: "571957745936",
  appId: "1:571957745936:web:99190cd33c602ad45eed95"
};

const app = initializeApp(firebaseConfig);
export default app