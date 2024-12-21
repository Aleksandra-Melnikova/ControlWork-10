import { createAsyncThunk } from "@reduxjs/toolkit";
import { IForm, New} from "../../types";
import axiosApi from "../../axiosApi.ts";


export const fetchNews = createAsyncThunk<New[],void>(
    'news/fetchNews',
    async () => {
        const newsResponse = await axiosApi.get<New[]>('/news');
        return newsResponse.data || [];
    }
);

export const createNew = createAsyncThunk<void, IForm>(
    'news/createNew',
    async (IForm) => {
        const formData = new FormData();

        const keys = Object.keys(IForm) as (keyof IForm)[];

        keys.forEach(key => {
            const value = IForm[key];
            if( value !== null ) {
                formData.append(key, value);
            }
        })

        return axiosApi.post('/news', formData);
    }
);



export const deleteOneNew = createAsyncThunk<void, number>(
  "news/deleteOneNew",
  async (newId: number) => {
    await axiosApi.delete(`news/${newId}`);
  },
);


export const getOneNew = createAsyncThunk<IForm | null, number>(
  "news/getOneNew ",
  async (newId) => {
    const response = await axiosApi(
      `contacts/${newId}`,
    );
    return response.data || null;
  },
);
