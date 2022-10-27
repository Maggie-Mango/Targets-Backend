import caseAssignment from "../../models/target.js";

export const getData = async (req, res) => {
    try {
        const tags = await caseAssignment.findAll();
        res.send(tags);
    } catch (err) {
        console.log(err);
    }
}