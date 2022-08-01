/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { AppProvider } from './src/providers/AppProvider';
import { ActivityIndicator, StatusBar } from 'react-native';
import AppRoute from './src/Navigations/AppRoute';

const App = () => {

	const [permission, setPermission] = useState(null);

	const requestPermission = () => {
		request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
			.then((result) => {
				if (result === RESULTS.GRANTED) {
					setPermission(true);
				}
				else {
					requestPermission();
				}
			}
			)
			.catch((error) => {
				setPermission(false);
			}
			);
	};

	const checkPermission = () => {
		check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
			.then((result) => {
				console.log('================  ====================');
				console.log(result);
				console.log('====================================');
				if (result !== RESULTS.GRANTED) {
					requestPermission();
					setPermission(false);
				} else {
					setPermission(true);
				}
			})
			.catch((error) => {
				console.log('error');
				console.log(error);
				setPermission(false);
			});
	}

	useEffect(() => {
		checkPermission();
	}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		, []);

	return (
		(permission === null) ?
			<ActivityIndicator size="large" color="#0000ff" /> :
			permission === true ?
				<AppProvider>
					<StatusBar backgroundColor="#1F2128" />
					<AppRoute />
				</AppProvider>
				:
				<ActivityIndicator size="large" color="#0000ff" />
	)
};

export default App;
