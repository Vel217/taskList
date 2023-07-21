function ErrorBlock({ text }) {
  return (
    <div className="rounded-md bg-red-200 p-4">
      <div className="flex">
        <div className="flex-shrink-0"></div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-600">ERROR</h3>
          <div className="mt-2 text-sm text-red-400">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorBlock;
