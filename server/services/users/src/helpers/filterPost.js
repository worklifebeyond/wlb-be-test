const { Sequelize } = require('sequelize');

function filterPost(sort_array, order) {
  const sort_order = [];
  sort_array.forEach(sort_option => {
    switch(sort_option.toLowerCase()) {
      case 'date' :
        sort_order.push(['createdAt', order.toLowerCase()]);
        break;
      case 'user' :
        sort_order.push(['User', 'username', order.toLowerCase()]);
        break;
      case 'most_comments' :
        const most_comments = Sequelize.literal('(SELECT COUNT(*) FROM "Comments" WHERE "PostId" = "Post".id)');
        sort_order.push([most_comments, order.toLowerCase()]);
        break;
      case 'most_likes' :
        const most_likes = Sequelize.literal('(SELECT COUNT(*) FROM "Likes" WHERE "PostId" = "Post".id)');
        sort_order.push([most_likes, order.toLowerCase()]);
        break;
      default :
        sort_order.push(['id', order.toLowerCase()]);
    }
  });
  return sort_order;
}

module.exports = filterPost;
