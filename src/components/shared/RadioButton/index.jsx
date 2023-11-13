export const RadioButton = ({ value, setValue }) => {
  return (
    <div className="bg-gray-850 p-1 rounded-lg flex">
      <div
        onClick={() => setValue(0)}
        className={`rounded-lg  py-1 px-1 w-1/2 text-center ${
          value === 0 ? "bg-white shadow-radioItemShadow" : "bg-transparent"
        }`}
      >
        User
      </div>
      <div
        onClick={() => setValue(1)}
        className={`rounded-lg  py-1 px-1 w-1/2 text-center ${
          value === 1 ? "bg-white shadow-radioItemShadow" : "bg-transparent"
        }`}
      >
        Administrator
      </div>
    </div>
  );
};
