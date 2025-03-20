import Home from './views/pages/Home.js';
import OperatorAll from './views/pages/operators/OperatorAll.js';
import OperatorDetail from './views/pages/operators/OperatorDetail.js';
import About from './views/pages/About.js';
import Error404 from './views/pages/Error404.js';

import Utils from './services/Utils.js';

const routes = {
    '/'                     : Home
    , '/about'              : About
    , '/operators'           : OperatorAll
    , '/operators/:id'       : OperatorDetail
};

const router = async () => {

    const content = null || document.querySelector('#content');

    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    let page = routes[parsedURL] ? new routes[parsedURL] : Error404

    //get_head est une méthode asynchrone, on attend donc qu'elle soit résolue
    let head = await page.get_head();
    document.querySelector("#stylesheet").innerHTML = head;
    
    content.innerHTML = await page.render();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);