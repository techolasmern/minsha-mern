const bcrypt = require("bcrypt");

const users = [];

const userRegistration = async (request, response) => {
    try {
        const body = request.body;
        const required_fields = ["first_name", "last_name", "username", "email", "phone", "password", "confirm_password"];
        for (const item of required_fields) {
            if (!body[item]) {
                return response.status(400).send({ message: `${item} is required` });
            }
        }
        // validate each field (using regex);
        const existing_user = users.find(user => user.username == body.username || user.email == body.email || user.phone == body.phone);
        if (existing_user) {
            if(existing_user.username == body.username){
                return response.status(409).send({ message: "Username already exists" });
            }
            if (existing_user.email == body.email) {
                return response.status(409).send({ message: "Email already exists" });
            }
            if (existing_user.phone == body.phone) {
                return response.status(409).send({ message: "Phone already exists" });
            }
        }
        body.password = await bcrypt.hash(body.password, 10);
        const { confirm_password, ...restBody } = body;
        users.unshift(restBody);
        return response.status(201).send({ message: "User registered successfully", user: restBody });
    } catch (err) {
        return response.status(500).send({ message: err.message || "Internal server error" });
    }
}

const get_users = (request, response) => {
    return response.status(200).send({ users });
}

module.exports = { userRegistration, get_users };
