import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import {Candidate} from '../interfaces/Candidate.interface';
import Header from '../components/Header';

const CandidateSearch: React.FC = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    fetchCandidate();
  }, []);

  // method to handle fetching a candidate
  const fetchCandidate = async () => {
    try {
      const candidates = await searchGithub();
      if (candidates.length > 0) {
        const username = candidates[0].login;
        const detailedCandidate = await searchGithubUser(username);
              // Check if the candidate has a name; if not, go to the next candidate
      if (!detailedCandidate.login) {
        nextCandidate(); // Skip to the next candidate if the login is empty
      } else {
        setCandidate(detailedCandidate);
      }
      }
    } catch (error) {
      console.error('Error fetching candidate', error);
      
    }
  };

  // method to handle saving the candidate 
  const saveCandidate = () => {
    try {
      if (candidate) {
        const savedCandidates = JSON.parse(localStorage.getItem('SavedCandidates') || '[]');
        const updatedCandidates = [...savedCandidates, candidate];
        localStorage.setItem('SavedCandidates', JSON.stringify(updatedCandidates));
        fetchCandidate();
      }
    } catch (error) {
      console.error('Error saving candidate', error);
      
    }
  };

  const nextCandidate = () => {
    fetchCandidate();
  };

  return (

    <div>
      <Header />
      {candidate ? (         
          <div className='card'>
            <a href={candidate.html_url} target='_blank'><img  src={candidate.avatar_url} alt={candidate.name } /></a>
            <div className='Info'>
              <h2>{candidate.login || "(No Name)"}{candidate.name || "(No Username)"}</h2>
              <p>Location: {candidate.location || "(No Location)"}</p>
              <p >Email: {candidate.email || "(No Email)"}</p>
              <p>Company: {candidate.company || "(No Company)"}</p>
              <p style={{overflowWrap:"break-word"}}>Bio: {candidate.bio || "(No Bio)"}</p>
            </div> 
            <div style={{textAlign:"center"}}>
              <button style={{padding:"20px", backgroundColor:"red"}} onClick={nextCandidate}>➖</button>
              <button style={{padding:"20px", backgroundColor:"green"}} onClick={saveCandidate}>➕</button>
            </div>
          </div>
          
      ) : (
        ''
      )}
    </div>
  );
};

export default CandidateSearch;