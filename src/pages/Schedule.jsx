import MatchesTable from '../components/MatchesTable';
import { useState, useEffect } from 'react';
import LeagueService from '../services/LeagueService';

function Schedule() {
    const leagueService = new LeagueService();
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            await leagueService.fetchData();
            setMatches(leagueService.getMatches());
        };
        
        loadData();
    }, []);

    return (
        <div>
            <h1>League Schedule</h1>
            <MatchesTable matches={matches} />
        </div>
    );
}

export default Schedule; 
