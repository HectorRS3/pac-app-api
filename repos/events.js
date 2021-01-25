const { Op } = require("sequelize");
const models = require("../models");

const Events = () => {
    const get = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const events = await models.Event.findAll();
                resolve(events);
            } catch (error) {
                reject(error);
            }
        });
    }

    const getById = id => {
        return new Promise(async (resolve, reject) => {
            try {
                const event = await models.Event.findOne({where: {id}});
                resolve(event);
            } catch (error) {
                reject(error);
            }
        });
    }

    const add = event => {
        return new Promise(async (resolve, reject) => {
            try {
                const insertedEvent = await models.Event.create(event);
                await insertedEvent.save();
                resolve(insertedEvent);
            } catch (error) {
                reject(error);
            }
        });
    }

    const update = (id, event) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedEvent = await models.Event.findOneAndReplace({id}, event);
                await updatedEvent.save();
                resolve(updatedEvent);
            } catch (error) {
                reject(error);
            }
        });
    }

    const remove = id => {
        return new Promise(async (resolve, reject) => {
            try {
                const removedEvent = await models.Event.findOneAndDelete({id});
                resolve(removedEvent);
            } catch (error) {
                reject(error);
            }
        });
    }

    return { get, getById, add, update, remove };
}

module.exports = Events();