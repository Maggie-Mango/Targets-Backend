import CaseTargets from "../../models/target.js";

export const submitTargets = async (req, res) => {
    try {
        await CaseTargets.create({
            ooo: true
        });
        res.json({
            "message": `Tag ${req.params.tag} added`
        })
    } catch (err) {
        console.log(err);
    }
}