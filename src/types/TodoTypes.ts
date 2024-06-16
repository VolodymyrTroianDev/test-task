export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export interface FiltersTodo {
  userId: number | string;
  sort: string
  q: string;
}
