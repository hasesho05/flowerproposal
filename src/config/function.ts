import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from ".";

export const uploadImage = async (image: File): Promise<string> => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${image.name}`);
  await uploadBytes(storageRef, image);
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
};

export const createPost = async (
  title: string,
  engTitle: string,
  headline: string,
  content: string,
  imageUrl: string
): Promise<void> => {
  const post = { title, engTitle, headline, content, imageUrl };
  const postRef = doc(collection(db, "posts"), title);
  await setDoc(postRef, post);
};
``
