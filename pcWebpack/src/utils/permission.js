//路由钩子，如需对每次路由时增加业务控制可写在这里
import router from '../router/wllh'

router.beforeEach(async (to, from, next) => {
    next();  
})

router.afterEach(() => {

})
