import { projectAuth } from '../firebase/config';
import { useState, useEffect } from 'react';

const useGetUser = () => {
	const [ user, setUser ] = useState(projectAuth.currentUser);
	useEffect(
		() => {
			const unsubscribe = projectAuth.onAuthStateChanged((_user) => {
				// console.log('user state changed. Current user is: ', _user);
				setUser(_user);
			});
			return () => {
				unsubscribe();
			};
		},
		[ user ]
	);

	return { user };
};

export default useGetUser;
