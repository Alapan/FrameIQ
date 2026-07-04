import { Meta, StoryObj } from "@storybook/nextjs-vite";
import FileUploadInput from "./FileUploadInput";
import { useState } from "react";

const meta = {
  title: 'Components/FileUploadInput',
  component: FileUploadInput,
  tags: ['autodocs'],
  argTypes:{
    label: {
      control: 'text',
      description: 'Label for the field'
    }
  }
} satisfies Meta<typeof FileUploadInput>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Upload image here',
    file: null,
    onFileSelect: () => {}
  },
  render: (args) => {
    const [file, setFile] = useState<File | null>(null);

    return (
      <FileUploadInput
        label={args.label}
        file={file}
        onFileSelect={setFile}
      />
    );
  },
};
