//only if the request includes the user, it passes this middleware
function requireUser(req, res, next) {
    if (!req.user) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }
    next();
}

module.exports = {
    requireUser
}
  