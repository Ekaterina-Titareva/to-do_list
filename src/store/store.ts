import { createStore} from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import todosReducer from './reducers';
import { AppDispatch, RootState } from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = createStore(todosReducer);

export default store;
