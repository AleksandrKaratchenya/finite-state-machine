class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.arr_state=[];
        if(!config)
            return Error;
       this.config=config;
       this.arr_state.push(this.config.initial);
       this.current_position=(this.arr_state.length-1);
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.arr_state[this.current_position];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if(state!='normal'&&state!='busy'&&state!='sleeping'&&state!='hungry')
       return Error;     
      this.arr_state.push(state);      
      this.current_position=(this.arr_state.length-1);      
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        //if(this.initial=='normal')
        var a=this.arr_state[this.current_position];
         if(!this.config.states[a].transitions[event])
            return Error;
        this.arr_state.push(this.config.states[a].transitions[event]);
       this.current_position=(this.arr_state.length-1);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
       // this.config.prev=this.config.initial;
        //this.count++;
        this.current_position=0;

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
     if(  (this.arr_state.length-1)==0)
     {
        return false;
    }
     this.current_position--;
    return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if( this.arr_state.length==1||this.current_position==(this.arr_state.length-1))
        {
        return false;
        }
        if(this.current_position<(this.arr_state.length-1))
        {
        this.current_position++;
        return true;}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.arr_state=[];
      this.current_position=0;
      this.arr_state.push(this.config.initial);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
