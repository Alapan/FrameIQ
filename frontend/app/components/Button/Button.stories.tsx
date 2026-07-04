import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label',
    },
    onClick: {
      control: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Sets the button to disabled if true',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Sets button colour',
    },
  }
} satisfies Meta<typeof Button>;

export default meta;

export type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Upload',
    onClick: () => null,
    variant: 'primary',
    disabled: false,
  }
};

export const Disabled: Story = {
  args: {
    label: 'Upload',
    onClick: () => null,
    variant: 'primary',
    disabled: true,
  }
};
