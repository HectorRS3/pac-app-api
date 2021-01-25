const { Op } = require('sequelize');
const models = require('../models');
const bcrypt = require("bcrypt");

const User = () => {
    const get = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await models.User.findAll();
                resolve(users);
            } catch (error) {
                reject(error);
            }
        });
    }

     const getbyId = id => {
         return new Promise(async (resolve, reject) => {
             try {
                 const user = await models.User.findOne({where: {id}});
                 resolve(user);
             } catch (error) {
                 reject(error);
             }
         });
     }

     const add = user => {
         return new Promise(async (resolve, reject) => {
            try {
                const insertedUser = await models.User.create(user);
                const hashedPassword = await bcrypt.hash(insertedUser.password, 15);
                insertedUser.password = hashedPassword;
                await insertedUser.save();
                resolve(insertedUser);
            } catch (error) {
                reject(error);
            }
         });
     }

     const update = (id, user) => {
         return new Promise(async (resolve, reject) => {
             try {
                 const updatedUser = await models.User.findOneAndReplace({ where: {id}}, user);
                 await updatedUser.save();
                 resolve(updatedUser);
             } catch (error) {
                 reject(error);
             }
         });
     }

     const remove = id => {
         return new Promise(async (resolve, reject) => {
             try {
                 const removedUser = await models.User.findOneAndDelete({where: {id}});
                 resolve(removedUser);
             } catch (error) {
                 reject(error);
             }
         });
     }
    
    return { get, getbyId, add, update, remove }
}

module.exports = User();