const axios = require('axios');

interface GameSession
{
    sessionId:String;
    playerId:String;
}

interface PlayerData
{
    tokenStartId:number;
    tokenEndId:number;
    largePitIndex:number;
    score:number;
}

interface BoardGameState
{
    activePlayerID:number;
    clientPlayerID:number;

    availableMoves:number[];
    fields:number[];
    playerData:PlayerData[];
}

interface GameState
{
    hasGameStarted:Boolean;
    hasGameFinished:Boolean;
    winningPlayerID:number;

    boardGameState:BoardGameState;
}   

export default class MancalaModel
{
  private gameSession:GameSession;
  public gameState:GameState;

  private observers:any[] = [];
  private observersGameState:any[] = [];
  private observersGameReady:any[] = [];

  private intervalData:any;

  private httpPath:String = 'api/';

  private joined:boolean = false;

  constructor()
  {
  }

  joinGame()
  {
    this.post(this.httpPath + 'user/join')
    .then(data => {
        this.gameSession = {sessionId: data.sessionUuid, playerId: data.playerUuid};

        this.joined = true;

        // this.notifyObserversGameReady();
        // this.notifyObserversGameState();
        // this.notifyObservers();

        this.intervalData = setInterval(()=>
        {
            this.updateGameState()
        }, 500);
    });
  }

  updateGameState()
  {
    if(!this.gameSession) return;

    axios.get(this.httpPath + 'game/state', 
    { 
        params: { sessionId: this.gameSession.sessionId.toString(), playerId: this.gameSession.playerId.toString() } 
    })
    .then((response) =>
    {
        this.gameState = response.data;

        //for the join status
        this.notifyObserversGameReady();

        if(this.gameState.hasGameFinished)
        {
            this.notifyObserversGameState();
        }
        else
        {
            this.notifyObservers();
        }

        this.processGameState();
    });
  }

  playMove(pitIndex:number)
  {
    this.post(this.httpPath + 'input/play', {sessionUuid: this.gameSession.sessionId.toString(), playerUuid: this.gameSession.playerId.toString(), selectedPit: pitIndex})
    .then(data => {  
          this.updateGameState();
    });
  }     

  async post(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
    }

  processGameState()
  {
      if(this.gameState.hasGameFinished)
      {
          //stop the loop
          clearInterval(this.intervalData);
      }
  }

  attachGameReadyObserver(observer:any)
  {
    if(!this.observersGameReady.includes(observer))
    {
        this.observersGameReady.push(observer);
    }
  }

  attachGameStateObserver(observer:any)
  {
    if(!this.observersGameState.includes(observer))
    {
        this.observersGameState.push(observer);
    }
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
      this.observers.forEach(callback => {
          callback(this.gameState.boardGameState.fields);
      });
  }

  notifyObserversGameState()
  {  
      this.observersGameState.forEach(callback => {
          callback(this.gameState.hasGameFinished);
      });
  }

  notifyObserversGameReady()
  {  
    //-2 not joined not started
    //-1 joined, but not started
    //0 joined and started
    let status:number = -2;
    if(this.joined && this.gameState.hasGameStarted) status = 0;
    if(this.joined && !this.gameState.hasGameStarted) status = -1;

    console.log("Game status is: " + status);

    this.observersGameReady.forEach(callback => {
        callback(status);
    });
  }
}