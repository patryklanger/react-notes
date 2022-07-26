import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { collectionName, firebaseConfig } from '../data/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from '@firebase/firestore';
import { Note } from '../models/Note.model';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionRef = collection(db, collectionName);

export const addNoteDb = async (note: Note): Promise<string> => {
  const response = await addDoc(collectionRef, note);
  return response.id;
};

export const getNotesDb = async (): Promise<Note[]> => {
  const response = await getDocs(collectionRef);
  const notes: Note[] = [];
  response.docs.forEach((e) => {
    const id = e.id;
    const data: Note = e.data() as Note;
    const note: Note = {
      id: id,
      ...data,
    };
    notes.push(note);
  });
  return notes;
};

export const deleteNoteDb = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(collectionRef, id));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const editNoteDb = async (
  title: string,
  content: string,
  id: string
): Promise<void> => {
  await updateDoc(doc(collectionRef, id), {
    title: title,
    content: content,
  });
};
