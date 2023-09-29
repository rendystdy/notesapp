import { Dispatches } from '@constant';
import { NotesInterface } from '@interfaces';

const initialState: NotesInterface.NotesState = {
	listofnotes: [],
	loading: false,
};

type Actions = { type: string; payload: any };

const authReducers = (
	state = initialState,
	action: Actions,
): NotesInterface.NotesState => {
	const { type, payload } = action;
	switch (type) {
		case Dispatches.SET_NEW_NOTE:
			const newData = state.listofnotes.concat(payload);
			return {
				...state,
				listofnotes: newData,
			};
		case Dispatches.SET_UPDATE_NOTE:
			const findIdNote = state.listofnotes.findIndex(item => item.id === payload.id);
			const newdata = state.listofnotes;

			newdata[findIdNote].title = payload.title;
			newdata[findIdNote].desc = payload.desc;
			newdata[findIdNote].timestamp = payload.timestamp;

			return {
				...state,
				listofnotes: newdata,
			};
		case Dispatches.REMOVE_ITEM_NOTE:
			const removeItemNote = state.listofnotes.filter(item => item.id !== payload);
			return {
				...state,
				listofnotes: removeItemNote,
			};
		case Dispatches.LOADING_NEW_NOTE:
			return {
				...state,
				loading: payload,
			};
		case Dispatches.LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default authReducers;
