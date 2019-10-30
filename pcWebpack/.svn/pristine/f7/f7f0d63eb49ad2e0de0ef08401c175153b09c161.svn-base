
const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false,
  },
  device: 'desktop',
  menuPos : 'H',             //菜单方向：D：默认，H：水平 V：垂直
  mode : 'page',            //展示模式：page：单页  tab:tab标签页
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  CHANGE_MENUPOS: (state, menuPos) => {
    state.menuPos = menuPos
  },
  CHANGE_MODE: (state, mode) => {
    state.mode = mode
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  changeMenuPos({ commit }, { menuPos }) {
    commit('CHANGE_MENUPOS', menuPos)
  },
  changeMode({ commit }, { mode }) {
    commit('CHANGE_MODE', mode)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


