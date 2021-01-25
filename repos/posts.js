const { Op } = require("sequelize");
const models = require("../models");

const Posts = () => {
    const get = (query, limit) => {
        return new Promise(async (resolve, reject) => {
            try {
                const posts = await models.Post.findAll({
                    where: {[Op.like]: query},
                    limit
                });
                resolve(posts);
            } catch (error) {
                reject(error);
            }
        });
    }

    const getById = id => {
        return new Promise(async (resolve, reject) => {
            try {
                const post = await models.Post.findOne({id});
                resolve(post);
            } catch (error) {
                reject(error);
            }
        });
    }

    const add = help => {
        return new Promise(async (resolve, reject) => {
            try {
                const insertedHelp = await models.Help.create(help);
                await insertedHelp.save();
                resolve(insertedHelp);
            } catch (error) {
                reject(error);
            }
        });
    }

    const update = (id, help) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedHelp = await models.Help.findOneAndReplace({id}, help);
                await updatedHelp.save();
                resolve(updatedHelp);
            } catch (error) {
                reject(error);
            }
        });
    }

    const remove = id => {
        return new Promise(async (resolve, reject) => {
            try {
                const removedHelp = await models.Help.findOneAndDelete({id});
                resolve(removedHelp);
            } catch (error) {
                reject(error);
            }
        });
    }

    return { get, getById, add, update, remove };
}

module.exports = Posts;