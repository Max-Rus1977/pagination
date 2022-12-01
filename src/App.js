import axios from 'axios';
import { useEffect, useState } from 'react';
import './style.css';

function App() {

  const [posts, setPosts] = useState([])
  const [totalPostsCount, setTotalPostsCount] = useState(0)
  const [limit] = useState(10)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getPostsServer = async () => {
      const responseServer = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _limit: limit,
          _page: page
        }
      })
      return (
        setTotalPostsCount(+responseServer.headers['x-total-count']),
        setPosts(responseServer.data)
      )
    }
    getPostsServer()
  }, [page])

  const totalPagesCount = Math.ceil(totalPostsCount / limit)

  const arrTotalPages = []
  for (let i = 0; i < totalPagesCount; i++) {
    arrTotalPages.push(i + 1)
  }

  const goToPage = (numPage) => {
    setPage(numPage)
  }

  const goToPrev = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const goToNext = () => {
    if (page < totalPagesCount) {
      setPage(page + 1)
    }
  }

  return (
    <div className="App">
      <h1>Пагинация React</h1>
      <div className='box-posts'>
        {
          posts.map((post) =>
            <div key={post.id} className='post'>
              <h3>{post.id}. {post.title}</h3>
              <p>{post.body}</p>
            </div>
          )
        }
        <div className='box-pagination'>
          <button onClick={goToPrev} className='buttonsPN btn-prev'>⊲</button>
          {
            arrTotalPages.map((numPage) =>
              <button
                key={numPage}
                className={numPage === page ? 'btn active' : 'btn'}
                onClick={() => goToPage(numPage)}
              >
                {numPage}
              </button>
            )
          }
          <button onClick={goToNext} className='buttonsPN btn-next'>⊳</button>
        </div>
      </div>
    </div >
  );
}

export default App;
