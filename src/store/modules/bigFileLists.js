const state = {
  fileList: []
}

const mutations = {
  updateProgress: (state, info) => {
    const index = state.fileList.findIndex(e => e.hash === info.hash)
    if (index > -1) state.fileList[index].percent = info.percent
    else state.fileList.push(info)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

