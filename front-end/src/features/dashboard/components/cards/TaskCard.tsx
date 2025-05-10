"use client";

import { ITaskCardProps } from "@dashboard-types/taskCard.type";
import { formatDateTo24Hrs } from "@shared/utils/dateformat";
import DOMPurify from "isomorphic-dompurify";

const TaskCard = (props: ITaskCardProps) => {
  let sizeClasses = "w-full h-full";

  if (props.square) {
    sizeClasses = "w-[300px] h-[300px]";
  } else if (props.fullWidth && props.fixedHeight) {
    sizeClasses = "w-full h-[300px]";
  } else if (props.width && props.height) {
    sizeClasses = `${props.width} ${props.height}`;
  } else if (props.fixedHeight) {
    sizeClasses = "w-full h-[300px]";
  }

  return (
    <div
      onClick={props.onClick}
      className={`${props.backgroundColor} ${sizeClasses} cursor-pointer rounded-lg p-4 shadow-sm flex flex-col justify-between transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-opacity-90`}
    >
      <div className="flex-1 overflow-hidden">
        {props.task.content && (
          <div
            className="text-sm text-gray-700 mb-3 overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.task.content),
            }}
          />
        )}
      </div>

      {props.task.createdAt && (
        <p className="text-xs text-gray-500 self-end mt-auto">
          Created: {formatDateTo24Hrs(new Date(props.task.createdAt))}
        </p>
      )}
    </div>
  );
};

export default TaskCard;
