import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import {
  createComments,
  deleteOneComments,
  fetchComments,
} from "../thunks/commentsThunk.ts";
import { IComment } from "../../types";

interface CommentState {
  isAddCommentLoading: boolean;
  comments: IComment[];
  isFetchCommentLoading: boolean;
  isDeleteCommentLoading: boolean;
}

const initialState: CommentState = {
  isAddCommentLoading: false,
  comments: [],
  isFetchCommentLoading: true,
  isDeleteCommentLoading: false,
};

export const selectAddCommentLoading = (state: RootState) =>
  state.comments.isAddCommentLoading;
export const selectFetchCommentLoading = (state: RootState) =>
  state.comments.isFetchCommentLoading;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectDeleteCommentLoading = (state: RootState) =>
  state.comments.isDeleteCommentLoading;

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComments.pending, (state) => {
        state.isAddCommentLoading = true;
      })
      .addCase(createComments.fulfilled, (state) => {
        state.isAddCommentLoading = false;
      })
      .addCase(createComments.rejected, (state) => {
        state.isAddCommentLoading = false;
      })
      .addCase(fetchComments.pending, (state) => {
        state.isFetchCommentLoading = true;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<IComment[]>) => {
          state.isFetchCommentLoading = false;
          state.comments = action.payload;
        },
      )
      .addCase(fetchComments.rejected, (state) => {
        state.isFetchCommentLoading = false;
      })
      .addCase(deleteOneComments.pending, (state) => {
        state.isDeleteCommentLoading = true;
      })
      .addCase(deleteOneComments.fulfilled, (state) => {
        state.isDeleteCommentLoading = false;
      })
      .addCase(deleteOneComments.rejected, (state) => {
        state.isDeleteCommentLoading = false;
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
