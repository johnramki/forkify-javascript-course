
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJSON = async function(url){
    try{
        //Get recipe
        const res = await Promise.race([fetch(url),timeout(5)]);
        //console.log(res);
        //const {recipe}  = await res.json();
        const data = await res.json();

        if(!res.ok) throw new Error(`${data.message}`);

        return data;
    }catch(err){
        throw err;
    }   

}