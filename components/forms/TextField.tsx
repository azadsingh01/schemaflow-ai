type Props = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function TextField({
  label,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">
      <label>{label}</label>

      <input
        type="text"
        value={value}
         onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 rounded border border-gray-300 bg-white text-black"
      />
    </div>
  );
}