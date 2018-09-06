const EXAMPLE_ACTION2 = 'EXAMPLE_ACTION2'
const initialState = {}

const exampleActionCreator = () => ({
  type: EXAMPLE_ACTION2
})


const reducer2 = (state = initialState, action) => {
  switch (action.type){
    case EXAMPLE_ACTION2:
      return {...state}
    default:
      return state
  }
}

export default reducer2;
