interface Props {
  name: string;
  color: string;
  size?: "sm" | "md";
}

export default function Avatar({ name, color, size = "md" }: Props) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sizeClass = size === "sm" ? "h-6 w-6 text-xs" : "h-10 w-10 text-sm";

  return (
    <div
      title={name}
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${color} ${sizeClass}`}
    >
      {initials}
    </div>
  );
}