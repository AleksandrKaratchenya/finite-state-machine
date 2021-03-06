class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config)
      throw new Error();

       this.arr_state=[];
       this.config=config;
       //this.init=this.config.initial;
       this.arr_state.push(this.config.initial);
       this.current_position=0;//(this.arr_state.length-1);
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
   throw new Error();
      // this.config.prev=this.config.initial;
       // this.count++;
       //if(state==this.arr_state[this.current_position])
        //return;
//this.arr_state.push(state);
      var t=this.current_position+1;
      this.arr_state.splice(t,this.arr_state.length-t,state);
       //this.config.initial=state; 
      this.current_position++;//=(this.arr_state.length-1);
      // this.next= this.config.initial;

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        //if(this.initial=='normal')
        if(event!='get_hungry'&&event!='study'&&event!='eat'&&event!='get_up'&&event!='get_tired')
    throw new Error();
        var a=this.arr_state[this.current_position];
         if(!this.config.states[a].transitions[event])
           throw new Error();
       // this.config.prev=a;
        //this.count++;
       //this.config.initial= this.config.states[a].transitions[event];
        var t=this.current_position+1;
        this.arr_state.splice(t,this.arr_state.length-t,this.config.states[a].transitions[event]);
        //this.arr_state.push(this.config.states[a].transitions[event]);
         
         //this.arr_state.push(this.config.initial);
       this.current_position++;//=(this.arr_state.length-1);
       //this.next= this.config.initial;
        //this.config.states.normal.transitions.event;
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
        if(event!='get_hungry'&&event!='study'&&event!='eat'&&event!='get_up'&&event!='get_tired')
       return [];
   var returns_arr=[];
   var i;
   for(let j=0, k=0;j<4;j++)
   {
    i=arr[j];
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
//var a=this.arr_state.length;
     if(this.current_position==0)
     {
        return false;
    }
    //this.config.initial=this.arr_state[this.current_position];
     this.current_position--;
    return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if( this.current_position==(this.arr_state.length-1))
        {
        return false;
        }
        //if(this.current_position<(this.arr_state.length-1))
       // {
        //this.config.initial=this.arr_state[this.current_position+1];
        this.current_position++;
        return true;
        //}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.arr_state=[];
      this.arr_state.push(this.config.initial);
      this.current_position=0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
