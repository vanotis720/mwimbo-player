/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { AppProvider } from './src/providers/AppProvider';
import { StatusBar } from 'react-native';
import AppRoute from './src/Navigations/AppRoute';

const App = () => {

	const [permission, setPermission] = useState(null);

	const requestPermission = () => {
		check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
			.then((result) => {
				if (result !== RESULTS.GRANTED) {
					setPermission(false);
				} else {
					setPermission(true);
				}
			})
			.catch((error) => {
				console.log(error);
				setPermission(false);
			});
	}

	useEffect(() => {
		console.log('useEffect ' + permission);
		requestPermission();
		if (permission === null) {
			requestPermission();
		}
		else if (permission === false) {
			console.log('Permission denied');
			requestPermission();
		}
	}, [permission]);

	return (
		<AppProvider>
			<StatusBar backgroundColor="#1F2128" />
			<AppRoute />
		</AppProvider>
	)
};

export default App;
