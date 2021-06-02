import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import useGetUser from './useGetUser';

const useFetchQuery = (collection, field) => {
	const [ dataQ, setDataQ ] = useState(null);
	const [ isPendingQ, setIsPendingQ ] = useState(true);
	const [ errorQ, setErrorQ ] = useState(null);
	const { user } = useGetUser();

	useEffect(
		() => {
			const abortCont = new AbortController();
			if (user) {
				projectFirestore
					.collection(collection, { signal: abortCont.signal })
					.where(field, 'array-contains', user.uid)
					.onSnapshot(
						(snap) => {
							let results = [];
							snap.docs.forEach((doc) => {
								results.push({ ...doc.data(), id: doc.id });
							});
							setDataQ(results);
							setErrorQ(null);
							setIsPendingQ(false);
						},
						(err) => {
							if (err.name === 'AbortError') {
								// console.log('fetch aborted');
							} else {
								setDataQ(null);
								setErrorQ(err.message);
								setIsPendingQ(false);
								// console.log(err.message);
							}
						}
					);
			}

			return () => abortCont.abort();
		},
		[ collection, field, user ]
	);

	return { dataQ, isPendingQ, errorQ };
};

export default useFetchQuery;
