import { IAddTaskCard } from "@dashboard-types/taskCard.type";

const AddTaskCard = (props: IAddTaskCard) => {
  const sizeClasses = props.square ? "w-[300px] h-[300px]" : "w-full h-full";

  return (
    <div
      className={`bg-gray-100 ${sizeClasses} rounded-lg p-4 shadow-sm flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors`}
      onClick={props.onClick}
    >
      <div className="flex items-center justify-center font-bold">+</div>
    </div>
  );
};

export default AddTaskCard;
