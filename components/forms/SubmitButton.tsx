type Props = {
  text: string;
  onClick?: () => void;
};

export default function SubmitButton({
  text,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-white text-black px-6 py-3 rounded font-semibold"
    >
      {text}
    </button>
  );
}