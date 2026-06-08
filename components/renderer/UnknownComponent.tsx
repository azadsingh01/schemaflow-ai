type Props = {
  type: string;
};

export default function UnknownComponent({
  type,
}: Props) {
  return (
    <div className="p-4 rounded bg-red-500/20 border border-red-500 text-red-300">
      Unknown Component: {type}
    </div>
  );
}