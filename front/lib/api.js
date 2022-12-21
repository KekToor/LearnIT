export async function fetcher(url, options = {}) {
    let res;
    if(!options){
        res = await fetch(url);
    } else {
        res = await fetch(url, options);
    }
    const data = await res.json();
    return data;
}