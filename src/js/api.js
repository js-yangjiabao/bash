function createRequest(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }else{
        return new ActiveXObject('Microsoft.XMLHTTP');
    }
}

function get(url, callback){
    var xhr = createRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var text = xhr.responseText
                callback(JSON.parse(text));
            }
        }
    };
    xhr.open('get', url);
    xhr.send();
}
function post(url, data, callback){
    var xhr = createRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var text = xhr.responseText
                callback(JSON.parse(text));
            }
        }
    };
    xhr.open('post', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
}

export{get, post};