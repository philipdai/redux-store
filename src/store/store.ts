

export class Store {
  private state: { [key: string]: any};
  private reducers: { [key: string]: Function };
  private subscribers: Function[];

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }
  

  get value() {
    return this.state;
  }

  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub != fn);
    }
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify() {
    this.subscribers.forEach(fn => fn(this.value));
  }

  private reduce(state, action) {
    const newState = {};
    
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }

    return newState;
  }
}


