function ErrorBlock() {
  return (
    <div className="rounded-md bg-red-100 p-2 mt-2">
      <div className="flex">
        <div className="flex-shrink-0"></div>
        <div className="ml-3">
          <h3 className=" font-medium text-red-800 text-xs">Error</h3>
          <div className="mt-2 text-red-700 text-xs">
            <p>Error while updating or getting data. Try again.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorBlock;
