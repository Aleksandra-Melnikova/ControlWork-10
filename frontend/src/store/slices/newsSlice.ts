import { IForm, New} from "../../types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
 createNew,
   deleteOneNew,
  fetchNews,
  getOneNew,
} from "../thunks/newsThunk.ts";
import { RootState } from "../../app/store.ts";

interface ContactState {
  isAddLoading: boolean;
  news: New[];
  isFetchLoading: boolean;
  isDeleteLoading: boolean;
  oneNew: IForm | null;
  isFetchOneNewLoading: boolean;
}

const initialState: ContactState = {
  isAddLoading: false,
  news: [],
  isFetchLoading: true,
  oneNew: null,
  isFetchOneNewLoading: false,
  isDeleteLoading: false,
};
export const selectAddLoading = (state: RootState) =>
  state.news.isAddLoading;
export const selectFetchLoading = (state: RootState) =>
  state.news.isFetchLoading;
export const selectNews = (state: RootState) => state.news.news;
export const selectDeleteLoading = (state: RootState) =>
  state.news.isDeleteLoading;
export const selectFetchOneNewLoading = (state: RootState) =>
  state.news.isFetchOneNewLoading;
export const selectNew = (state: RootState) => state.news.oneNew;

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNew.pending, (state) => {
        state.isAddLoading = true;
      })
      .addCase(createNew.fulfilled, (state) => {
        state.isAddLoading = false;
      })
      .addCase(createNew.rejected, (state) => {
        state.isAddLoading = false;
      })
      .addCase(fetchNews.pending, (state) => {
        state.isFetchLoading = true;
      })
      .addCase(
          fetchNews.fulfilled,
        (state, action: PayloadAction<New[]>) => {
          state.isFetchLoading = false;
          state.news = action.payload;
        },
      )
      .addCase(fetchNews.rejected, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(deleteOneNew.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteOneNew.fulfilled, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(deleteOneNew.rejected, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(getOneNew.pending, (state) => {
        state.isFetchOneNewLoading = true;
        state.oneNew = null;
      })
      .addCase(
          getOneNew.fulfilled,
        (state, action: PayloadAction<IForm | null>) => {
          state.isFetchOneNewLoading  = false;
          state.oneNew = action.payload;
        },
      )
      .addCase(getOneNew.rejected, (state) => {
        state.isFetchOneNewLoading  = false;
      })

  },
});

export const newsReducer = newsSlice.reducer;

