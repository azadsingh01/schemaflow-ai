type Props = {
  label: string;
};

export default function CheckboxField({
  label,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" />
      <label>{label}</label>
    </div>
  );
}