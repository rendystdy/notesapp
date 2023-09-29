/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationHelper, Ratio, useAppDispatch } from '@helpers';
import { Colors, Images } from '@constant';
import styles from './style';
import { Actions } from '@store';
// import { Text } from '@components';

function Splash() {

	const setDeviceHeight = useAppDispatch(Actions.miscAction.setDeviceHeight);

	useEffect(() => {

		setDeviceHeight(Ratio.getDeviceHeight());

		// save timeoutId to clear the timeout when the component re-renders
		const tm = setTimeout(() => {
			NavigationHelper.reset('Login');
		}, 3000);

		// clear timeout on re-render to avoid memory leaks
		return () => {
			clearTimeout(tm);
		};
	}, []);

	return (
		<View style={ styles.container }>
			<Icons
				name='notebook-multiple'
				size={ 104 }
				color={ Colors.yellow.default } />
			<Text
				style={ { letterSpacing: 2, color: Colors.yellow.default, fontFamily: 'inter', fontSize: 28, fontWeight: '700' } }
			>
				Notes
			</Text>
		</View>
	);
}

export default Splash;
