export default {
  state: {
    currentType: null,
    currentProtocol: null,
    data: [],
    
  },
  mutations: {
    SET_CURRENT_TYPE (state, currentType) {
      state.currentType = currentType
    },
    SET_CURRENT_PROTOCOL (state, currentProtocol) {
      state.currentProtocol = currentProtocol
    }
  }
}
