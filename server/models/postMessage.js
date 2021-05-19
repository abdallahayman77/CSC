import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    author: String,
    selectedFile: String,
    tags: [String],
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;