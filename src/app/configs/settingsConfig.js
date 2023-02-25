import themesConfig from './themesConfig';

const settingsConfig = {
  direction: 'ltr', // rtl, ltr
  theme: {
    main: themesConfig.default,
    navbar: themesConfig.default,
    toolbar: themesConfig.default,
    footer: themesConfig.default,
  },
  defaultAuth: null,
  loginRedirectUrl: '/',
};

export default settingsConfig;
