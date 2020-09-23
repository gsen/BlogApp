const fs = require('fs');
const dataPath = './data.json';
class Post {
    get = () => {
        return this.readData();
    }

    getIndividualBlog = (postId) => {
        return this.readData().find(post => post.id === postId);
    }

    addPost = (newPost) => {
        const currentData = this.readData();
        currentData.unshift(newPost);
        this.storeData(currentData);

    }

    updatePost = (updatedPost) => {
        const currentData = this.readData();
        if (currentData && currentData.length) {
            const index = currentData.findIndex(post => post.id === updatedPost.id);
            if (index > -1) {
                currentData.splice(index, updatedPost, 1);
            }
        }
        this.storeData(currentData);
    }
    readData = () => {
        return JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    }

    storeData = (data) => {
        fs.writeFileSync(dataPath, JSON.stringify(data));
    }
}

module.exports = Post;