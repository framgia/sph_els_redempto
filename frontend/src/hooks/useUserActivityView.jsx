import Activities from '../components/Activities';
import WordsLearned from '../components/WordsLearned';

const useUserActivityView = (view, user, followersOnly=false) => {
    switch (view) {
        case 'activity':
            return <Activities user={user} followersOnly={followersOnly} />
        case 'history':
            return <WordsLearned user={user}/>
        default:
            return <></>
    }
}


export default useUserActivityView;
