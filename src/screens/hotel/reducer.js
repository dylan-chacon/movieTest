import Actions from '../../redux/actionTypes';

const STATE_INITIAL = {
    error:false,
}

export default (state = STATE_INITIAL, action) => {
    switch(action.type){
        default:
            return {...state };    
    }
};
