const { Op } = require("sequelize");
const models = require("../models");

const Posts = () => {
    const get = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const posts = await models.Post.findAll();
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

    const add = post => {
        return new Promise(async (resolve, reject) => {
            try {
                const insertedPost = await models.Post.create(post);
                await insertedPost.save();
                resolve(insertedPost);
            } catch (error) {
                reject(error);
            }
        });
    }

    const update = (id, post) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedPost = await models.Post.findOneAndReplace({id}, post);
                await updatedPost.save();
                resolve(updatedPost);
            } catch (error) {
                reject(error);
            }
        });
    }

    const remove = id => {
        return new Promise(async (resolve, reject) => {
            try {
                const removedPost = await models.Help.findOneAndDelete({id});
                resolve(removedPost);
            } catch (error) {
                reject(error);
            }
        });
    }

    return { get, getById, add, update, remove };
}

module.exports = Posts();