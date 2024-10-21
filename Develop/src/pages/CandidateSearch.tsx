import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import {Candidates} from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [user, setUser] = useState<Candidates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await searchGithubUser('octocat'); // Replace 'octocat' with any GitHub username
        setUser(data);
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {user && (
        <div>
          <img src={user.avatar_url} alt={`${user.login} avatar`} width={100} />
          <h2>{user.name}</h2>
          <p>Username: {user.login}</p>
          <p>Location: {user.location || 'Unknown'}</p>
          <p>Company: {user.company || 'Unknown'}</p>
          <p>Email: {user.email || 'No email'}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
        </div>
      )}
    </div>
  );
};
export default CandidateSearch;
