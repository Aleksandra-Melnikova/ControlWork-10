import React, { useRef, useState } from 'react';


interface Props {
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  onGetFile:(e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput:React.FC<Props> = ({name,onGetFile, label}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
    onGetFile(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type={'file'}
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <div className={'d-flex flex-row  w-100'} >
        <div className={" col-8 "}>
          <label className={'me-5'}>{label}</label>
          <input className={'ms-5'}
          disabled
          id={fileName}
          value = {fileName}
          onClick={activateInput}
          />
        </div>
        <div>
          <button type={'button'} className={'btn btn-primary d-inline '} onClick = {activateInput}>Browse</button>
        </div>
      </div>
    </>
  );
};

export default FileInput;