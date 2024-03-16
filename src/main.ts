import { createApp } from 'vue'
import App from './App.vue'
import Lodash from 'lodash';

import Router from './router';
import Store from './store';
import Directives from './directives';
import ElementPlus from 'element-plus';

// Global Iconfont configuration
// Tips-1: If there is some where want to use Color-icons, just import the 'iconfont.js' and use SVG to rendering.
// Tips-2: Don't import 'iconfont.js' at here.
import '@/assets/common/iconfont/iconfont.css';

import 'xe-utils';
import VXETable from 'vxe-table';
import '@config/VXETable.global.ts';
import '@/assets/common/css/reset/vxe-table.scss';

import Error from '@utils/error';

const app = createApp(App)
  .use(Router)
  .use(Store)
  .use(Directives)
  .use(ElementPlus)
  .use(VXETable);

app.config.errorHandler = (err: any, vm, info) => {
  console.error(err.stack || err);

  Error.$error({
    type: 'component',
    error: err.stack || err,
    info,
    vm
  });
};

app.mount('#app');

// problem 'ResizeObserver loop limit exceeded' error
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void) {
    callback = Lodash.debounce(callback, 16);
    super(callback);
  }
};

export default app;
