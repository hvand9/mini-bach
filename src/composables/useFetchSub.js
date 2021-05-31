import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFetchSub = (collection, id, subCollection) => {
	const [ dataSub, setDataSub ] = useState(null);
	const [ isPendingSub, setIsPendingSub ] = useState(true);
	const [ errorSub, setErrorSub ] = useState(null);

	useEffect(
		() => {
			const abortCont = new AbortController();

			projectFirestore
				.collection(collection)
				.doc(id)
				.collection(subCollection, { signal: abortCont.signal })
				.orderBy('createdAt')
				.onSnapshot(
					(snap) => {
						let results = [];
						snap.docs.forEach((doc) => {
							results.push({ ...doc.data(), id: doc.id });
						});
						setDataSub(results);
						setErrorSub(null);
						setIsPendingSub(false);
					},
					(err) => {
						if (err.name === 'AbortError') {
							console.log('fetch aborted');
						} else {
							setDataSub(null);
							setErrorSub(err.message);
							setIsPendingSub(false);
							console.log(err.message);
						}
					}
				);

			return () => abortCont.abort();
		},
		[ collection, subCollection, id ]
	);

	return { dataSub, isPendingSub, errorSub };
};

export default useFetchSub;
