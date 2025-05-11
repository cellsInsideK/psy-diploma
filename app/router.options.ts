// app/router.options.ts
import type { RouterConfig } from '@nuxt/schema';

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }

    if (to === from) {
      return {
        left: 0,
        top: 0,
        behavior: 'smooth',
      };
    }
  },
};