/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 * 
 */
class LeagueService {    

    constructor() {
        this.apiUrl = 'http://localhost:3001/api/v1';
        this.matches = [];
    }
    
    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */    
    setMatches(matches) {
        this.matches = matches;
        console.log(this.matches);
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches;
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() {
        const stats = {};

        // First step: calculate basic statistics
        this.matches.forEach(match => {
            if (match.matchPlayed) {
                // Initialize teams if they don't exist
                if (!stats[match.homeTeam]) {
                    stats[match.homeTeam] = {
                        teamName: match.homeTeam,
                        matchesPlayed: 0,
                        goalsFor: 0,
                        goalsAgainst: 0,
                        points: 0,
                        headToHead: {} // Para armazenar pontos contra cada adversário
                    };
                }
                if (!stats[match.awayTeam]) {
                    stats[match.awayTeam] = {
                        teamName: match.awayTeam,
                        matchesPlayed: 0,
                        goalsFor: 0,
                        goalsAgainst: 0,
                        points: 0,
                        headToHead: {}
                    };
                }

                // Update home team statistics
                stats[match.homeTeam].matchesPlayed++;
                stats[match.homeTeam].goalsFor += match.homeTeamScore;
                stats[match.homeTeam].goalsAgainst += match.awayTeamScore;

                // Update away team statistics
                stats[match.awayTeam].matchesPlayed++;
                stats[match.awayTeam].goalsFor += match.awayTeamScore;
                stats[match.awayTeam].goalsAgainst += match.homeTeamScore;
                stats[match.awayTeam].goalDifference = stats[match.awayTeam].goalsFor - stats[match.awayTeam].goalsAgainst;
                stats[match.homeTeam].goalDifference = stats[match.homeTeam].goalsFor - stats[match.homeTeam].goalsAgainst;

                // Update points and head-to-head
                if (match.homeTeamScore > match.awayTeamScore) {
                    stats[match.homeTeam].points += 3;
                    stats[match.homeTeam].headToHead[match.awayTeam] = (stats[match.homeTeam].headToHead[match.awayTeam] || 0) + 3;
                    stats[match.awayTeam].headToHead[match.homeTeam] = (stats[match.awayTeam].headToHead[match.homeTeam] || 0) + 0;
                } else if (match.homeTeamScore < match.awayTeamScore) {
                    stats[match.awayTeam].points += 3;
                    stats[match.awayTeam].headToHead[match.homeTeam] = (stats[match.awayTeam].headToHead[match.homeTeam] || 0) + 3;
                    stats[match.homeTeam].headToHead[match.awayTeam] = (stats[match.homeTeam].headToHead[match.awayTeam] || 0) + 0;
                } else {
                    stats[match.homeTeam].points += 1;
                    stats[match.awayTeam].points += 1;
                    stats[match.homeTeam].headToHead[match.awayTeam] = (stats[match.homeTeam].headToHead[match.awayTeam] || 0) + 1;
                    stats[match.awayTeam].headToHead[match.homeTeam] = (stats[match.awayTeam].headToHead[match.homeTeam] || 0) + 1;
                }
            }
        });

        // Apply criterias to sort the leaderboard
        return Object.values(stats).sort((a, b) => {
            // First criterion: total points
            if (b.points !== a.points) {
                return b.points - a.points;
            }

            // Second criterion: head-to-head points
            const h2hPointsA = a.headToHead[b.teamName] || 0;
            const h2hPointsB = b.headToHead[a.teamName] || 0;
            if (h2hPointsB !== h2hPointsA) {
                return h2hPointsB - h2hPointsA;
            }

            // Second criterion: goal difference
            if (a.goalDifference !== b.goalDifference) {
                return b.goalDifference - a.goalDifference;
            }

            // Third criterion: goals scored
            if (b.goalsFor !== a.goalsFor) {
                return b.goalsFor - a.goalsFor;
            }

            // Last criterion: alphabetical order
            return a.teamName.localeCompare(b.teamName);
        });
    }
    
    /**
     * Asynchronic function to fetch the data from the server and set the matches.
     */
    async fetchData() {
        try {
            const tokenResponse = await fetch(`${this.apiUrl}/getAccessToken`);
            const tokenData = await tokenResponse.json();
            
            if (!tokenData.success) {
                throw new Error('Failed to get access token');
            }
            
            const matchesResponse = await fetch(`${this.apiUrl}/getAllMatches`, {
                headers: {
                    'Authorization': `Bearer ${tokenData.access_token}`
                }
            });
            
            const matchesData = await matchesResponse.json();
            
            if (!matchesData.success) {
                throw new Error('Failed to get matches data');
            }
            
            this.setMatches(matchesData.matches);
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setMatches([]);
        }
    }    
}

export default LeagueService;