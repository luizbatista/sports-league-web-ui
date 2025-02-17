/**
 * 
 *  THIS IS A TESTING FILE. YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO TEST YOUR WORK.
 *  PLEASE DON´T CHANGE THE INTERFACE OF leagueService.js METHODS
 *
 */

require('jest-fetch-mock').enableMocks();
fetchMock.dontMock();

import LeagueService from "../src/services/LeagueService";

describe("laderboard", () => {
  let leagueService;

  beforeEach(() => {
    leagueService = new LeagueService();
  });

  test('check-leaderboard-teams', async () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Brazil',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 1
      }
    ];
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe('Brazil');
    expect(firstTeam.matchesPlayed).toBe(1);
    expect(firstTeam.goalsFor).toBe(2);
    expect(firstTeam.goalsAgainst).toBe(1);
    expect(firstTeam.points).toBe(3);

    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe('France');
    expect(secondTeam.matchesPlayed).toBe(1);
    expect(secondTeam.goalsFor).toBe(1);
    expect(secondTeam.goalsAgainst).toBe(2);
    expect(secondTeam.points).toBe(0);
  });

  test('check-tiebreaker-by-head-to-head-points-with-2-teams', async () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Brazil',
        awayTeam: 'Serbia',
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 0
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Switzerland',
        awayTeam: 'Serbia',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 2
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Serbia',
        awayTeam: 'Cameroon',
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 1
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Brazil',
        awayTeam: 'Switzerland',
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 3
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Brazil',
        awayTeam: 'Cameroon',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Switzerland',
        awayTeam: 'Cameroon',
        matchPlayed: false
      }
    ];
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe('Brazil');
    expect(firstTeam.matchesPlayed).toBe(3);
    expect(firstTeam.goalsFor).toBe(3);
    expect(firstTeam.goalsAgainst).toBe(3);
    expect(firstTeam.points).toBe(4);
    
    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe('Serbia');
    expect(secondTeam.matchesPlayed).toBe(3);
    expect(secondTeam.goalsFor).toBe(3);
    expect(secondTeam.goalsAgainst).toBe(2);
    expect(secondTeam.points).toBe(4);
  });

  test('check-tiebreaker-by-head-to-head-points-with-3-teams', async () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Brazil',
        awayTeam: 'Serbia',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Switzerland',
        awayTeam: 'Serbia',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 2
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Serbia',
        awayTeam: 'Cameroon',
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 2
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Brazil',
        awayTeam: 'Switzerland',
        matchPlayed: true,
        homeTeamScore: 4,
        awayTeamScore: 2
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Brazil',
        awayTeam: 'Cameroon',
        matchPlayed: false,
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Switzerland',
        awayTeam: 'Cameroon',
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 2
      }
    ];
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe('Cameroon');
    expect(firstTeam.matchesPlayed).toBe(2);
    expect(firstTeam.goalsFor).toBe(4);
    expect(firstTeam.goalsAgainst).toBe(3);
    expect(firstTeam.points).toBe(4);
    
    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe('Brazil');
    expect(secondTeam.matchesPlayed).toBe(2);
    expect(secondTeam.goalsFor).toBe(4);
    expect(secondTeam.goalsAgainst).toBe(2);
    expect(secondTeam.points).toBe(4);

    const thirdTeam = leaderboard[2];
    expect(thirdTeam.teamName).toBe('Serbia');
    expect(thirdTeam.matchesPlayed).toBe(3);
    expect(thirdTeam.goalsFor).toBe(3);
    expect(thirdTeam.goalsAgainst).toBe(2);
    expect(thirdTeam.points).toBe(4);
  });

  test('check-tiebreaker-by-goal-difference', async () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Brazil',
        awayTeam: 'Serbia',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Switzerland',
        awayTeam: 'Serbia',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 2
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Serbia',
        awayTeam: 'Cameroon',
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 1
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Brazil',
        awayTeam: 'Switzerland',
        matchPlayed: true,
        homeTeamScore: 3,
        awayTeamScore: 2
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Brazil',
        awayTeam: 'Cameroon',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Switzerland',
        awayTeam: 'Cameroon',
        matchPlayed: false
      }
    ];
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe('Serbia');
    expect(firstTeam.matchesPlayed).toBe(3);
    expect(firstTeam.goalsFor).toBe(3);
    expect(firstTeam.goalsAgainst).toBe(1);
    expect(firstTeam.points).toBe(5);
    
    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe('Brazil');
    expect(secondTeam.matchesPlayed).toBe(3);
    expect(secondTeam.goalsFor).toBe(3);
    expect(secondTeam.goalsAgainst).toBe(2);
    expect(secondTeam.points).toBe(5);
  });

  test('check-tiebreaker-by-the-number-of-scored-goals', async () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Brazil',
        awayTeam: 'Serbia',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Switzerland',
        awayTeam: 'Serbia',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 2
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Serbia',
        awayTeam: 'Cameroon',
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 1
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Brazil',
        awayTeam: 'Switzerland',
        matchPlayed: true,
        homeTeamScore: 4,
        awayTeamScore: 2
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Brazil',
        awayTeam: 'Cameroon',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 0
      },
      {
        matchDate: Date.now(),
        stadium: 'Stadium',
        homeTeam: 'Switzerland',
        awayTeam: 'Cameroon',
        matchPlayed: false
      }
    ];
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe('Brazil');
    expect(firstTeam.matchesPlayed).toBe(3);
    expect(firstTeam.goalsFor).toBe(4);
    expect(firstTeam.goalsAgainst).toBe(2);
    expect(firstTeam.points).toBe(5);
    
    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe('Serbia');
    expect(secondTeam.matchesPlayed).toBe(3);
    expect(secondTeam.goalsFor).toBe(3);
    expect(secondTeam.goalsAgainst).toBe(1);
    expect(secondTeam.points).toBe(5);
  });
});