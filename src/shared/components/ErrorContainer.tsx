const ErrorContainer = ({ error }: { error: string }) => {
  return (
    <div className="w-full p-4 bg-red-100 rounded-lg my-4">
      <p className="text-red-600 text-center">{error}</p>
    </div>
  );
};

export default ErrorContainer;
