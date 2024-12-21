import React from "react";

import { New} from "../../types";

import { toast } from "react-toastify";
export interface IContactProps extends New {
  onDelete: (id: number) => void;
}

const NewsItem: React.FC<IContactProps> = ({
  id,
    date,
  image,
  title,
  onDelete
}) => {

  // const isDeleteLoading = useAppSelector(selectDeleteLoading);
  const deleteNew = async (id: number) => {
    onDelete(id);
    toast.success(`New was deleted successfully.`);
  };
  if (!image) {
    image =
      "https://cdni.iconscout.com/illustration/premium/thumb/404-not-found-illustration-download-in-svg-png-gif-file-formats--search-error-web-page-user-interface-pack-design-development-illustrations-6430763.png?f=webp";
  }


  return (
    <>
      <div
        className={
          "border border-1 border-dark-subtle p-1 rounded-2 row justify-content-between align-items-center contact-item mb-2"
        }
      >
        <div className={"img-block col-3"}>
          <img className={"photo-img"} src={image} alt={title} />
        </div>
        <div className={"col-7 ms-5 fs-2"}>
          <div >{title}</div>
          <div className={"row justify-content-between align-items-center"}>
            <div className={'col-6'}>Create at: {date}</div>
            <a className={'col-6'}>Read full new </a>
          </div>
        </div>
        <button onClick={()=>deleteNew(id)}>Delete</button>
      </div>
    </>
  );
};

export default NewsItem;
