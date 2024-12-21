import { apiURL } from "../../globalConstans.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectFetchLoading, selectNew } from "../../store/slices/newsSlice.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import dayjs from "dayjs";
import CommentItem from "../../components/comentItem/cmmentItem.tsx";
import { useCallback, useEffect } from "react";
import {
  selectComments,
  selectFetchCommentLoading,
} from "../../store/slices/commentsSlice.ts";
import {
  deleteOneComments,
  fetchComments,
} from "../../store/thunks/commentsThunk.ts";
import { useParams } from "react-router-dom";
import CommentForm from "../../components/commentForm/commentForm.tsx";

const FullNew = () => {
  const comments = useAppSelector(selectComments);
  const isFetchCommentsLoading = useAppSelector(selectFetchCommentLoading);
  const dispatch = useAppDispatch();
  const oneNew = useAppSelector(selectNew);
  const isOneLoading = useAppSelector(selectFetchLoading);
  const params = useParams();
  const paramsNew = Number(params.id);
  const fetchAllComments = useCallback(async () => {
    await dispatch(fetchComments(paramsNew));
  }, [dispatch]);
  useEffect(() => {
    {
      void fetchAllComments();
    }
  }, [fetchAllComments]);

  const deleteComment = async (id: number) => {
    await dispatch(deleteOneComments(id));
    await fetchAllComments();
  };
  let newImage =
    "https://cdni.iconscout.com/illustration/premium/thumb/404-not-found-illustration-download-in-svg-png-gif-file-formats--search-error-web-page-user-interface-pack-design-development-illustrations-6430763.png?f=webp";
  let correctDate;
  if (oneNew) {
    if (oneNew.image) {
      newImage = apiURL + "/" + oneNew.image;
    }
    correctDate = dayjs(oneNew.date).format("DD-MM-YYYY hh:mm:ss");
  }
  return (
    <>
      {isOneLoading ? (
        <Spinner />
      ) : (
        <>
          {oneNew ? (
            <div className={"container mt-5"}>
              <div className={"row align-items-center"}>
                <div className={"img-block col-3"}>
                  <img
                    className={"photo-img"}
                    src={newImage}
                    alt={oneNew.title}
                  />
                </div>
                <div className={"col-9"}>
                  <h1>{oneNew.title}</h1>
                  <p className={"fs-4"}>{oneNew.description}</p>
                  <div className={"text-secondary fs-4"}>
                    At: {correctDate}{" "}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
      <h2 className={"mt-3"}>Comments:</h2>
      {comments.length > 0 || isFetchCommentsLoading ? (
        <>
          {isFetchCommentsLoading ? (
            <Spinner />
          ) : (
            <>
              {" "}
              {comments.map((c) => (
                <CommentItem
                  key={c.id}
                  id={c.id}
                  author={c.author}
                  text={c.text}
                  onDelete={() => deleteComment(c.id)}
                />
              ))}
            </>
          )}
        </>
      ) : (
        <p className="d-block text-center mt-5">No news, add a new new</p>
      )}
      <CommentForm />
    </>
  );
};

export default FullNew;
