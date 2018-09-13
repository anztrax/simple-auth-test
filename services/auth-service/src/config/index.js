import defaultConfig from './default';
import productionConfig from './production';
import stagingConfig from './staging';

const getConfig = () => {
  switch(process.env.NODE_ENV){
    case 'staging':
      return { ...defaultConfig, ...stagingConfig };
    case 'production':
      return { ...defaultConfig, ...productionConfig };
    case 'development':
    default:
      return { ...defaultConfig };
  }
};

export default getConfig();