const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  menuPos : state => state.app.menuPos,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
}
export default getters
