

export const findList = (lists=[], list_id) =>
lists.find(list => list.id === parseInt(list_id))

export const findTask = (tasks=[], taskId) =>
tasks.find(task => task.id === parseInt(taskId))

export const getTasksForList = (tasks=[], list_id) => (
(!list_id)
  ? tasks
  : tasks.filter(task => task.list_id === parseInt(list_id))
)

export const countTasksForList = (tasks=[], list_id) =>
tasks.filter(task => task.list_id === list_id).length