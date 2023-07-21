function SuccessBlock() {
  return (
    <div className="rounded-md bg-green-50 p-2 mt-2">
      <div className="flex">
        <div className="flex-shrink-0"></div>
        <div className="ml-3">
          <h3 className=" font-medium text-green-800 text-xs">Success</h3>
          <div className="mt-2 text-green-700 text-xs">
            <p>
              Successful submission of the task to the list. Refresh the page to
              check.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessBlock;