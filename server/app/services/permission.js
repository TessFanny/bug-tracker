

const permissions = {
   findRole: (role)=>{
    return role;
   },
    canManageUsers: async (req, res, next) => {
       const role = req.session.role
        console.log(role);
       if(role !== 'admin'){
        res.status(401).json('pas autorisé')
       }else{
        next()
       }
    }     
  };

export default permissions;

//  const checkUserPermissions = (objectName, permissionCheck) => async (req, res, next) => {
//     const roleId = req.user.roleId;
//     const roleObject = await getUserRole(roleId);

//     const isPermitted = permissionCheck(roleObject.permissions);

//     if (isPermitted) {
//         next();
//     }
//     else {
//         return res.status(403).json({ message: `Not permitted to create/modify ${objectName}` });
//     }
// }
//module.exports = checkUserPermissions;
