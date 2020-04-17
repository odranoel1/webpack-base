const extractThirdParty = async () => {

    const element = document.createElement('div');

    // Module name
    const { default:_ } = await import(/* webpackChunkName: "lodash" */ 'lodash');

    element.innerHTML = _.join(['Hola desde', 'lodash'], '-');

    document.body.appendChild( element );
}

const getModule = () => {

    const element = document.createElement('div');
    const btn = document.createElement('button');

    btn.innerHTML = 'Enable lazy loading';
    element.appendChild( btn );

    btn.onclick = e => import(/* webpackChunkName: "profile-module" */ './profile-module').then(module => {
        
        const test = module.default;

    });

    document.body.appendChild( element );

}


const appModule = () => {
    
    extractThirdParty();
    getModule();

}

export {
    appModule
}