import ButtonLoading from "../UI/ButtonLoading/ButtonLoading.tsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectAddLoading } from "../../store/slices/newsSlice.ts";
import { toast } from "react-toastify";
import FileInput from "../FileInput/FileInput.tsx";
import { IForm } from "../../types";
import { createNew } from "../../store/thunks/newsThunk.ts";

export interface IFormProps {
  existingForm?: IForm;
}
const initialForm: IForm = {
  title: "",
  description: "",
  image: null,
};

const Form: React.FC<IFormProps> = ({ existingForm = initialForm }) => {
  const [form, setForm] = useState<IForm>(existingForm);
  const navigate = useNavigate();
  const createAddLoading = useAppSelector(selectAddLoading);
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

  const addNewNews = async (e: React.FormEvent, form: IForm) => {
    e.preventDefault();
    if (form.title.trim().length > 0 && form.description.trim().length > 0) {
      await dispatch(createNew({ ...form }));
      navigate("/");
      toast.success("New added successfully.");
    } else {
      toast.warning("Fill in the title and description field.");
    }
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };
  return (
    <div className="container">
      <form className="mx-auto w-75" onSubmit={(e) => addNewNews(e, form)}>
        <h3 className="my-4"> Add new news</h3>
        <div className="d-flex  mb-2">
          <label className="me-4 col-2" htmlFor="name">
            Title
          </label>
          <input
            required
            type="text"
            onChange={changeForm}
            value={form.title}
            id="title"
            name="title"
            className="form-control "
          />
        </div>

        <div className="d-flex mb-2">
          <label className="me-4 col-2" htmlFor="phone">
            Description
          </label>
          <textarea
            required
            value={form.description}
            id="description"
            name="description"
            onChange={changeForm}
            className="form-control"
          />
        </div>

        <div className="d-flex align-items-start mt-4 mb-4">
          <FileInput
            onGetFile={fileEventChangeHandler}
            name={"image"}
            label={"Image"}
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

export default Form;
