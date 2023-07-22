function SuccessBlock({ text }) {
  return (
    <div className="px-4 py-6 absolute top-0 right-0 z-30 mr-5">
      <div className="rounded-md bg-green-200 p-4 shadow-xl">
        <div className="flex">
          <div>
            <h3 className="text-sm font-medium text-green-600">Success</h3>
            <div className="mt-2 text-sm text-green-500">
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessBlock;
