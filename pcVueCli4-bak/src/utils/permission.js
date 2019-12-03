//路由钩子，如需对每次路由时增加业务控制可写在这里
import router from '../router/index'

const whiteList = ['/login', '/demo'] 

router.beforeEach(async (to, from, next) => {
    next()

    // if(jsTools.isLogon()){
    //     next()
    // }else{
    //     if (whiteList.indexOf(to.path) !== -1) {
    //         next()
    //       } else {            
    //         next(`/demo?redirect=${to.path}`)
    //       }
    // }
        
})

router.afterEach(() => {

})
