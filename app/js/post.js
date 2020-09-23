const API_URL = "http://localhost:2000/api/posts/";
const API_BASE_URL = "http://localhost:2000/";

window.onload = () => {
    getPost();
}

const getPostIdParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
}

const getPost = () => {
    const postId = getPostIdParams();
    fetch(`${API_URL}${postId}`, {
        method: 'get'
    }).then(response =>
        response.json()).then(postData =>
            buildPost(postData));
}

const buildPost = (post) => {
    const postImage = `${API_BASE_URL}${post.post_image}`;
    document.querySelector('header').style.backgroundImage = `url(${postImage})`;
    document.getElementById('individual-post-title').innerText = post.title;
    document.getElementById('individual-post-content').innerText = post.content;
    document.getElementById('individual-post-date').innerText = `Published on ${new Date(parseInt(post.added_date)).toDateString()}`;
}

