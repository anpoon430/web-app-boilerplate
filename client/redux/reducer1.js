const EXAMPLE_ACTION = 'EXAMPLE_ACTION'
const initialState = {}

const exampleActionCreator = () => ({
  type: EXAMPLE_ACTION
})


const reducer1 = (state = initialState, action) => {
  switch (action.type){
    case EXAMPLE_ACTION:
      return {...state}
    default:
      return state
  }
}

export default reducer1;
