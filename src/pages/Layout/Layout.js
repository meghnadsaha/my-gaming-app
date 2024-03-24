import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/TriviaQuizGame">TriviaQuizGame</Link>
          </li>
          <li>
            <Link to="/MemoryCardGame">MemoryCardGame</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
