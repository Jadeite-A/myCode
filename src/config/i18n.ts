import { createI18n } from 'vue-i18n';
import i18nEn from './language/en';
import i18nZh from './language/cn';
import dayjs from 'dayjs';
import 'dayjs/locale';


// First time cached based on url lang
// if (location.href.indexOf('lang=') > -1) {
//   localStorage.language = location.href.indexOf('lang=en') > -1 ? 'en' : 'zh';
// } else {
//   localStorage.language = localStorage.language === 'en' ? 'en' : 'zh';
// }

const language: string = localStorage.language === 'zh' ? 'zh-cn' : localStorage.language;
dayjs.locale(language);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const i18n: any = createI18n({
  locale: 'en',
  globalInjection: true,
  messages: {
    en: i18nEn,
    zh: i18nZh
  },
  silentTranslationWarn: true // 国际化警告
});

// 切换语言
i18n.changeLanguage = () => {
  let _locale = i18n.global.locale === 'en' ? 'zh' : 'en';
  localStorage.language = i18n.global.locale = _locale;
};

const t = i18n.global.t;

export {
  i18n,
  t
};
