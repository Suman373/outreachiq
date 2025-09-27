const { AI_SERVICE } = require("../services");

const generateSubjectLine = async (req, res) => {
    try {
        const {id: userId} = req.params;
        const {subject} = await req.body;
        if(!userId) return res.status(400).json({message:'UserId is missing'});
        if(!subject.trim()) return res.status(400).json({message:"Email subject to enhance is required."});
        const text = await AI_SERVICE.subjectLineModification(userId, subject);
        res.status(200).json({message:"Subject enhanced successfully", result: text});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const generateEmailBody = async (req, res) => {
    try {
        const {id: userId} = req.params;
        const {body} = await req.body;
        if(!userId) return res.status(400).json({message:'UserId is missing'});
        if(!body.trim()) return res.status(400).json({message:"Email body to enhance is required."});
        const text = await AI_SERVICE.emailBodyModification(userId, body);
        res.status(200).json({message:"Email body enhanced successfully", result: text});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {
    generateSubjectLine,
    generateEmailBody
}