import Agent from "../models/agent.js";

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

//add new agent
export const addAgent = (req, res) => {};



//delete agent
export const deleteAgent = async (req, res) => {
    try {
        await agent.destroy({
            where: {
                name: req.params.name
            }
        });
        res.json({
            "message": `Agent ${req.params.name} Deleted`
        });
    } catch (err) {
        console.log(err);
    }
}

