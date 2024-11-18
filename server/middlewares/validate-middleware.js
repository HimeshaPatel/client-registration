// validate-middleware.js
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        return next();
    } catch (err) {
        const status = 422;
        const message = "Fill input correctly";
        const extraDetails = err.issues?.map((curElem) => curElem.message) || "Error from Backend";

        const error = {
            status,
            message,
            extraDetails
        };      

        next(error);
    }
}

module.exports = validate; // Ensure this is exporting correctly
