let rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
  grid: []
};

let gridSize = 10;
rover.grid = Array(gridSize).fill('').map(n => Array(gridSize).fill(''));

// let's add some obstacles
rover.grid[2][0] = "o";
rover.grid[8][6] = "o";
rover.grid[5][1] = "o";
rover.grid[4][5] = "o";


function turnLeft(){
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
    default:
      // won't happen
      throw "Unknown rover direction"
  }
  console.log(`Now facing ${rover.direction}`);
}

function turnRight(){
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "N";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "S";
      break;
    default:
      // won't happen
      throw "Unknown rover direction"
  }
  console.log(`Now facing ${rover.direction}`);
}

function moveForward(){
  rover.travelLog.push(`(${rover.x}, ${rover.y})`);
  switch (rover.direction) {
    case "N":
      rover.y --;
      break;
    case "W":
      rover.x --;
      break;
    case "S":
      rover.y ++;
      break;
    case "E":
      rover.x ++;
      break;
    default:
      // won't happen
      throw "Unknown rover direction"
  }
  endOfMove();
}

function moveBackward(){
  rover.travelLog.push(`(${rover.x}, ${rover.y})`);
  switch (rover.direction) {
    case "N":
      rover.y ++;
      break;
    case "W":
      rover.x ++;
      break;
    case "S":
      rover.y --;
      break;
    case "E":
      rover.x --;
      break;
    default:
      // won't happen
      throw "Unknown rover direction"
  }
  endOfMove();
}

function endOfMove() {
  if (verifyPosition() || checkForObstacle()) {
    let oldPos = rover.travelLog.pop();
    let positions = oldPos.replace("(", "").replace(")", "").split(", ");
    rover.x = parseInt(positions[0]);
    rover.y = parseInt(positions[1]);
  } else {
    console.log(`Current position: (${rover.x}, ${rover.y})`);
  }
}

function verifyPosition() {
  if ( rover.x >= gridSize || rover.x < 0 
    || rover.y >= gridSize || rover.y < 0 ) {
      console.log("Can't move, hit the end of the world!")
      return true;
    }
  return false;
}

function checkForObstacle() {
  if (rover.grid[rover.x][rover.y] === 'o') {
    console.log("Can't move, hit an obstacle!")
    return true;
  }
  return false;
}

function handleCommand(command) {
  for (let char of command) {
    switch (char) {
      case 'l':
        turnLeft();
        break;
      case 'r':
        turnRight();
        break;
      case 'f':
        moveForward();
        break;
      case 'b':
        moveBackward();
        break;
      default:
        // ignore invalid command
    }
  }
  console.log("Travellog: ", rover.travelLog.join(", "));
}
