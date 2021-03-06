import Vue from 'vue'
import Router from 'vue-router'
import jsRes from '@/assets/js/res.js'

Vue.use(Router)

const routePath = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo'),
  },
  {
    path: '/login',
    name: 'dloginemo',
    component: () => import('@/views/login'),
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404'}
];

const createRouter = (path) => new Router({
  // mode: 'history', // 默认为hash
  scrollBehavior: () => ({
    y: 0
  }),
  routes: path
})

const router = createRouter(routePath)

let val = jsTools.SessionStorage.getVal('menuPos');

resetRouter(val);

export default router

export function resetRouter(menuPos) {
    
  if(menuPos == null) return;

  jsTools.SessionStorage.setVal('menuPos',menuPos);

  let dir = 'demo';
  let menus = jsRes.menuList;

  let path = [];

  routePath.forEach((item)=>{
    path.push(item);
  })

  menus.forEach(element => {
    let item = {
      isShow : true,
      path: '/' + element.dir,
      name: element.dir,
      component: () => import('../views/layout' + menuPos),
      meta: {
        title: element.name,
        icon: element.icon,
      },
      children: []
    }

    element.list.forEach(li => {
      item.children.push({
        path: li.href,
        name: li.href,
        component: () => import('@/views/'+ dir +'/' + element.dir + '/' + li.href),
        meta: {
          title: li.name,
          icon: element.childIcon
        }
      })
    })

    path.push(item);
  });

  const newRouter = createRouter(path);
  router.matcher = newRouter.matcher      // reset router
  router.options.routes = path;
}


