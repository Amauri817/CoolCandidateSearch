import {Link} from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
      <nav>
        <p><Link to="/" style={{paddingRight:"25px", color:"white"}}>Home</Link></p>
        
        <Link to="/SavedCandidates" style={{color:"white"}}>Potential Candidates</Link>
      </nav>
  
  )
};

export default Nav;
