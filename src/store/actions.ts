// action constants
export const ADD_TODO = '[Todo] ADD_TODO';

// action creators
export class AddTodo {
  readonly type = ADD_TODO;
  constructor(public payload: any) {}
}