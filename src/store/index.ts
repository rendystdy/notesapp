import authAction from './auth/auth.action';
import authReducers from './auth/auth.reducer';

import miscAction from './misc/misc.action';
import miscReducers from './misc/misc.reducer';

import notesAction from './notes/notes.action';
import notesReducers from './notes/notes.reducer';

const Actions = {
	authAction,
	miscAction,
	notesAction,
};

const Reducers = {
	authReducers,
	miscReducers,
	notesReducers,
};

export {
	Actions,
	Reducers,
};
