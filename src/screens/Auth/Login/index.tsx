import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { FormikProps, useFormik } from 'formik';
import TouchID from 'react-native-touch-id';

import { Images, Colors } from '@constant';
import { Button, Container, Input, Text } from '@components';
import { Auth } from '@validator';
import { NavigationHelper } from '@helpers';
import Toast from 'react-native-toast-message';

interface MyValues {
	password: string,
}

const optionalConfigObject = {
	title: 'Authentication Required', // Android
	imageColor: '#e00606', // Android
	imageErrorColor: '#ff0000', // Android
	sensorDescription: 'Touch sensor', // Android
	sensorErrorDescription: 'Failed', // Android
	cancelText: 'Cancel', // Android
	fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
	unifiedErrors: false, // use unified error messages (default false)
	passcodeFallback: false,
};

const Login = () => {

	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const formik: FormikProps<MyValues> = useFormik<MyValues>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: Auth.LoginValidationSchema,
		initialValues: {
			password: '',
		},
		onSubmit: () => {
			NavigationHelper.push('Home');
		},
	});

	React.useEffect(() => {
		TouchID.isSupported(optionalConfigObject)
			.then(biometryType => {
				// Success code
				if (biometryType === 'FaceID') {
					TouchID.authenticate('to notes app', optionalConfigObject)
						.then(_ => {
							NavigationHelper.replace('Home');
						})
						.catch(_ => {
							Toast.show({
								type: 'error',
								text1: 'Authentication Failed',
								text2: 'Oops, sorry, Authentication Failed',
							});
						});
				} else {
					TouchID.authenticate('to notes app', optionalConfigObject)
						.then(_ => {
							NavigationHelper.replace('Home');
						})
						.catch(_ => {
							Toast.show({
								type: 'error',
								text1: 'Authentication Failed',
								text2: 'Oops, sorry, Authentication Failed',
							});
						});
				}
			})
			.catch(error => {
				// Failure code
				console.log(error);
			});
	}, []);

	return (
		<Container
			noPadding
			contentContainerStyle={ { backgroundColor: Colors.black.default } }>
			<View style={ { flex: 1, padding: 30 } }>
				<Text
					color={ Colors.yellow.default }
					size={ 24 }
					weight='700'
					mt={ 30 }>View Notes</Text>
				<Text
					color={ Colors.gray.default }
					mt={ 10 }
					numberOfLines={ 1 }>Enter your locked notes password.</Text>
				<View style={ styles.form_container }>
					<Input
						formik={ formik }
						name='password'
						label='Password'
						placeholder='Enter your password'
						mt={ 20 }
						secureTextEntry />
				</View>
				<Button
					onPress={ () => { setEnableValidation(true); formik.handleSubmit(); } }
					backgroundColor={ Colors.yellow.default }
					text='Ok'
					weight='bold'
					color='white'
					mt={ 30 } />
			</View>
		</Container>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 30,
		flex: 1,
	},
	social_container: {
		flexDirection: 'row',
		marginTop: 20,
	},
	form_container: {
		marginTop: 30,
	},
	register_container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30,
	},
	social_button: {
		flex: 1,
		marginHorizontal: 8,
	},
});
export default Login;
