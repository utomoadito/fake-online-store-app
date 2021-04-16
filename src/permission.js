import router from './router'
import { getToken } from './utils/auth'

const whiteList = ['/login']
const hasToken = getToken();

router.beforeEach(async (to, from, next) => {
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
