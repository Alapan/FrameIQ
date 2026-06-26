import { Meta, StoryObj } from "@storybook/nextjs-vite";
import FileUploadInput from "./FileUploadInput";
import { ComponentProps } from "react";

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
export type Props = ComponentProps<typeof FileUploadInput>;

export const Default: Story = {
  args: {
    label: 'Upload image'
  }
};
