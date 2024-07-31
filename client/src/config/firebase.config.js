import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA93Zt8tUk_63pHi_BXemTMDew29VNUBbA",
  authDomain: "projectmusicapp-1c567.firebaseapp.com",
  projectId: "projectmusicapp-1c567",
  storageBucket: "projectmusicapp-1c567.appspot.com",
  messagingSenderId: "426679712859",
  appId: "1:426679712859:web:2a051188f01987e3b7937e"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
