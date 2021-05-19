import { projectAuth } from '../firebase/config';
import { useState } from 'react';

const useGetUser = () => {
	const [ user, setUser ] = useState(projectAuth.currentUser);

	projectAuth.onAuthStateChanged((_user) => {
		// console.log('user state changed. Current user is: ', _user);
		setUser(_user);
	});

	return { user };
};

export default useGetUser;
