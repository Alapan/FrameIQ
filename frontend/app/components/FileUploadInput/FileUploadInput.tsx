'use client';

interface FileUploadInputProps {
  label: string;
  file: File | null
  onFileSelect: (file: File | null) => void;
};

const FileUploadInput = ({
  label,
  file,
  onFileSelect,
}: FileUploadInputProps) => {
  return (
    <>
      <label
        htmlFor="file"
        className="inline-flex cursor-pointer rounded-md bg-slate-100 px-4 py-2 hover:bg-slate-200"
      >
        {label}
      </label>
      <input
        className="hidden"
        id="file"
        type="file"
        onChange={(e) => onFileSelect(e.target.files?.[0] ?? null)}
      />
      {file && <span className="ml-3">{file.name}</span>}
    </>
  );
};

export default FileUploadInput;
