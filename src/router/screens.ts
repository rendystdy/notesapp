import { Auth, CreateNote, Home, Splash } from '@screens';

export const screens = [
	{
		name: 'Splash',
		component: Splash,
	},
	{
		name: 'Home',
		component: Home,
	},
	{
		name: 'Login',
		component: Auth.Login,
	},
	{
		name: 'CreateNote',
		component: CreateNote,
	},
] as const;
