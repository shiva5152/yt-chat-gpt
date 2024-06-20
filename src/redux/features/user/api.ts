import type { AppDispatch } from "@/redux/store";
import instance from "@/utils/axios";
import { setLoading, setUser } from "./slice";
import { UserState } from "./slice";

export const getUser = async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        const { data } = await instance.get('/user');
        const user = data.user as UserState;
        dispatch(setUser({ _id: user._id, email: user.email, userId: user.userId, tokenLeft: user.tokenLeft, videos: user.videos, loading: false }));
        setLoading(false)
    } catch (e) {
        console.error(e);
        setLoading(false)
    }
}
