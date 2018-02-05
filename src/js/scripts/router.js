const TITLE_DEFAULT = "Future history";

function sanitizePath(path) {
  return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

export default class Router {
  constructor(root = '/') {
    this.navigations = [];
    this.root = root;
  }

  track(navPath) {
    const referrer = document.referrer;
    this.navigations.push({ navPath, referrer });
  }

  navigate(path = '', title = TITLE_DEFAULT) {
    const navPath = this.root + sanitizePath(path);
    this.track(navPath);
    document.title = title;
    if (history && navPath) {
       history.pushState(null, null, navPath); 
    }
  }
}