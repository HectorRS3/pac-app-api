'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Post.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    summary: DataTypes.STRING,
    body: DataTypes.STRING,
    link: DataTypes.STRING,
    category: DataTypes.INTEGER,
    tags: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};