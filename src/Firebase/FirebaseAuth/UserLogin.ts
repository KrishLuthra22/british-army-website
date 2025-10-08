// import { auth } from "../firebase";
// import {
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { createDocument } from "../CloudFirestore/SetData";
// import { getDocumentData } from "../CloudFirestore/GetData";
// // Login users using their Email and Password
// export const emailPasswordLogin = async (mail, pass) => {
//   const res = await signInWithEmailAndPassword(auth, mail, pass).catch((err) =>{
// //  alert("Incorrect Email or Password");
//     return false
//   }
//   );

//   return res;
// };

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// Login users using their Email and Password
export const emailPasswordLogin = async (mail, pass) => {
  try {
    const res = await signInWithEmailAndPassword(auth, mail, pass);

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return false;
  }
};

