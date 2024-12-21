import React from "react";
import { toast } from "react-toastify";
import ButtonLoading from "../UI/ButtonLoading/ButtonLoading.tsx";
import { useAppSelector } from "../../app/hooks.ts";
import { selectDeleteCommentLoading } from "../../store/slices/commentsSlice.ts";

interface Props {
  author: string;
  text: string;
  id: number;
  onDelete: (id: number) => void;
}

const CommentItem: React.FC<Props> = ({ author, text, id, onDelete }) => {
  const isDeleteLoading = useAppSelector(selectDeleteCommentLoading);
  const deleteComment = async (id: number) => {
    onDelete(id);
    toast.success(`Comment was deleted successfully.`);
  };

  return (
    <div
      className={
        "border border-1 d-flex flex-row p-3 justify-content-between align-items-center mb-4"
      }
    >
      <div className={"me-2"}>
        <strong>{author}</strong> wrote: {text}
      </div>
      <ButtonLoading
        onClick={() => deleteComment(id)}
        isLoading={isDeleteLoading}
        isDisabled={isDeleteLoading}
        type={"button"}
        text={"Delete"}
      ></ButtonLoading>
    </div>
  );
};

export default CommentItem;
