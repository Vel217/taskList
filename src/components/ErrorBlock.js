function ErrorBlock({ text }) {
  return (
    <div className="px-4 absolute top-0 right-0 z-30 mr-5 animate-pulse w-96">
      <div className="rounded-md bg-red-200 p-4 shadow-md">
        <div className="flex">
          <div>
            <h3 className="text-sm font-medium text-red-600">ERROR</h3>
            <div className="mt-2 text-sm text-red-400">
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorBlock;
