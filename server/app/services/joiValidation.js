const validation = {
    
    /**
    
     * method to verify an object from a schema
     * @param {*} schema 
     * @param {string} prop - request property to verify (req["body"] ou req["query"])
     * @returns 
     */
    check(schema,prop){
        return (req, _, next)=>{
            const {error} = schema.validate(req[prop]); 
            //if an error occur  validation returns an object with this format : {error:... , value:...}
        
            if(!error){
                // if every is ok it return : 
                next();
            }
            else{
                // error handling
                next(error);
                // throw new Error("Schéma non validé !!!");
            }
        };
    }
};

export default validation;