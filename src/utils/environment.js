let getHostname = () => {
  if (window && window.location && window.location.hostname) {
    return window.location.hostname;
  }
  return "";
};

let getDefaultEnvironment = hostname => {
  if (hostname) {
    let hostnameMatchDev = hostname.match(/localhost/);
    if (hostnameMatchDev) {
      return "dev";
    }
  }
  return "prod";
};

let depUrl = () => {
  let hostname = getHostname();
  let env = getDefaultEnvironment(hostname);
  if(env === 'dev'){
      return 'http://localhost:4000/'
  }
  return 'https://imdb-game.azurewebsites.net/';
};

export default {depUrl};
