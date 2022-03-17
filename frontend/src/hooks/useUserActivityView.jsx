import Activities from '../components/Activities';
import WordsLearned from '../components/WordsLearned';

const useUserActivityView = (view, user, showAll=false) => {
    switch (view) {
        case 'activity':
            return <Activities user={user} showAll={showAll} />
        case 'history':
            return <WordsLearned user={user}/>
        default:
            return <></>
    }
}


export default useUserActivityView;
