type Props = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function EmailField({
  label,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">
      <label>{label}</label>

     <input
  type="email"
  value={value}
  onChange={(e) => onChange?.(e.target.value)}
  placeholder={placeholder}
  className="w-full p-3 rounded bg-zinc-300 border border-zinc-100"
/>
    </div>
  );
}