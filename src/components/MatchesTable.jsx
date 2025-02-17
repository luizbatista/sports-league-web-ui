import styles from './MatchesTable.module.css';
import { format } from 'date-fns';

function MatchesTable({ matches }) {
    const getFlagUrl = (country) => `https://flagsapi.codeaid.io/${country}.png`;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return (
            <>
                <div>{format(date, 'dd.MM.yyyy')}</div>
                <div>{format(date, 'HH:mm')}</div>
            </>
        );
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.date}>Date/Time</th>
                    <th className={styles.stadium}>Stadium</th>
                    <th className={styles.homeTeam}>Home Team</th>
                    <th></th>
                    <th className={styles.awayTeam}>Away Team</th>
                </tr>
            </thead>
            <tbody>
                {matches?.map((match, index) => (
                    <tr key={index}>
                        <td className={styles.date}>{formatDate(match.matchDate)}</td>
                        <td className={styles.stadium}>{match.stadium}</td>
                        <td className={styles.homeTeam}>
                            {match.homeTeam}
                            <img 
                                src={getFlagUrl(match.homeTeam)} 
                                alt={match.homeTeam} 
                                className={styles.flag}
                            />
                        </td>
                        <td className={styles.score}>
                            {match.matchPlayed 
                                ? `${match.homeTeamScore} : ${match.awayTeamScore}`
                                : '- : -'
                            }
                        </td>
                        <td className={styles.awayTeam}>
                            <img 
                                src={getFlagUrl(match.awayTeam)} 
                                alt={match.awayTeam} 
                                className={styles.flag}
                            />
                            {match.awayTeam}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MatchesTable; 