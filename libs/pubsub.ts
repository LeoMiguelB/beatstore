// essentially the idea here is that listener
// will execute a body of code be it related to UI if it's notified
// hence it returns nothing
type Listener = (value: any) => void;

// each topic has a group of listeners
type Topics = {
  [name: string]: Listener[];
};


// creates an instance of pubsub
export const createPubSub = () => {
  let topics : Topics = {};
  let destroyed = false;

  const getTopic = (name: string) => {
    // if the topic doesn't exist then make an empty array for that topic
    if(!topics[name]) {
      topics[name] = [];
    }

    // this is essentially returning every listener that is subscribed to a topic
    return topics[name];
  }

  return {
    // whenever this function is called the listener subscribes to a topic
    subscribe(topic : string, fn : Listener) {
      const listeners =  getTopic(topic);

      // add the new listener that wants to subscribe
      listeners.push(fn);

      // we also want to provide a convinient way to unsub hence we can return the action
      const unsubscribe = () => {
        // get the index of the current listener that was pushed
        const index = listeners.indexOf(fn);
        
        // delete the element at index
        listeners.splice(index, 1);
      }

      return unsubscribe;
    },
    // the publish will notify all subscribers of a topic and will execute their respective functions
    publish(topic: string, value: any) {
      const listeners =  getTopic(topic);
      // get a copy of the array
      const currentListeners = listeners.slice();

      // execute the listeners subscribed to the topics
      currentListeners.forEach((listener) => {
        if(!destroyed) {
          listener(value);
        }
      });
    },
    destroy() {
      topics = {};
      destroyed = true;
    }
  }

}


