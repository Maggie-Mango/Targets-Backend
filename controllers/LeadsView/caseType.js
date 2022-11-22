import caseType from "../../models/caseType.js";

export const getCaseTypes = async (req, res) => {
    try {
        const cases = await caseType.findAll({
            attributes: [
                'case_type',
                'is_tr',
                'is_ssp'
            ]
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

export const addCaseType = async (req, res) => {
    try {
        await caseType.create({
            tag: req.params.case_type
        });
        res.json({
            "message": `Case ${req.params.case_type} added`
        })
    } catch (err) {
        console.log(err);
    }
}
