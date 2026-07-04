const buttonVariants = {
  primary: 'bg-green-500 hover:bg-green-600 text-white',
  secondary: 'bg-blue-100 hover:bg-blue-200 text-blue-900',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
} as const;

type ButtonVariant = keyof typeof buttonVariants;

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant: ButtonVariant;
  disabled: boolean;
};

const Button = ({ label, onClick, variant, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        `inline-flex rounded-md px-4 py-2 transition
        ${buttonVariants[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`
      }
    >
      {label}
    </button>
  );
};

export default Button;
