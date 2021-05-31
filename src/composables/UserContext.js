import React, { useState, createContext, useEffect } from 'react';
import useGetUser from './useGetUser';

export const UserContext = createContext();

export const UserProvider = (props) => {
	const { user } = useGetUser();
	const [ currUser, setCurrUser ] = useState({
		id: '',
		username: '',
		userImg: '',
		email: ''
	});

	useEffect(
		() => {
			if (user) {
				setCurrUser({
					id: user.uid,
					username: user.displayName,
					userImg: user.photoURL ? user.photoURL : '',
					email: user.email
				});
			}
		},
		[ user ]
	);

	return (
		<UserContext.Provider value={[ currUser, setCurrUser ]}>
			{props.children}
		</UserContext.Provider>
	);
};
