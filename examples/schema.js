const schema = {
  user: {
    firstName: string,
    lastName: string,
    email: string,
    timestamp: true,
  },
  task: {
    title: string,
    description: string,
    dueDate: Date,
    timestamp: true,
  },
};
