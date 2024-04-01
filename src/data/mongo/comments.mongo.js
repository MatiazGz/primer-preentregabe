import MongoManagger from "./managger.mongo.js";
import Comment from "./models/comment.model.js";

const comments = new MongoManagger(Comment);
export default comments;