import { model, Schema } from "mongoose";
import { ITask } from "types/task.type";

const taskSechema = new Schema<ITask>({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now(),
  },
  type: {
    type: Object,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

taskSechema.methods.toJSON = function () {
  const { __v, _id, userId, ...task } = this.toObject();
  task.uid = _id;
  return task;
};

const Task = model("Task", taskSechema);

export default Task;
