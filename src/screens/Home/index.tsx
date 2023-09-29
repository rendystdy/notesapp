import { BackHandler, View } from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/AntDesign';

import {
	Button, Container, Text, Header, ListOfNotes,
} from '@components';
import { Colors } from '@constant';
import styles from './style';
import { NavigationHelper } from '@helpers';

const Home = () => {

	React.useEffect(() => {
		const backAction = () => {
			BackHandler.exitApp();
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		return () => backHandler.remove();
	}, []);

	return (
		<Container
			noPadding
			noScroll
			contentContainerStyle={ { backgroundColor: Colors.black.default } }>
			<View style={ styles.container }>
				<Header type='home' />
				<ListOfNotes />
			</View>
		</Container>
	);
};

export default Home;
