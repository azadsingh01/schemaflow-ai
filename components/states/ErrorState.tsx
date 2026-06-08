type Props = {
  errors: string[];
};

export default function ErrorState({ errors }: Props) {
  return (
    <div className="p-4 rounded border border-red-500 bg-red-500/20">
      <h3 className="font-bold text-red-300 mb-2">
        Validation Errors
      </h3>

      <ul className="list-disc pl-5 text-red-200">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
}