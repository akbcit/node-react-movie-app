const verifyAuth = (req, rolesPermitted = []) => {
    let isRolePermitted = false;
  
    // check authentication
    if (req.isAuthenticated()) {
      if (req.session.roles) {
        let matchingRoles = req.session.roles.filter((role) =>
          rolesPermitted.includes(role)
        );
        isRolePermitted = matchingRoles.length > 0;
      } else {
        req.session.roles = [];
      }
      return {
        authenticated: true,
        username: req.user?.username,
        roles: req.session.roles,
        rolePermitted: isRolePermitted,
      };
    } else {
      return { authenticated: false };
    }
  };
  
  module.exports = verifyAuth;