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

//delete casetype
export const deleteCaseType = async (req, res) => {
    try {
        await caseType.destroy({
            where: {
                case_type: req.params.case_type
            }
        });
        res.json({
            "message": `Case Type ${req.params.case_type} Deleted`
        });
    } catch (err) {
        console.log(err);
    }
}
