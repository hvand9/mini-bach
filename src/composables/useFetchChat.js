import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFetchChat = (collection, id, subCollection, idTable, chatCollection) => {
	const [ dataChat, setDataChat ] = useState(null);
	const [ isPendingChat, setIsPendingChat ] = useState(true);
	const [ errorChat, setErrorChat ] = useState(null);

	useEffect(
		() => {
			const abortCont = new AbortController();

			projectFirestore
				.collection(collection)
				.doc(id)
				.collection(subCollection)
				.doc(idTable)
				.collection(chatCollection, { signal: abortCont.signal })
				.orderBy('createdAt')
				.onSnapshot(
					(snap) => {
						let results = [];
						snap.docs.forEach((doc) => {
							doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
						});
						setDataChat(results);
						setErrorChat(null);
						setIsPendingChat(false);
					},
					(err) => {
						if (err.name === 'AbortError') {
							// console.log('fetch aborted');
						} else {
							setDataChat(null);
							setErrorChat(err.message);
							setIsPendingChat(false);
							// console.log(err.message);
						}
					}
				);

			return () => abortCont.abort();
		},
		[ collection, chatCollection, id, idTable, subCollection ]
	);

	return { dataChat, isPendingChat, errorChat };
};

export default useFetchChat;
