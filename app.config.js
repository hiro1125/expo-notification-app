import 'dotenv/config';

export default {
  expo: {
    name: 'my-app',
    slug: 'my-app',
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
  },
};
