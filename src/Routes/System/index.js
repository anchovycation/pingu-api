const healthCheck = async (req, res) => {
  return res.status(200).send('OK');
}

export default [{
  prefix: '/health-check',
  inject: (router) => {
    router.get('', healthCheck);
  }
}];
