import Agent from "../../models/agent.js";

//get agent names
export const getNames = async (req, res) => {
    try {
        const name = await Agent.findAll({
            attributes: ['name']
        });
        res.send(name);
    } catch (err) {
        console.log(err);
    }
}

//update tag text
export const updateTag = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
    }
}

//delete agent
export const deleteAgent = async (req, res) => {
    try {
        await Agent.destroy({
            where: {
                name: req.params.agent
            }
        });
        res.json({
            "message": `Agent ${req.params.agent} Deleted`
        });
    } catch (err) {
        console.log(err);
    }
}

export const addAgent = async (req, res) => {
    try {
        await Agent.create({
            tag: req.params.agent
        });
        res.json({
            "message": `Agent ${req.params.agent} added`
        })
    } catch (err) {
        console.log(err);
    }
}

