import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectFetchLoading, selectNews,
} from "../../store/slices/newsSlice.ts";
import { useCallback, useEffect } from "react";
import {
 deleteOneNew,
 fetchNews,
} from "../../store/thunks/newsThunk.ts";
import NewsItem from "../../components/newsItem/newsItem.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const Home = () => {
  const news = useAppSelector(selectNews);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const dispatch = useAppDispatch();
  const fetchAllNews = useCallback(async () => {
    await dispatch(fetchNews());
  }, [dispatch]);
  useEffect(() => {
    {
      void fetchAllNews();
    }
  }, [fetchAllNews]);

  const deleteContact = async (id: number) => {
    await dispatch(deleteOneNew(id));
    await fetchAllNews();
  };
  return (
    <>
      {news.length > 0 || isFetchLoading ? (
        <>
          {isFetchLoading ? (
            <Spinner />
          ) : (
            <>
              {" "}
              {news.map((n) => (
                <NewsItem
                    key={n.id}
                    id={n.id}
                    title={n.title}
                    image={n.image}
                    onDelete={() => deleteContact(n.id)} description={n.description} date={n.date}                />
              ))}
            </>
          )}
        </>
      ) : (
        <p className="d-block text-center mt-5">
          No news, add a new new
        </p>
      )}
    </>
  );
};

export default Home;
