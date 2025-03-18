import Home from './views/pages/Home.js';
import OperatorAll from './views/pages/operators/OperatorAll.js';
import OperatorDetail from './views/pages/operators/OperatorDetail.js';
import About from './views/pages/About.js';
import Error404 from './views/pages/Error404.js';

import Utils from './services/Utils.js';

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'                     : Home
    , '/about'              : About
    , '/operators'           : OperatorAll
    , '/operators/:id'       : OperatorDetail
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const content = null || document.querySelector('#content');

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    let page = routes[parsedURL] ? new routes[parsedURL] : Error404


    //get_head est une méthode asynchrone, on attend donc qu'elle soit résolue
    let override_head = await page.get_head();
    //on ajoute le contenu de la méthode get_head dans le head en gardant le contenu déjà présent
    document.head.innerHTML += override_head;
    
    
    //await, car on attend que toutes les promesses soient résolues dans la méthode render
    content.innerHTML = await page.render();
}

// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);