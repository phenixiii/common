
const state = {
  sidebar: {
    opened: true,               //是否打开左边菜单栏
    withoutAnimation: false,    //是否无动画
  },
  menuPos : 'H',             //菜单方向：D：默认，H：水平 V：垂直
  mode : 'page',            //展示模式：page：单页  tab:tab标签页
  fixedHeader: true,        //是否固定
  sidebarLogo: true         //是否显示LOGO
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


