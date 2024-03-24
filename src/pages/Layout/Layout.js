import './style.css'
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <div class="navbar">
         <Link to="/">Home</Link>
        <a href="/TriviaQuizGame">TriviaQuizGame</a>
        <a href="/MemoryCardGame">MemoryCardGame</a>
        <a href="/PuzzleGame">PuzzleGame</a>

        
        <a href="/dsf">Contact</a>
    </div>

      <Outlet />
    </>
  )
};

export default Layout;
