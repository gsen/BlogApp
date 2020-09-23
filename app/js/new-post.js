
const API_URL = "http://localhost:2000/api/posts";

const submitNewPost = () => {
    const title = document.getElementById('form-post-title').value;
    const content = document.getElementById('form-post-content').value;
    const image = document.getElementById('form-post-image')
    let formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('post-image', image.files[0]);
    fetch(API_URL, {
        method: 'POST',
        body: formData,
    }).then(() => {
        setTimeout(() =>
            window.location.href = "index.html", 1000);

    })
}

const updatePost = () => {
    const title = document.getElementById('form-post-title').value;
    const content = document.getElementById('form-post-content').value;
    const image = document.getElementById('form-post-image')
    let formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('post-image', image);
    formData.append('id', "1588508979438")
    fetch(API_URL, {
        method: 'PUT',
        body: formData,
    }).then((resp) => {
        console.log(resp.json());
    })

}