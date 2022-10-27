import tag from "../../models/tag.js";

//get agent names
export const getTags = async (req, res) => {
    try {
        const tags = await tag.findAll({
            attributes: ['tag']
        });
        res.send(tags);
    } catch (err) {
        console.log(err);
    }
}
