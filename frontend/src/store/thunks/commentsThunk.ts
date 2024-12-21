import { createAsyncThunk } from "@reduxjs/toolkit";
import { IComment, IFormComment } from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchComments = createAsyncThunk<IComment[], number>(
  "comments/fetchComments",
  async (id) => {
    const commentsResponse = await axiosApi.get("/comments" + `?news_id=${id}`);
    return commentsResponse.data || [];
  },
);

export const createComments = createAsyncThunk<void, IFormComment>(
  "comments/createComments",
  async (IForm) => {
    return axiosApi.post("/comments", { IForm });
  },
);

export const deleteOneComments = createAsyncThunk<void, number>(
  "comments/deleteOneComments",
  async (commentsId: number) => {
    await axiosApi.delete(`comments/${commentsId}`);
  },
);
