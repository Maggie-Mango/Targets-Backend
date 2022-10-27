import caseType from "../../models/caseType.js";

//get agent names
export const getCaseTypes = async (req, res) => {
    try {
        const cases = await caseType.findAll({
            attributes: ['case_type']
        });
        res.send(cases);
    } catch (err) {
        console.log(err);
    }
}
