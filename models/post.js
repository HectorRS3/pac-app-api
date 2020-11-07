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
      Post.belongsTo(models.Category, {
        foreignKey: 'category_id'
      })

      Post.hasMany(models.Tag, {
        foreignKey: 'post_id'
      })

      Post.hasOne(models.UserPost, {
        foreignKey: 'post_id'
      })
    }
  };
  Post.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    summary: DataTypes.STRING,
    body: DataTypes.STRING,
    link: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};