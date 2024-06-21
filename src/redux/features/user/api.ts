import type { AppDispatch } from "@/redux/store";
import instance from "@/utils/axios";
import { setLoading, setUser, setTokenLeft } from "./slice";
import { UserState } from "./slice";
import type { AxiosError } from "axios";

type ErrorRes = {
    isSuccess: boolean;
    message: string;
}

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

export const addVideoToPinecone = async (videoId: string) => {

    try {
        const { data } = await instance.post("/transcript", { videoId });
        return data;
    } catch (err) {
        const e = err as AxiosError
        return e.response?.data;
    }
}

export const askQuery = async (url: string, dispatch: AppDispatch) => {
    try {
        const { data } = await instance(url);
        dispatch(setTokenLeft(data.tokenLeft));
        return data;
    } catch (err) {
        const e = err as AxiosError

        if (e.response?.status === 403) {
            const errRes = e.response?.data as ErrorRes;
            console.error(errRes.message);
            return errRes.message;
        } else return "!!! Something went wrong. If this issue persists please contact us."

    }
};
