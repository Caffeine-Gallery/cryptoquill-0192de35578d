import { backend } from 'declarations/backend';

let quill;

document.addEventListener('DOMContentLoaded', async () => {
  quill = new Quill('#editor', {
    theme: 'snow'
  });

  const newPostBtn = document.getElementById('newPostBtn');
  const postForm = document.getElementById('postForm');
  const blogPostForm = document.getElementById('blogPostForm');
  const postsSection = document.getElementById('posts');

  newPostBtn.addEventListener('click', () => {
    postForm.style.display = postForm.style.display === 'none' ? 'block' : 'none';
  });

  blogPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const author = document.getElementById('postAuthor').value;
    const body = quill.root.innerHTML;

    await backend.createPost(title, body, author);
    blogPostForm.reset();
    quill.setContents([]);
    postForm.style.display = 'none';
    await displayPosts();
  });

  await displayPosts();
});

async function displayPosts() {
  const posts = await backend.getPosts();
  const postsSection = document.getElementById('posts');
  postsSection.innerHTML = '';

  posts.sort((a, b) => b.timestamp - a.timestamp).forEach(post => {
    const article = document.createElement('article');
    article.innerHTML = `
      <h2>${post.title}</h2>
      <p class="author">By ${post.author}</p>
      <div class="post-body">${post.body}</div>
      <p class="timestamp">${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</p>
    `;
    postsSection.appendChild(article);
  });
}
