/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

require('dotenv').config()
console.log(process.env.API_FIREBASE_KEY);

export const firebaseConfig = {
	apiKey: process.env.API_FIREBASE_KEY,
	authDomain: "strategy-game-vue-tox.firebaseapp.com",
	projectId: "strategy-game-vue-tox",
	storageBucket: "strategy-game-vue-tox.appspot.com",
	messagingSenderId: "962211358219",
	appId: "1:962211358219:web:d347fea3559c574e98890e",
	measurementId: "G-RY17S1YBM2"
};
console.log(firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);