type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function JsonEditor({
  value,
  onChange,
}: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-[500px] bg-zinc-900 border border-zinc-700 rounded p-4 text-sm"
    />
  );
}