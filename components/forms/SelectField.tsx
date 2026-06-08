type Props = {
  label: string;
  options: string[];
};

export default function SelectField({
  label,
  options,
}: Props) {
  return (
    <div className="space-y-2">
      <label>{label}</label>

      <select className="w-full p-3 rounded border border-gray-300 bg-white text-black">
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
}