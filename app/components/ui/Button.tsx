const getVariantClasses = (variant: "primary" | "ghost") => {
  switch (variant) {
    case "primary":
      return "bg-black dark:bg-white text-white dark:text-black";
    case "ghost":
      return "bg-transparent text-black dark:text-white";
    default:
      return "";
  }
};

const getSizeClasses = (size: "big" | "small") => {
  switch (size) {
    case "big":
      return "text-[17px] py-3 font-semibold";
    case "small":
      return "text-sm py-1";
    default:
      return "";
  }
}

export default function Button({
  children,
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
  size= "big",
}: {
  children: React.ReactNode|string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "ghost";
  size: "big" | "small",
}) {
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors ${variantClasses} ${sizeClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
