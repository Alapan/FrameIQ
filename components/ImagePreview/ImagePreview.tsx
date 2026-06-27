import { useEffect, useState } from "react";

interface ImagePreviewProps {
  file: File | null
};

const ImagePreview = ({
  file
}: ImagePreviewProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));

    return () => URL.revokeObjectURL(previewUrl);

  }, [file]);

  if (!previewUrl) return null;

  return (
    <img
      src={previewUrl}
      alt="Selected preview"
      className="mt-4 h-48 w-auto rounded-md border object-cover"
    />
  );
};

export default ImagePreview;
