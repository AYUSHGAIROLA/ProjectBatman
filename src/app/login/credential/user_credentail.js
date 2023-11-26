var fs = require('fs');

const obj = '{"name":"John", "age":30, "city":"New York"}';
    const path = './user_credential.json';
try{
    fs.writeFileSync(path, obj);

  }catch(e){
    console.log(e)
  }