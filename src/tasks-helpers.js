

export const findFolder = (folders=[], folder_id) =>
folders.find(folder => folder.id === parseInt(folder_id))

export const findTask = (tasks=[], taskId) =>
tasks.find(task => task.id === parseInt(taskId))

export const getTasksForFolder = (tasks=[], folder_id) => (
(!folder_id)
  ? tasks
  : tasks.filter(task => task.folder_id === parseInt(folder_id))
)

export const countTasksForFolder = (tasks=[], folder_id) =>
tasks.filter(task => task.folder_id === folder_id).length