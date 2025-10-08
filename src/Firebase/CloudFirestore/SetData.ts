import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// Add Document to a Collection
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
    });
    return docRef;
  } catch (err) {
    console.error("Error adding document:", err);
    throw new Error(`Failed to add document to ${collectionName}: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
};

// Create a Document with DocId
export const createDocument = async (collectionName: string, docId: string, data: any, merge = false) => {
  const docRef = doc(db, collectionName, docId);
  await setDoc(docRef, data, { merge });
  return docRef;
};

// Update Document
export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
  return docRef;
};
