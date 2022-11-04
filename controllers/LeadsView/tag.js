import Tag from "../../models/tag.js";

//get agent names
export const getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({
            attributes: ['tag']
        });
        res.send(tags);
    } catch (err) {
        console.log(err);
    }
}

//delete tags
export const deleteTag = async (req, res) => {
    try {
        await Tag.destroy({
            where: {
                tag: req.params.tag
            }
        });
        res.json({
            "message": `Tag ${req.params.tag} Deleted`
        });
    } catch (err) {
        console.log(err);
    }
}