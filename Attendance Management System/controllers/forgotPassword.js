const path = require("path");
const User = require("../models/user");
const ForgotPassword = require("../models/forgotPassword");
const bcrypt = require("bcrypt");
const Sib = require("sib-api-v3-sdk");
const { v4: uuidv4 } = require("uuid");
const saltRounds = 10;


const hashPassword = async(password) => {
    return await bcrypt.hash(password, saltRounds);
};

const forgotPassword = async(req, res) => {
    try {
        const email = req.body.email;
        // console.log('==========================================================================>',email)/

        const requestId = uuidv4();
        console.log('====================================================='.requestId) //

        const recepientEmail = await User.findOne({ where: { Email: email } });
        // console.log('email====================================================>',recepientEmail.Email)


        if (!recepientEmail) {
            return res
                .status(404)
                .json({ message: "Please provide the registered email!" });
        }

        await ForgotPassword.create({
            id: requestId,
            active: true,
            UserId: recepientEmail.dataValues.id,
        });

        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications["api-key"];
        apiKey.apiKey = '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';


        const transEmailApi = new Sib.TransactionalEmailsApi();
        const sender = {
            email: "ajaymorde457@gmail.com",
            name: "Attendance Management",
        };
        const receivers = [{
            email: email,
        }, ];
        await transEmailApi.sendTransacEmail({
            sender,
            To: receivers,
            subject: "Attendance Management Reset Password",
            textContent: "Link Below",
            htmlContent: `<h3>Hi! We got the request from you for resetting the password. Here is the link below >>></h3>
      <a href="http://localhost:3000/password/resetPassword/${requestId}"> Click Here</a>`,
            params: {
                requestId: requestId,
            },
        });

        return res.status(200).json({
            message: "Link for reset the password is successfully sent on your Mail Id!",
        });
    } catch (error) {
        console.log("something error here ----------->error");
        return res.status(409).json({ message: "Failed changing password" });
    }
}

const resetPassword = async(req, res) => {
    try {
        res
            .status(200)
            .sendFile(
                path.join(__dirname, "../", "views", "resetPassword.html")
            );
    } catch (err) {
        console.log('Error------------------------->', err);
    }
};

const updatePassword = async(req, res) => {
    try {
        const requestId = req.headers.referer.split("/");
        console.log('the request id is-------------------------------=========>', requestId);
        const password = req.body.password;
        const checkResetRequest = await ForgotPassword.findAll({
            where: { id: requestId[requestId.length - 1], active: true },
        });
        if (checkResetRequest[0]) {
            const userId = checkResetRequest[0].dataValues.UserId;
            const result = await ForgotPassword.update({ active: false }, { where: { id: requestId } });
            const newPassword = await hashPassword(password);
            const user = await User.update({ password: newPassword }, { where: { id: userId } });
            return res
                .status(200)
                .json({ message: "Successfully changed password!" });
        } else {
            return res
                .status(409)
                .json({ message: "Link is already Used Once, Request for new Link!" });
        }
    } catch (err) {
        console.log('Error------------------------->', err);
        return res.status(409).json({ message: "Failed to change password!" });
    }
}

module.exports = {
    forgotPassword,
    resetPassword,
    updatePassword
}