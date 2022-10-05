import bcrypt from 'bcryptjs';
//objeto helper con dos metodos.
const helpers = {};
//metodo para encriptar password.
helpers.encryptPass = async (passworld)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passworld, salt);

    return hash;
};
//metodo para comparar password.
helpers.comparePass = async (password, savePass)=>{
    try{
        return await bcrypt.compare(password, savePass);
    }catch(err){
        console.log(`Soy el error: ${err}.`);
    }
};


export default helpers;