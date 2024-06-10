export class Timer {
    constructor(){}

    setTimer = () => {
        localStorage.setItem('gameTimer', {minute: 0, second: 10});
    }


}