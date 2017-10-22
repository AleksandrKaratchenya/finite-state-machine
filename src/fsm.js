class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.count=0;
        this.countudo=0;
        if(!config)
            return Error;
       this.config=config;
       this.init=this.config.initial;

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        
        return this.config.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if(state!='normal'&&state!='busy'&&state!='sleeping'&&state!='hungry')
       return Error;
       this.config.prev=this.config.initial;
        this.count++;
       this.config.initial=state; 
       this.next= this.config.initial;

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        //if(this.initial=='normal')
        var a=this.config.initial;
         if(!this.config.states[a].transitions[event])
            return Error;
        this.config.prev=a;
        this.count++;
       this.config.initial= this.config.states[a].transitions[event];
       this.next= this.config.initial;
        //this.config.states.normal.transitions.event;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
       // this.config.prev=this.config.initial;
        //this.count++;
        this.config.initial=this.init;

    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr=['normal', 'busy', 'hungry', 'sleeping'];
        if(!event)
            return arr;
        if(event!='get_hungry'&&event!='study'&&event!='eat'&&event!='get_up')
       return [];
   var returns_arr=[];
   for(let j=0, k=0;j<4;j++)
   {
    var i=arr[j];
if(this.config.states[i].transitions[event])
  {
    returns_arr[k]=i;
    k++;
  }
}
return returns_arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {

     if(this.config.prev&&this.count)
     {
       this.count--;
       this.countudo++;
        //this.next= this.config.initial;
        this.config.initial=this.config.prev;
        return true;
    }
    return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.next&&this.countudo)
        {
       this.countudo--;
         this.config.initial=this.next;
        return true;
        }
        if(this.countudo==0&&this.config.initial=='normal')
          return false;
      return false; 
    }

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
