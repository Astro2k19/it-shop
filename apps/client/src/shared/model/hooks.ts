import {
    useSelector,
    type TypedUseSelectorHook,
    useDispatch,
} from 'react-redux';
import { AppDispatch } from '@/app/store/appStore';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
