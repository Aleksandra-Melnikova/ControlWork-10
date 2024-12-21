import ButtonLoading from "../UI/ButtonLoading/ButtonLoading.tsx";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { IFormComment } from "../../types";
import { createComments } from "../../store/thunks/commentsThunk.ts";
import { selectAddCommentLoading } from "../../store/slices/commentsSlice.ts";

const CommentForm = () => {
  const params = useParams();
  const [form, setForm] = useState<IFormComment>({
    author: "",
    text: "",
    news_id: Number(params.id),
  });
  const createAddLoading = useAppSelector(selectAddCommentLoading);
  const dispatch = useAppDispatch();

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addNewComment = async (e: React.FormEvent, form: IFormComment) => {
    e.preventDefault();
    if (form.text.trim().length > 0) {
      console.log(form);
      await dispatch(createComments({ ...form }));
      toast.success("Comments added successfully.");
    } else {
      toast.warning("Fill in the text field.");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <form className="mx-auto w-75" onSubmit={(e) => addNewComment(e, form)}>
        <h3 className="my-4"> Add new comment</h3>
        <div className="d-flex  mb-2">
          <label className="me-4 col-2" htmlFor="author">
            Author
          </label>
          <input
            required
            type="text"
            onChange={changeForm}
            value={form.author}
            id="author"
            name="author"
            className="form-control "
          />
        </div>

        <div className="d-flex mb-2">
          <label className="me-4 col-2" htmlFor="phone">
            Description
          </label>
          <textarea
            required
            value={form.text}
            id="text"
            name="text"
            onChange={changeForm}
            className="form-control"
          />
        </div>

        <div className="d-flex">
          <ButtonLoading
            text={"Save"}
            isLoading={createAddLoading}
            isDisabled={createAddLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
