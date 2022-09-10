/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


export const firebaseConfig = {
	apiKey: "AIzaSyC32xCNSGjezt0E14n3Yd8EKMJp8xrMAcI",
	authDomain: "strategy-game-vue-tox.firebaseapp.com",
	projectId: "strategy-game-vue-tox",
	storageBucket: "strategy-game-vue-tox.appspot.com",
	messagingSenderId: "962211358219",
	appId: "1:962211358219:web:d347fea3559c574e98890e",
	measurementId: "G-RY17S1YBM2"
};
export const linkFirebase = "https://strategy-game-vue-tox-default-rtdb.europe-west1.firebasedatabase.app/"
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);