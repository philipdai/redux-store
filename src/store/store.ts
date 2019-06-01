

export class Store {
  private state: { [key: string]: any};
  private reducers: { [key: string]: Function };
  private subscribers: Function[];

  constructor(reducers = {}, initialState = {}) {
    this.state = this.reduce(initialState, {});
    this.reducers = reducers;
    this.subscribers = [];
    console.log('~~~~~ this.reducers: ', this.reducers);
  }
  

  get value() {
    return this.state;
  }

  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
    this.notify();
    
  }

  private notify() {
    console.log('this.state: ', this.value);
    this.subscribers.forEach(fn => fn(this.value));
  }

  private reduce(state, action) {
    console.warn('====', state);
    console.log('<<<<<< this.reducers: ', this.reducers);
    const newState = {};
    
    for (const prop in this.reducers) {
      
      console.log();
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}


