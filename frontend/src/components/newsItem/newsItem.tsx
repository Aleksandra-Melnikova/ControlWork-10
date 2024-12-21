import React from "react";

import { New } from "../../types";

import { toast } from "react-toastify";
import { apiURL } from "../../globalConstans.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectDeleteLoading } from "../../store/slices/newsSlice.ts";
import ButtonLoading from "../UI/ButtonLoading/ButtonLoading.tsx";
import { getOneNew } from "../../store/thunks/newsThunk.ts";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
export interface IContactProps extends New {
  onDelete: (id: number) => void;
}

const NewsItem: React.FC<IContactProps> = ({
  id,
  date,
  image,
  title,
  onDelete,
}) => {
  const dispatch = useAppDispatch();
  const isDeleteLoading = useAppSelector(selectDeleteLoading);
  const deleteNew = async (id: number) => {
    onDelete(id);
    toast.success(`New was deleted successfully.`);
  };
  const navigate = useNavigate();

  let newImage =
    "https://cdni.iconscout.com/illustration/premium/thumb/404-not-found-illustration-download-in-svg-png-gif-file-formats--search-error-web-page-user-interface-pack-design-development-illustrations-6430763.png?f=webp";
  if (image) {
    newImage = apiURL + "/" + image;
  }
  const getFullNew = async (id: number) => {
    await dispatch(getOneNew(id));
    navigate(`/news/${id}`);
  };
  const correctDate = dayjs(date).format("DD-MM-YYYY hh:mm:ss");
  return (
    <>
      <div
        className={
          "border border-1 border-dark-subtle rounded-2 row align-items-center mb-2 position-relative"
        }
      >
        <div className={"img-block col-3"}>
          <img className={"photo-img"} src={newImage} alt={title} />
        </div>
        <div className={"col-8 ms-5"}>
          <div className={"fs-2"}>{title}</div>
          <div className={"col-12 text-secondary fs-3"}>
            Create at: {correctDate}
          </div>
          <a
            className={"col-6 d-block fs-2 mt-4"}
            onClick={() => getFullNew(id)}
          >
            Read full new{" "}
          </a>
        </div>
        <div className={"btn-delete"}>
          <ButtonLoading
            isLoading={isDeleteLoading}
            isDisabled={isDeleteLoading}
            text={"Delete"}
            onClick={() => deleteNew(id)}
          ></ButtonLoading>
        </div>
      </div>
    </>
  );
};

export default NewsItem;
