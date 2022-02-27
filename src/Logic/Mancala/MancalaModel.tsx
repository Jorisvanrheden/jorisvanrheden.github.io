const axios = require('axios');

interface GameSession
{
    sessionId:String;
    playerId:String;
}

export default class MancalaModel
{
  private gameSession:GameSession;

  private observers:any[] = [];

  constructor()
  {
      console.log("Joining");
    this.joinGame();     
  }

  joinGame()
  {
    axios.post('http://localhost:8080/api/user/join')
    .then((response) =>
    {
        this.gameSession = {sessionId: response.data.sessionUuid, playerId: response.data.playerUuid};

        console.log(this.gameSession);
    });
  }

  getGameState()
  {
    axios.get('http://localhost:8080/api/game/state', { params: { sessionId: this.gameSession.sessionId.toString(), playerId: this.gameSession.playerId.toString() } })
    .then((response) =>
    {
        console.log(response.data);

        this.notifyObservers();
    });
  }

  playMove(pitIndex:Number)
  {
    axios.post('http://localhost:8080/api/input/play', 
    { 
        params: { selectedPit: pitIndex },
        data: 
        {
            sessionUuid: this.gameSession.sessionId.toString(),
            playerUuid: this.gameSession.playerId.toString()
        } 
    })
    .then((response) =>
    {
        console.log(response.data);

        //this.getGameState();
    });
  }

  attachObserver(observer:any)
  {
      if(!this.observers.includes(observer))
      {
          this.observers.push(observer);
      }
  }
    
  notifyObservers()
  {
      //let tiles = this.grid.getTiles();
  
      this.observers.forEach(callback => {
          callback([1,2,3]);
      });
  }
}