function SuccessBlock({ text }) {
  return (
    <div className="px-4 py-6 absolute top-0 right-0 z-30 mr-10 ">
      <div className="rounded-md bg-green-200 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-600">Success</h3>
            <div className="mt-2 text-sm text-green-400">
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessBlock;
