'use client';

import { useState } from "react";

interface FileUploadInputProps {
  label: string;
};

const FileUploadInput = ({
	label
}: FileUploadInputProps) => {
	const [file, setFile] = useState<File | null>(null);
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
				onChange={(e) => setFile(e.target.files?.[0] ?? null)}
			/>
      {file && <span className="ml-3">{file.name}</span>}
		</>
	);
};

export default FileUploadInput;
