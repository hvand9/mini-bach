import React, { useState, createContext } from 'react';
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

	return (
		<UserContext.Provider value={[ currUser, setCurrUser ]}>
			{props.children}
		</UserContext.Provider>
	);
};
