import { model, Schema } from "mongoose";
import { ITask } from "types/task.type";

const taskSechema = new Schema<ITask>({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now(),
  },
  priority: {
    type: String,
  },
  tags: {
    type: Array,
  },
  type: {
    type: String,
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
