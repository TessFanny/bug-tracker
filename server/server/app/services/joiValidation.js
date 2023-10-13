const validation = {
  /**
    
     * method to verify an object from a schema
     * @param {*} schema 
     * @param {string} prop - request property to verify (req["body"] ou req["query"])
     * @returns 
     */
  check(schema, prop) {
    return (req, res, next) => {
      const { error } = schema.validate(req[prop]);
      //if an error occur  validation returns an object with this format : {error:... , value:...}

      if (!error) {
        // if everythong is ok it continue :
        next();
      } else {
        // error handling
        // next(error);
        res
          .status(400)
          .json(error.details[0].message);
        // throw new Error("Schéma non validé !!!");
      }
    };
  },
};

export default validation;
