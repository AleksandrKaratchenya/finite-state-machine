class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
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
       this.config.initial=state;
       
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
    var a=this.config.initial;
         if(!this.config.states[a].transitions[event])
            return Error;
       this.config.initial= this.config.states[a].transitions[event];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
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
        if(event!='get_hungry'&&event!='study'&&event!='get_tired'&&event!='eat'&&event!='get_up')
       return [];
   var returns_arr=[];
   for(var j=0,k;j<4;j++)
   {
    var i=arr[j];
if(this.config.states[i].transitions[event])
  {
    returns_arr[k]=this.config.states[i];
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
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
