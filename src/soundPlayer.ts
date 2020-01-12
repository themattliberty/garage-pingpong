import score from './score.mp3'

//TODO make this module a container or something instead of loading this at import
const scoreAudio = new Audio(score);

export function playScore() {
    scoreAudio.play();
}
