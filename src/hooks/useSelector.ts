import { TypedUseSelectorHook } from 'react-redux';
import { useSelector as useSelectorT } from 'react-redux';
import { RootState } from '../state';

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorT;
