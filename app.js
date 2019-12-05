const express = require('express');
const cors    = require('cors');


let nextId    = 1;
const posts   = [
    {
        id: nextId++,
        content: '1',
        type: 'Обычный',
        likes: 0,
    },
    {
        id: nextId++,
        content: '2',
        type: 'Изображение',
        likes: 0,
    },
    {
        id: nextId++,
        content: '3',
        type: 'Обычный',
        likes: 0,
    },
    {
        id: nextId++,
        content: '4',
        type: 'Аудио',
        likes: 5,
    },
    {
        id: nextId++,
        content: '5',
        type: 'Видео',
        likes: 0,
    },

]

const server = express();

server.use(express.json());
server.use(cors());

server.get('/posts/latePosts/:latePostId', (req, res) => {
    const latePostId = Number(req.params.latePostId);
    if (latePostId === 0) {
        if(posts.slice < 5){
          res.send(posts)
        }
          res.send(posts.slice(posts.length - 5))
    } else {
        const filteredPosts = posts.filter(post => post.id < latePostId);
        if(filteredPosts.length < 5){
            res.send(filteredPosts)
        }
        res.send(filteredPosts.slice(filteredPosts.length - 5))  
    }

});

server.get('/posts/newPosts/:newPostId', (req, res) => {
    const newPostId = Number(req.params.newPostId);
    res.send(posts.filter(post => post.id > newPostId))

})



server.get('/posts/latePostsLoading/:fifthPostId', (req, res) => {
    const fifthPostId = Number(req.params.fifthPostId)
    if (fifthPostId === posts[0].id) {
        res.send(true);
        return;
    }
    res.send(false);
})

server.get('/posts/newPostsLoading/:newPostId', (req, res) => {
    const newPostId = Number(req.params.newPostId)
    if (posts.length === 0) {
        res.send(false);
        return;
    } else if (newPostId < posts[posts.length - 1].id) {
        res.send(true);
        return;
    }
    res.send(false);
})

server.delete('/posts/:id', (req, res) => {
    const id    = Number(req.params.id)
    const index = posts.findIndex((post) => {
        return post.id === id;
    });
    if (index === -1) {
        res.send('No posts');
        return;
    }
    posts.splice(index, 1);
    res.end();
})

server.post('/posts/like/:id', (req, res) => {
    const id    = Number(req.params.id)
    const index = posts.findIndex((post) => {
        return post.id === id;
    });
    posts[index].likes++;
    res.send(`${posts[index].likes}`);
})

server.post('/posts/dislike/:id', (req, res) => {
    const id    = Number(req.params.id)
    const index = posts.findIndex((post) => {
        return post.id === id;
    });
    posts[index].likes--
    res.send(`${posts[index].likes}`);
})

server.post('/posts', (req, res) => {

    setTimeout(() => {
        const newPost = {
            id: nextId++,
            content: req.body.content,
            type: req.body.type,
            likes: 0,
            
        }
        posts.push(newPost)
        res.send(newPost);
    }, 1000);
  
})

server.listen(process.env.PORT || '3000');