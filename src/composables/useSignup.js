import { projectAuth } from '../firebase/config';
import { useState } from 'react';


const useSignup = () => {
	const [ error, setError ] = useState(null);

	const signup = async (email, password, displayName) => {
		setError(null);

		try {
			const res = await projectAuth.createUserWithEmailAndPassword(email, password);

			if (!res) {
				throw new Error('Could not complete the signup');
			}
			await res.user.updateProfile({ displayName });
			setError(null);

			return res;
		} catch (err) {
			// console.log(err.message);
			setError(err.message);
		}
	};

	return { error, signup };
};

export default useSignup;
