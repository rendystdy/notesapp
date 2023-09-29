import { Dispatches } from '@constant';
import { NavigationHelper } from '@helpers';
import { NotesInterface } from '@interfaces';
import { Dispatch } from 'redux';

export default {
	setNewNote: (payload: NotesInterface.INotes) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.SET_NEW_NOTE,
			payload: payload,
		});
		NavigationHelper.push('Home');
	},
	setUpdateNote: (payload: NotesInterface.INotes) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.SET_UPDATE_NOTE,
			payload: payload,
		});
		NavigationHelper.push('Home');
	},
	removeItemNote: (payload: number) => (dispatch: Dispatch) => {
		console.log('remove item note');
		dispatch({
			type: Dispatches.REMOVE_ITEM_NOTE,
			payload: payload,
		});
	},
};
