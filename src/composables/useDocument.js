import { useState } from 'react';
import { projectFirestore } from '../firebase/config';
import useGetUser from './useGetUser';
import firebase from 'firebase/app';

const useDocument = () => {
	const [ isPending, setIsPending ] = useState(false);
	const [ error, setError ] = useState(null);
	const { user } = useGetUser();

	// const updateDoc = async (doc, id) => {
	//   setIsPending(true);
	//   setError(null);

	//   try {
	//     const res = await projectFirestore
	//       .collection(collection)
	//       .doc(id)
	//       .update(doc);
	//     setIsPending(false);
	//     return res;
	//   } catch (err) {
	//     console.log(err.message);
	//     setIsPending(false);
	//     setError("could not update document");
	//   }
	// };

	const updateField = async (collection, id, field) => {
		setIsPending(true);
		setError(null);
		if (user) {
			try {
				const res = await projectFirestore.collection(collection).doc(id).update({
					users: firebase.firestore.FieldValue.arrayUnion(user.uid)
				});
				// console.log(res);
				setIsPending(false);
				return res;
			} catch (err) {
				setError('could not update element in collection');
				setIsPending(false);
				console.log(err.message);
			}
		}
	};

	const addUser = async (doc, collection, id) => {
		setIsPending(true);
		setError(null);

		try {
			const res = await projectFirestore.collection(collection).doc(id).set(doc);
			console.log(res);
			setIsPending(false);
			return res;
		} catch (err) {
			setError('could not add doc in collection');
			setIsPending(false);
			console.log(err.message);
		}
	};

	const addDoc = async (doc, collection) => {
		setIsPending(true);
		setError(null);

		try {
			const res = await projectFirestore.collection(collection).add(doc);
			// setId(await res.id);
			setIsPending(false);
			return res;
		} catch (err) {
			setError('could not add doc in collection');
			setIsPending(false);
			console.log(err.message);
		}
	};

	const addSubDoc = async (doc, collection, collection2, id) => {
		setIsPending(true);
		setError(null);

		try {
			const res = await projectFirestore
				.collection(collection)
				.doc(id)
				.collection(collection2)
				.add(doc);
			setIsPending(false);
			return res;
		} catch (err) {
			setError('could not add doc in sub-collection');
			setIsPending(false);
			console.log(err.message);
		}
	};

	// const deleteDoc = async (id) => {
	//   const doc = projectFirestore.collection(collection).doc(id);
	//   setIsPending(true);
	//   setError(null);

	//   try {
	//     const res = await doc.delete();
	//     setIsPending(false);
	//     return res;
	//   } catch (err) {
	//     console.log(err.message);
	//     setIsPending(false);
	//     setError("could not delete the document");
	//   }
	// };

	return { error, isPending, addDoc, addSubDoc, addUser, updateField };
};

export default useDocument;
