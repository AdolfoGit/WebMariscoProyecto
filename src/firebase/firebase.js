import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
const firebaseConfig = {
  apiKey: "AIzaSyDNOE_BKFZl4zjBq98t3adrLEfIGuVxH6I",
  authDomain: "la-casa-del-marisco-web.firebaseapp.com",
  projectId: "la-casa-del-marisco-web",
  storageBucket: "la-casa-del-marisco-web.appspot.com",
  messagingSenderId: "23799570869",
  appId: "1:23799570869:web:2784f4c572768da8ed79fc",
  measurementId: "G-PTD40HRX5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFilesUsuarios (File){
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, File)
    const url = await getDownloadURL(storageRef)
    return url
}

export const uploadFilesProductos = async (File) =>{
    const storageRef = ref(storage, 'productos/'+v4());
    await uploadBytes(storageRef, File)
    const url = await getDownloadURL(storageRef)
    return url  
}