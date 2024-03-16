import { ComponentPublicInstance } from 'vue';
import { ElMessageBox } from 'element-plus';

type ErrorLoggerOptions = {
  type: 'syntax' | 'axios' | 'component', // Error type
  error: any,
  info?: string,
  vm?: ComponentPublicInstance | null
};


const $error = (options: ErrorLoggerOptions) => {
  const { type, error, vm, info } = options;

  let title = 'Error Message';
    if (type === 'axios') {
      title = 'Server Response Message';
    } else if (type === 'syntax') {
      title = 'JavaScript Syntax Error';
    } else if (type === 'component') {
      title = 'Component Throws Error';
    }

    ElMessageBox({
      autofocus: false,
      title,
      type: 'error',
      customClass: 'lx-error-message_box',
      dangerouslyUseHTMLString: true,
      // message: h('div', null, [
      //   h('div', null, error as any)
      // ])
      message: error
    }).catch(() => {
    });
};

const $warn = (options: ErrorLoggerOptions) => {
  const { type, error, vm, info } = options;

  // if (process.env.NODE_ENV === 'production') {
  //   // ElMessageBox({
  //   //   autofocus: false,
  //   //   title: i18n.t('System Prompt'),
  //   //   type: 'warning',
  //   //   message: i18n.t('System error, please contact the system manager.')
  //   // }).catch(() => {
  //   //   console.info(err);
  //   // });
  //   return;
  // }

  ElMessageBox({
    autofocus: false,
    title: 'Warning Prompt',
    type: 'warning',
    message: error as any
  }).catch(() => {
    // console.info(err);
  });

};

export default {
  $warn,
  $error
};