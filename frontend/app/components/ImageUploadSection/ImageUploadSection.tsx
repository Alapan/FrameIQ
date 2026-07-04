'use client';

import { useState } from "react";
import FileUploadInput from "../FileUploadInput/FileUploadInput";
import ImagePreview from "../ImagePreview/ImagePreview";
import Button from "../Button/Button";
import uploadImageToBucket from "@/app/helpers/uploadImageToBucket";

const ImageUploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const updateFile = (file: File | null) => {
    if (!file) return;

    setFile(file);
    setIsButtonDisabled(false);
  };

  const onClick = () => {
    if (!file) return;
    uploadImageToBucket(file)
      .then(() => setIsSuccess(true))
      .catch(() => setIsError(true));
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-5xl leading-10 tracking-tight text-black dark:text-zinc-50">
            <span className='font-thin'>Frame</span><span className='font-semibold'>IQ</span>
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Transform images into meaningful information with AI.
          </p>
          <FileUploadInput label="Upload your image here" onFileSelect={updateFile} file={file}/>
          <ImagePreview file={file} />
          <Button label={'Upload'} onClick={onClick} disabled={isButtonDisabled} variant={'primary'}/>
          {isSuccess && <p className="text-green-500">Image uploaded successfully!</p>}
          {isError && <p className="text-red-500">Error uploading image!</p>}
        </div>
      </main>
    </div>
  );
};

export default ImageUploadSection;
