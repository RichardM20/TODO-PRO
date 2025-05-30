import { IInputFieldProps } from "../../types/inputField.type";

const InputField = (data: IInputFieldProps) => {
  return (
    <div className={"mb-4"}>
      {data.label && (
        <label
          htmlFor={data.name}
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {data.label}
        </label>
      )}
      <input
        type={data.type}
        id={data.name}
        name={data.name}
        value={data.value}
        onChange={data.onChange}
        placeholder={data.placeholder}
        className="block w-full rounded-md border border-gray-300 px-2 py-1 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-primary-500 overflow-x-auto whitespace-nowrap"
        required
      />
    </div>
  );
};

export default InputField;
