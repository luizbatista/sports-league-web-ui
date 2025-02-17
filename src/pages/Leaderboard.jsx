import LeaderboardTable from '../components/LeaderboardTable';
import { useState, useEffect } from 'react';
import LeagueService from '../services/LeagueService';

function Leaderboard() {
    const leagueService = new LeagueService();
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            await leagueService.fetchData();
            setLeaderboard(leagueService.getLeaderboard());
        };
        
        loadData();
    }, []);

    return (
        <div>
            <h1>League Standings</h1>
            <LeaderboardTable leaderboard={leaderboard} />
        </div>
    );
}

export default Leaderboard; 
