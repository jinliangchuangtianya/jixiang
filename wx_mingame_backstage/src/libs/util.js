let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};
util.$getStorage = (key)=>{
    return localStorage.getItem(key);
}
util.$setStorage = (key, val)=>{
    localStorage.setItem(key, val);
};


export default util;