// GitHub Notes: This was the first V3 modhcarts made, so not all functions in this script have been converted or are working as intended.
// If you are using this as a template please pay attention to the comments I've made on things!
// Skip to line 1000 for the template and copypasta for (almost) everything V3 related :)
 



// --------------------------------------------------------------------------------------------------------------------------------
//   IMPORTANT: IF YOU ARE USING THIS AS A TEMPLATE FILE FOR YOUR CHATS
//   
//   PLEASE USE FUNCTIONS TO ASSIGN TRACKS
//   
//   DO NOT ASSIGN TRACKS USING THE `filterednotes` METHOD.
//   
//   The various assign track fuctions will sort all the tracks into arrays allowing you to use multiple tracks on one object.
//   Currently, the `filterednotes` method of assigning tracks willr emove any array and only allow for one track per object.
// --------------------------------------------------------------------------------------------------------------------------------

/*
//#region standDiffChanges
Remove scale zoom in kicks on 3rd part of drop when envi is being scaled down (zoom out)
Move lasers on drop to original position
*/





"use strict";

const fs = require("fs");

// Note: Check bottom of script for info on how the lighting was imported/converted.
// I was in the process of trying to make my own tool to convert the V2 Chroma lightshow that Reddek had made into a V3 format
// It's scuffed.

const lightsPath = "Lightshow.dat";
const convertV2toV3 = false;
let ClearOldEvents = false;

const INPUT = "ExpertStandard.dat";
const OUTPUT = "ExpertPlusStandard.dat";
/*
const INPUT = "NormalStandard.dat";
const OUTPUT = "HardStandard.dat";
*/
let difficulty = JSON.parse(fs.readFileSync(INPUT));

//#region this just counts how many time you ran it for fun, feel free to remove.
if (!fs.existsSync("count.txt")) {
  fs.writeFileSync("count.txt", parseInt("0").toString());
}
let count = parseInt(fs.readFileSync("count.txt"));
count++;
fs.writeFileSync("count.txt", count.toString());
console.log("GIVE IT UP FOR RUN " + count);
//#endregion



//    -  -  -  -  -  -  -  -  -  -  -  -  -  LOOK BELOW FOR GREEN TEXT WITH A LINE LIKE THIS. READ ALL OF THESE BEFORE USING!  -  -  -  -  -  -  -  -  -  -  -  -  -  





difficulty.customData = { materials: {}, pointDefinitions: {}, environment: [], customEvents: [], fakeColorNotes: [], fakeBombNotes: [], fakeObstacles: [], fakeBurstSliders: [] };



const customData = difficulty.customData;
const obstacles = difficulty.obstacles;
const notes = difficulty.colorNotes; 
const burstSliders = difficulty.burstSliders; 
const sliders = difficulty.sliders; 
const bombs = difficulty.bombNotes; 
const events = difficulty.basicBeatmapEvents;
const customEvents = customData.customEvents;
const pointDefinitions = customData.pointDefinitions;
const environment = customData.environment;
const geometry = customData.environment.geometry;
const materials = customData.materials;
const fakeNotes = customData.fakeColorNotes;
const fakeBombs = customData.fakeBombNotes;
const fakeObstacles  = customData.fakeObstacles;
const fakeBurstSliders = customData.fakeBurstSliders;

let filterednotes;
let filteredSliders;
let filteredburstSliders;
let filteredevents;
let filteredobstacles;
let filteredbombs;
let filteredsliders;

obstacles.forEach(wall => {
  if (!wall.customData) {
    wall.customData = {};
  }
});
notes.forEach(note => {
  if (!note.customData) {
    note.customData = {};
  }
});

bombs.forEach(bomb => {
  if (!bomb.customData) {
    bomb.customData = {};
  }
});

sliders.forEach(slider => {
  if (!slider.customData) {
    slider.customData = {};
  }
});

burstSliders.forEach(burstSlider => {
  if (!burstSlider.customData) {
    burstSlider.customData = {};
  }
});

if (!environment.geometry) {
  environment.geometry = {};
}



//#region FIXED V3 FUNCTIONS
function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function notesAt(times) {
  return notes.filter(n => times.some(t => n.b == t));
}

function genCircle(radius, n) {
  let pointss = [];
  for (let i = 0; i < n; i++) {
    pointss.push([
      radius * Math.cos(((2 * Math.PI) / n) * i) - 0.5,
      radius * Math.sin(((2 * Math.PI) / n) * i) * 1.16 - 1.6
    ]);
  }
  return pointss;
}

function genCircleNoCorrection(radius, n) {
  let pointss = [];

  for (let i = 0; i < n; i++) {
    pointss.push([
      radius * Math.cos(((2 * Math.PI) / n) * i),
      radius * Math.sin(((2 * Math.PI) / n) * i)
    ]);
  }
  return pointss;
}

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

function trackOnNotesBetween(track, p1, p2) {
  filterednotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filterednotes.forEach(note => {
    if (!note.customData.track) {
    note.customData.track = track;
    }
    else {
      if(Array.isArray(note.customData.track)) {
        note.customData.track.push(track);
      }
      else {
        let prevTrack = note.customData.track;
        note.customData.track = [prevTrack];
        note.customData.track.push(track);
      }
    }
  });
  return filterednotes;
}

function trackOnNotesBetweenRBSep(trackR, trackB, p1, p2) {
  filterednotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filterednotes.forEach(note => {
  if (!note.customData.track) {
    if (note.c == 0) {
      note.customData.track = trackR;
    }
    if (note.c == 1) {
      note.customData.track = trackB;
    }
  }
  else {
    if(Array.isArray(note.customData.track)) {
      if (note.c == 0) {
      note.customData.track.push(trackR);
      }
      if (note.c == 0) {
        note.customData.track.push(trackB);
        }
    }
    else {
      let prevTrack = note.customData.track;
      note.customData.track = [prevTrack];
      if (note.c == 0) {
        note.customData.track.push(trackR);
        }
        if (note.c == 0) {
          note.customData.track.push(trackB);
          }
    }
  }
  });
  return filterednotes;
}

function offestOnNotesBetweenRBSep(start, end, potentialOffset, offsetR, offsetB ) {
  filterednotes = notes.filter(n => n.b >= start && n.b <= end);
  filterednotes.forEach(note => {
    if (typeof potentialOffset !== "undefined") {
      note.customData.noteJumpStartBeatOffset = potentialOffset;
    }
    if (note.c == 0) {
      note.customData.noteJumpStartBeatOffset = offsetR;
    }
    if (note.c == 1) {
      note.customData.noteJumpStartBeatOffset = offsetB;
    }
  });
  filteredburstSliders = burstSliders.filter(n => n.b >= start && n.b <= end);
  filteredburstSliders.forEach(burstSliders => {
    if (typeof potentialOffset !== "undefined") {
      burstSliders.customData.noteJumpStartBeatOffset = potentialOffset;
    }
    if (burstSliders.c == 0) {
      burstSliders.customData.noteJumpStartBeatOffset = offsetR;
    }
    if (burstSliders.c == 1) {
      burstSliders.customData.noteJumpStartBeatOffset = offsetB;
    }
  });
  return filteredburstSliders && filterednotes;
}

function trackOnNotesBetweenDirSep( p1, p2, trackUp, trackDown, trackLeft, trackRight, trackUpLeft, trackUpRight, trackDownLeft, trackDownRight, trackDot) {
  filterednotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filterednotes.forEach(note => {
    if (!note.customData.track) {
      if (note.d == 0) {
        note.customData.track = trackUp;
      }
      if (note.d == 1) {
        note.customData.track = trackDown;
      }
      if (note.d == 2) {
        note.customData.track = trackLeft;
      }
      if (note.d == 3) {
        note.customData.track = trackRight;
      }
      if (note.d == 4) {
        note.customData.track = trackUpLeft;
      }
      if (note.d == 5) {
        note.customData.track = trackUpRight;
      }
      if (note.d == 6) {
        note.customData.track = trackDownLeft;
      }
      if (note.d == 7) {
        note.customData.track = trackDownRight;
      }
      if (note.d == 8) {
        note.customData.track = trackDot;
      }
  }
  else {
    if(Array.isArray(note.customData.track)) {
      if (note.d == 0) {
        note.customData.track.push(trackUp);
      }
      if (note.d == 1) {
        note.customData.track.push(trackDown);
      }
      if (note.d == 2) {
        note.customData.track.push(trackLeft);
      }
      if (note.d == 3) {
        note.customData.track.push(trackRight);
      }
      if (note.d == 4) {
        note.customData.track.push(trackUpLeft);
      }
      if (note.d == 5) {
        note.customData.track.push(trackUpRight);
      }
      if (note.d == 6) {
        note.customData.track.push(trackDownLeft);
      }
      if (note.d == 7) {
        note.customData.track.push(trackDownRight);
      }
      if (note.d == 8) {
        note.customData.track.push(trackDot);
      }
    }
    else {
      let prevTrack = note.customData.track;
      note.customData.track = [prevTrack];
      if (note.d == 0) {
        note.customData.track.push(trackUp);
      }
      if (note.d == 1) {
        note.customData.track.push(trackDown);
      }
      if (note.d == 2) {
        note.customData.track.push(trackLeft);
      }
      if (note.d == 3) {
        note.customData.track.push(trackRight);
      }
      if (note.d == 4) {
        note.customData.track.push(trackUpLeft);
      }
      if (note.d == 5) {
        note.customData.track.push(trackUpRight);
      }
      if (note.d == 6) {
        note.customData.track.push(trackDownLeft);
      }
      if (note.d == 7) {
        note.customData.track.push(trackDownRight);
      }
      if (note.d == 8) {
        note.customData.track.push(trackDot);
      }
    }
  }
  });
  return filterednotes;
}

function offsetNJSOnNotesBetween(p1, p2, NJS, offset) {
  filterednotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filterednotes.forEach(note => {
      note.customData.noteJumpStartBeatOffset = offset;
      note.customData.noteJumpMovementSpeed = NJS;
  });
  filteredburstSliders = burstSliders.filter(n => n.b >= p1 && n.b <= p2);
  filteredburstSliders.forEach(burstSliders => {
    burstSliders.customData.noteJumpStartBeatOffset = offset;
    burstSliders.customData.noteJumpMovementSpeed = NJS;
  });
  filteredSliders = sliders.filter(s => s.b >= p1 && s.b <= p2);
  filteredSliders.forEach(sliders => {
    sliders.customData.noteJumpStartBeatOffset = offset;
    sliders.customData.noteJumpMovementSpeed = NJS;
  });
  return filteredSliders && filteredburstSliders && filterednotes;
}

function trackOnNotesBetweenLaneSep(trackLane1, trackLane2, trackLane3, trackLane4, p1, p2) {
  filterednotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filterednotes.forEach(note => {
    if (!note.customData.track) {
      if (note.x == 0) {
        note.customData.track = trackLane1;
      }
      if (note.x == 1) {
        note.customData.track = trackLane2;
      }
      if (note.x == 2) {
        note.customData.track = trackLane3;
      }
      if (note.x == 3) {
        note.customData.track = trackLane4;
      }
    }
    else {
      if(Array.isArray(note.customData.track)) {
        if (note.x == 0) {
          note.customData.track.push(trackLane1);
        }
        if (note.x == 1) {
          note.customData.track.push(trackLane2);
        }
        if (note.x == 2) {
          note.customData.track.push(trackLane3);
        }
        if (note.x == 3) {
          note.customData.track.push(trackLane4);
        }
      }
      else {
        let prevTrack = note.customData.track;
        note.customData.track = [prevTrack];
          if (note.x == 0) {
            note.customData.track.push(trackLane1);
          }
          if (note.x == 1) {
            note.customData.track.push(trackLane2);
          }
          if (note.x == 2) {
            note.customData.track.push(trackLane3);
          }
          if (note.x == 3) {
            note.customData.track.push(trackLane4);
          }
      }
    }
  });
  return filterednotes;
}

//#region Custom Functions

function transformArray(arr, constantFactor = 1, startFactor = 1, endFactor = 1) {
  let numRows = arr.length;
  
  return arr.map((row, index) => {
      let rowFactor = startFactor + (endFactor - startFactor) * (index / (numRows - 1)); // Linear interpolation
      return row.map((value, colIndex) => {
          if (colIndex < 2) {
              return value * constantFactor * rowFactor; // Apply both constant and row factors to the first two values
          }
          return value; // Leave the rest unchanged
      });
  });
}

let vibValues = [
  [0, 0, 0, 0],
  [-1, -0.2*2, 0, 0.05],
  [0.8, 0.1*2, 0, 0.1],
  [0.6, -0.25*2, 0, 0.15],
  [-1, 0.2*2, 0, 0.2],
  [0.4, -0.15*2, 0, 0.25],
  [0.6, 0.25*2, 0, 0.3],
  [0.8, -0.1*2, 0, 0.35],
  [-1, 0.2*2, 0, 0.4],
  [-0.6, -0.25*2, 0, 0.45],
  [-0.4, 0.1*2, 0, 0.5],
  [1, 0.2, 0, 0.55],
  [0.8, 0.15*2, 0, 0.6],
  [0.6, -0.25*2, 0, 0.65],
  [-1, 0.2*2, 0, 0.7],
  [-0.4, -0.15*2, 0, 0.75],
  [-0.6, 0.25*2, 0, 0.8],
  [0.8, -0.3*2, 0, 0.85],
  [1, 0.2*2, 0, 0.9],
  [0, 0, 0, 1]
];








//#endregion










//#region COPY/PASTE   -  -  -  -  -  -  -  -  -  -  -  -  -  use these as a copy/paste template for the lazy   -  -  -  -  -  -  -  -  -  -  -  -  -  
/*

Check out the aimation docs for examples of just about everything featured here:
https://github.com/Aeroluna/Heck/wiki/AnimationProperties


//---------------------------------------------- NOTES & WALLS ----------------------------------------------

filterednotes = notesAt([69]);
filterednotes.forEach(note => {
  
});

filterednotes = notes.filter(n => n.b >= 69 && n.b <= 420);
filterednotes.forEach(note => {
  note.customData.track = "dumbTrackNameHere";
  note.customData.noteJumpStartBeatOffset = 69;
  note.customData.noteJumpMovementSpeed = 420;
  note.customData.flip = [x, y];
  note.customData.spawnEffect = false;
  note.customData.disableNoteGravity = true;
  note.customData.disableNoteLook = true;
  note.customData.uninteractable = true;
  note.customData.coordinates = [x, y];
  note.customData.worldRotation = [x, y, z];
  note.customData.localRotation = [x, y, z];
  note.customData.color = [r, g, b, a];
  note.customData.animation = {}
  note.customData.animation.offsetPosition = [[x, y, z, t], [x, y, z, 0.5,"easeOutElastic"]];
  note.customData.animation.offsetWorldRotation = [[pitch, yaw, roll, time], [pitch, yaw, roll, 0.5,"easeOutElastic"]];
  note.customData.animation.scale = [[x, y, z, time], [x, y, z, time]]; 
  note.customData.animation.dissolveArrow = [[0,0], [1,0.5]]; 
  note.customData.animation.interactable = [[0,02499], [1,0.25]];
});



obstacles.push({
  b: 69,
  x: 0,
  y: 0,   //base 0-2
  d: 420, //duration
  h: 0,   //height 1-5
  w: 0,   //width
  customData:{
    track = "dumbTrackNameHere";
    noteJumpStartBeatOffset = 69;
    noteJumpMovementSpeed = 420;
    uninteractable = true;
    coordinates = [x, y];
    worldRotation = [x, y, z];
    localRotation = [x, y, z];
    size: [w, h, l];
    color = [r, g, b, a];
    animation = {}
    animation.offsetPosition = [[x, y, z, t], [x, y, z, 0.5,"easeOutElastic"]];
    animation.offsetWorldRotation = [[pitch, yaw, roll, time], [pitch, yaw, roll, 0.5,"easeOutElastic"]];
    animation.scale = [[x, y, z, time], [x, y, z, time]]; 
    animation.interactable = [[0,0.2499], [1,0.25]];
  }
});


//---------------------------------------------- EVENTS ----------------------------------------------

pointDefinitions.push({
  _name: "pointDefExample",
  _points: pointDefExample(0.69, 0, 0, 50)
});

----- Color is on a scale from 0 - 1, and NOT 0 - 255 -----

customEvents.push({
  b: 69,
  t: "AnimateTrack",
  d: {
    track: "dumbTrackNameHere",
    duration: 420,
    easing: "easeOutQuad",
    offsetPosition: [[x, y, z, time, (optional)easing], [0, 10, 10, 1]],
    offsetWorldRotation: [[pitch, yaw, roll, time, (optional)easing], [0, 0, 180, 1]],
    localRotation: [[pitch, yaw, roll, time, (optional)easing], [0, 0, 180, 1]],
    scale: [[x, y, z, time], [x, y, z, time]],
    dissolve: [[dissolve, time, (optional)easing], [1, 1]],
    dissolveArrow: [[1, 0], [0, 1]],
    color: [[red, green, blue, alpha, time, (optional)easing]]
  }
});       

customEvents.push({
  b: 69,
  t: "AssignPathAnimation",
  d: {
    track: "dumbTrackNameHere",
    duration: 420,
    easing: "easeOutQuad",
    definitePosition: [[x, y, z, time, (optional)easing], [0, 10, 10, 1]],
    offsetPosition: [[x, y, z, time, (optional)easing], [0, 10, 10, 1]],
    offsetWorldRotation: [[pitch, yaw, roll, time, (optional)easing], [0, 0, 180, 1]],
    localRotation: [[pitch, yaw, roll, time, (optional)easing], [0, 0, 180, 1]],
    scale: [[x, y, z, time], [x, y, z, time]],
    dissolve: [[dissolve, time, (optional)easing], [1, 1]],
    dissolveArrow: [[1, 0], [0, 1]],
    color: [[red, green, blue, alpha, time, (optional)easing]],
    interactable: [[0,02499], [1,0.25]];
  }
});  

// `target` is optional and not required.
// If left unused, entre player object will be added to the track
// Reminder that origin is based off the floor position
customEvents.push({
  b: 69,
  t: "AssignPlayerToTrack",
  d: {
  track: "playerTrack"
  //target: 
  }
});

customEvents.push({
  b: 0,
  t: "AssignTrackParent",
  d: {
  childrenTracks: ["heckTrack", "frigTrack"], 
  parentTrack: "dumbTrackNameHere" ,
  worldPositionStays: true,
  }
});


//---------------------------------------------- ENVIRONMENTS ----------------------------------------------
----- Dividing position values by 0.6 will convert them to Meters, just putting in standard values will act as "Noodle Units" ----- 
----- 1 unit = 1 Lane  |  1/0.6 = 1 Meter ----- 


environment.push({
  id: "Environment\\.\\[\\d*\\]BottomGlow$",
  lookupMethod: "Regex", // Regex, Exact, Contains, StartsWith, EndsWith
  scale: [69, 1, 1]
  //components: // see below
  duplicate: 1,
  active: true,
  scale: [x, y, z],
  position: [x, y, z],
  localPosition: [x, y, z],
  rotation: [x, y, z],
  localRotation: [x, y, z],
  track: "dumbTrackNameHere"
});

// Components for the thing:

ILightWithId
  lightID: Which ID to assign. For use with the lightID tag for lighting events (Not animateable)
  type: Which event type to active on. (Not animateable)
BloomFogEnvironment: Will always be found on the [0]Environment object.
  attenuation: attenuation is the fog density. logarithmic
  offset: offset I have no idea
  startY: startY is starting Y of the gradient thing
  height: height is the gradient length of the dissolving plane fog
TubeBloomPrePassLight
  colorAlphaMultiplier
  bloomFogIntensityMultiplier



customEvents.push({
  b: 69, // Time in beats.
  t: "AnimateComponent",
  d: {
    track: string // The track you want to animate.
    duration: float, // The length of the event in beats (defaults to 0).
    easing: string, // An easing for the animation to follow (defaults to easeLinear).
    component name: { // name of component
      field name: point definition // name of field on component
    }
  }
} 



filterednotes = notes.filter(n => n.b >= 0 && n.b <= 420);
filterednotes.forEach(note => {
  let n1 = JSON.parse(JSON.stringify(note));
    n1.b -= 0.025;
    n1.customData.track = "fakeNote";
    n1.customData.animation = {}
    n1.customData.animation.offsetPosition = [[-12, 0, 0, 0]];
    n1.customData.uninteractable = true;
    n1.customData.spawnEffect = false;
      fakeNotes.push(n1);
});

filterednotes = bombs.filter(n => n.b >= 0 && n.b <= 420);
filterednotes.forEach(bomb => {
  let b1 = JSON.parse(JSON.stringify(bomb));
    b1.b -= 0.025;
    b1.customData.track = "fakeBomb";
    b1.customData.animation = {}
    b1.customData.animation.offsetPosition = [[-12, 0, 0, 0]];
    b1.customData.uninteractable = true;
    b1.customData.spawnEffect = false;
      fakeBombs.push(b1);
});

filterednotes = obstacles.filter(n => n.b >= 0 && n.b <= 420);
filterednotes.forEach(wall => {
  let w1 = JSON.parse(JSON.stringify(wall));
    w1.b -= 0.025;
    w1.customData.track = "fakeWall";
    w1.customData.animation = {}
    w1.customData.animation.offsetPosition = [[-12, 0, 0, 0]];
    w1.customData.uninteractable = true;
    w1.customData.spawnEffect = false;
      fakeObstacles.push(w1);
});

filterednotes = burstSliders.filter(n => n.b >= 0 && n.b <= 420);
filterednotes.forEach(chain => {
  let c1 = JSON.parse(JSON.stringify(chain));
    c1.b -= 0.025;
    c1.customData.track = "fakeChain";
    c1.customData.animation = {}
    c1.customData.animation.offsetPosition = [[-12, 0, 0, 0]];
    c1.customData.uninteractable = true;
    c1.customData.spawnEffect = false;
      fakeBurstSliders.push(c1);
});

filterednotes = sliders.filter(n => n.b >= 0 && n.b <= 420);
filterednotes.forEach(slider => {
  let s1 = JSON.parse(JSON.stringify(slider));
    s1.b -= 0.025;
    s1.customData.track = "fakeSlider";
    s1.customData.animation = {}
    s1.customData.animation.offsetPosition = [[-12, 0, 0, 0]];
    s1.customData.uninteractable = true;
    s1.customData.spawnEffect = false;
      sliders.push(s1);
});

*/
//#endregion
//#region DO YOUR WORK HERE 

//#region vibConsts

let tinyVib = transformArray(vibValues, 0.25*0.501, 1, 1);
let smallVib = transformArray(vibValues, 0.5*0.501, 1, 1);
let fuckingHugeVib = transformArray(vibValues, 1*0.501, 1, 1);

let zoomOutVib3 = transformArray(vibValues, 0.55*0.501, 1, 0.7);
let zoomOutVib2 = transformArray(vibValues, 0.55*0.7*0.501, 1, 0.7);
let zoomOutVib1 = transformArray(vibValues, 0.55*0.7*0.7*0.501, 1, 0.5);

let hornVib8 = transformArray(vibValues, 0.35*0.501, 1, 0.875);
let hornVib7 = transformArray(vibValues, 0.35*0.501, 0.875, 0.75);
let hornVib6 = transformArray(vibValues, 0.35*0.501, 0.75, 0.625);
let hornVib5 = transformArray(vibValues, 0.35*0.501, 0.625, 0.5);
let hornVib4 = transformArray(vibValues, 0.35*0.501, 0.5, 0.375);
let hornVib3 = transformArray(vibValues, 0.35*0.501, 0.375, 0.25);
let hornVib2 = transformArray(vibValues, 0.35*0.501, 0.25, 0.125);
let hornVib1 = transformArray(vibValues, 0.35*0.501, 0.125, 0);

let hornVib8A = transformArray(vibValues, 0.30*0.501, 1, 0.875);
let hornVib7A = transformArray(vibValues, 0.30*0.501, 0.875, 0.75);
let hornVib6A = transformArray(vibValues, 0.30*0.501, 0.75, 0.625);
let hornVib5A = transformArray(vibValues, 0.30*0.501, 0.625, 0.5);
let hornVib4A = transformArray(vibValues, 0.30*0.501, 0.5, 0.375);
let hornVib3A = transformArray(vibValues, 0.30*0.501, 0.375, 0.25);
let hornVib2A = transformArray(vibValues, 0.30*0.501, 0.25, 0.125);
let hornVib1A = transformArray(vibValues, 0.30*0.501, 0.125, 0);

let hornVib8B = transformArray(vibValues, 0.25*0.501, 1, 0.875);
let hornVib7B = transformArray(vibValues, 0.25*0.501, 0.875, 0.75);
let hornVib6B = transformArray(vibValues, 0.25*0.501, 0.75, 0.625);
let hornVib5B = transformArray(vibValues, 0.25*0.501, 0.625, 0.5);
let hornVib4B = transformArray(vibValues, 0.25*0.501, 0.5, 0.375);
let hornVib3B = transformArray(vibValues, 0.25*0.501, 0.375, 0.25);
let hornVib2B = transformArray(vibValues, 0.25*0.501, 0.25, 0.125);
let hornVib1B = transformArray(vibValues, 0.25*0.501, 0.125, 0);

let hornVib8C = transformArray(vibValues, 0.20*0.501, 1, 0.875);
let hornVib7C = transformArray(vibValues, 0.20*0.501, 0.875, 0.75);
let hornVib6C = transformArray(vibValues, 0.20*0.501, 0.75, 0.625);
let hornVib5C = transformArray(vibValues, 0.20*0.501, 0.625, 0.5);
let hornVib4C = transformArray(vibValues, 0.20*0.501, 0.5, 0.375);
let hornVib3C = transformArray(vibValues, 0.20*0.501, 0.375, 0.25);
let hornVib2C = transformArray(vibValues, 0.20*0.501, 0.25, 0.125);
let hornVib1C = transformArray(vibValues, 0.20*0.501, 0.125, 0);

//#region scaleConsts
let smallKick = [[1,1,1,0],[1.2,1.2,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]];
let bigKickJuan = [[1*20,1*20,1*20,0],[2*20,2*20,2*20,0.125,"easeInSine"], [1*20,1*20,1*20,1,"easeOutSine"]];
let smallKickJuan = [[1*20,1*20,1*20,0],[1.5*20,1.5*20,1.5*20,0.125,"easeInSine"], [1*20,1*20,1*20,1,"easeOutSine"]];

let zoom1kick = [[0.85,0.85,1,0],[0.9,0.9,1,0.125,"easeInSine"], [0.85,0.85,1,"easeOutSine"]];
let zoom2kick = [[0.7,0.7,1,0],[0.75,0.75,1,0.125,"easeInSine"], [0.7,0.7,1,"easeOutSine"]];
let zoom3kick = [[0.55,0.5,1,0],[0.6,0.6,1,0.125,"easeInSine"], [0.55,0.55,1,"easeOutSine"]];
let zoom4kick = [[0.4,0.4,1,0],[0.45,0.45,1,0.125,"easeInSine"], [0.4,0.4,1,"easeOutSine"]];

let zoom1kickJuan = [[0.85*20,0.85*20,1*20,0],[0.9*40,0.9*40,1,0.125,"easeInSine"], [0.85*20,0.85*20,1*20,"easeOutSine"]];
let zoom2kickJuan = [[0.7*20,0.7*20,1*20,0],[0.75*40,0.75*40,1,0.125,"easeInSine"], [0.7*20,0.7*20,1*20,"easeOutSine"]];
let zoom3kickJuan = [[0.55*20,0.5*20,1*20,0],[0.6*20,0.6*20,1,0.125,"easeInSine"], [0.55*20,0.55*20,1*20,"easeOutSine"]];
let zoom4kickJuan = [[0.4*20,0.4*20,1*20,0],[0.45*20,0.45*20,1,0.125,"easeInSine"], [0.4*20,0.4*20,1*20,"easeOutSine"]];

//#region JuanRotateConsts
let danceJuan = [[-40,40,0,0,"easeOutSine"],[40,0,0,0.4,"easeInSine"],[-40,-40,0,0.5,"easeOutSine"],[40,0,0,0.9,"easeOutSine"],[-40,40,0,1,"easeOutSine"]]
let danceJuanLast = [[-40,40,0,0,"easeOutSine"],[40,0,0,0.8,"easeInSine"],[-40,-40,0,1,"easeOutSine"]]
let danceJuanReset = [[-40,40,0,0,"easeOutSine"],[0,0,0,1]]
let danceJuanResetA = [[-40,-40,0,0,"easeOutSine"],[0,0,0,1]]

//#region laserConsts
let eyesJuanLeft = [[-1.9, 5, 40, 0], [-1.9, 5, 40, 1]]
let eyesJuanRight = [[1.9, 5, 40, 0], [1.9, 5, 40, 1]]
let lowerLasersLeft = [[-11, -5, 40, 0], [-11, -5, 40, 1]]
let lowerLasersRight = [[11, -5, 40, 0], [11, -5, 40, 1]]
let lasersResetLeftPos = [[-8, 4, 40, 0], [-8, 4, 40, 1]]
let lasersResetRightPos = [[8, 4, 40, 0], [8, 4, 40, 1]]




//#region lasersMovement
customEvents.push({
  b: 0,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    position: eyesJuanLeft
    }
});

customEvents.push({
  b: 0,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    position: eyesJuanRight
    }
});

customEvents.push({
  b: 133,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    position: lasersResetLeftPos
    }
});

customEvents.push({
  b: 133,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    position: lasersResetRightPos
    }
});

/*
//#region lasersMoveWithJuan

customEvents.push({
  b: 84,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 85,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 85.5,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 86.25,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 88,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 89,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 91,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 91.5,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 92.25,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 93.25,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 104.5,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 105,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 105.5,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 106,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 106.5,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 107.75,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 109.5,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 110.5,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 111.25,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 112.25,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 0.5,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 112.75,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 0.5,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 113.25,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 0.5,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 114.25,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 0.5,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 126.75,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 127.5,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 128,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 129.25,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 131.25,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 132,
  t: "AnimateTrack",
  d: {
    track: ["rightLasers", "leftLasers"],
    duration: 1,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
});
*/

//#region sidewaysLasers
/*
customEvents.push({
  b: 215,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    position: lowerLasersLeft,
    localRotation: [[80,90,180,0],[80,90,180,1]]
    }
});

customEvents.push({
  b: 215,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    position: lowerLasersRight,
    localRotation: [[-80,90,180,0],[-80,90,180,1]]
    }
});

customEvents.push({
  b: 221+2,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    duration: 2,
    position: lowerLasersLeft,
    localRotation: [[80,90,180,0],[80,90,180,1]]

  }
},{
  b: 221+2,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    duration: 2,
    position: lowerLasersRight,
    localRotation: [[-80,90,180,0],[-80,90,180,1]]
  }
});

customEvents.push({
  b: 237+2,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    duration: 2,
    position: lowerLasersLeft,
    localRotation: [[80,90,180,0],[80,90,180,1]]
  }
},{
  b: 237+2,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    duration: 2,
    position: lowerLasersRight,
    localRotation: [[-80,90,180,0],[-80,90,180,1]]
  }
});

customEvents.push({
  b: 269+2,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    duration: 2,
    position: lowerLasersLeft,
    localRotation: [[80,90,180,0],[80,90,180,1]]
  }
},{
  b: 269+2,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    duration: 2,
    position: lowerLasersRight,
    localRotation: [[-80,90,180,0],[-80,90,180,1]]
  }
});

customEvents.push({
  b: 285+2,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    duration: 2,
    position: lowerLasersLeft,
    localRotation: [[80,90,180,0],[80,90,180,1]]
  }
},{
  b: 285+2,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    duration: 2,
    position: lowerLasersRight,
    localRotation: [[-80,90,180,0],[-80,90,180,1]]
  }
});

customEvents.push({
  b: 317+2,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    duration: 2,
    position: lowerLasersLeft,
    localRotation: [[80,90,180,0],[80,90,180,1]]
  }
},{
  b: 317+2,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    duration: 2,
    position: lasersResetRightPos,
    localRotation: [[-80,90,180,0],[-80,90,180,1]]
  }
});

//#region laserResets

customEvents.push({
  b: 221,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    duration: 2,
    position: lasersResetLeftPos,
    localRotation: [[0,0,0,0],[0,0,0,1]]

  }
},{
  b: 221,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    duration: 2,
    position: lasersResetRightPos,
    localRotation: [[0,0,0,0],[0,0,0,1]]
  }
});

customEvents.push({
  b: 237,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    duration: 2,
    position: lasersResetLeftPos,
    localRotation: [[0,0,0,0],[0,0,0,1]]
  }
},{
  b: 237,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    duration: 2,
    position: lasersResetRightPos,
    localRotation: [[0,0,0,0],[0,0,0,1]]
  }
});

customEvents.push({
  b: 269,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    duration: 2,
    position: lasersResetLeftPos,
    localRotation: [[0,0,0,0],[0,0,0,1]]
  }
},{
  b: 269,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    duration: 2,
    position: lasersResetRightPos,
    localRotation: [[0,0,0,0],[0,0,0,1]]
  }
});

customEvents.push({
  b: 285,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    duration: 2,
    position: lasersResetLeftPos,
    localRotation: [[0,0,0,0],[0,0,0,1]]
  }
},{
  b: 285,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    duration: 2,
    position: lasersResetRightPos,
    localRotation: [[0,0,0,0],[0,0,0,1]]
  }
});

customEvents.push({
  b: 317,
  t: "AnimateTrack",
  d: {
    track: "leftLasers",
    duration: 2,
    position: lasersResetLeftPos,
    localRotation: [[0,0,0,0],[0,0,0,1]]
  }
},{
  b: 317,
  t: "AnimateTrack",
  d: {
    track: "rightLasers",
    duration: 2,
    position: lasersResetRightPos,
    localRotation: [[0,0,0,0],[0,0,0,1]]
  }
});
*/





//#region spotLights
customEvents.push({
  b: 0,
  t: "AnimateTrack",
  d: {
    track: "topSpotlight1",
    localRotation: [[90, 90, 270, 0], [90, 90, 270, 1]],
    position: [[3, 10, 15, 0], [3, 10, 15, 1]]
    }
});

customEvents.push({
  b: 0,
  t: "AnimateTrack",
  d: {
    track: "topSpotlight2",
    localRotation: [[90, 90, 270, 0], [90, 90, 270, 1]],
    position: [[2.5, 9, 15, 0], [2.5, 9, 15, 1]]
    }
});

customEvents.push({
  b: 0,
  t: "AnimateTrack",
  d: {
    track: "topSpotlight3",
    localRotation: [[90, 90, 270, 0], [90, 90, 270, 1]],
    position: [[1.5, 8, 15, 0], [1.5, 8, 15, 1]]
    }
});

customEvents.push({
  b: 0,
  t: "AnimateTrack",
  d: {
    track: "topSpotlight4",
    localRotation: [[90, 90, 270, 0], [90, 90, 270, 1]],
    position: [[0.5, 8, 15, 0], [0.5, 8, 15, 1]]
    }
});

customEvents.push({
  b: 0,
  t: "AnimateTrack",
  d: {
    track: "topSpotlight5",
    localRotation: [[90, 90, 270, 0], [90, 90, 270, 1]],
    position: [[-0.5, 8, 15, 0], [-0.5, 8, 15, 1]]
    }
});

customEvents.push({
  b: 0,
  t: "AnimateTrack",
  d: {
    track: "topSpotlight6",
    localRotation: [[90, 90, 270, 0], [90, 90, 270, 1]],
    position: [[-1.5, 8, 15, 0], [-1.5, 8, 15, 1]]
    }
});

customEvents.push({
  b: 0,
  t: "AnimateTrack",
  d: {
    track: "topSpotlight7",
    localRotation: [[90, 90, 270, 0], [90, 90, 270, 1]],
    position: [[-2.5, 9, 15, 0], [-2.5, 9, 15, 1]]
    }
});

customEvents.push({
  b: 0,
  t: "AnimateTrack",
  d: {
    track: "topSpotlight8",
    localRotation: [[90, 90, 270, 0], [90, 90, 270, 1]],
    position: [[-3, 10, 15, 0], [-3, 10, 15, 1]]
    }
});






/*
//#region Juan-Everything Parent
customEvents.push({
  b: 0,
  t: "AssignTrackParent",
  d: {
  childrenTracks: ["Juan", "Everything"], 
  parentTrack: "juanEverything" ,
  worldPositionStays: true,
  }
});
*/







//#region Juan 0-133







//#region he's looking for you
customEvents.push({
  b: 49,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 8,
    localRotation: [[0, 0, 0, 0], [-5, 30, 0, 1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 49+8,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    localRotation: [[-5, 30, 0, 0,"easeInSine"], [-15, -25, 0, 1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 49+8+4,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 8,
    localRotation: [[-15, -25, 0, 0,"easeInSine"], [0, 0, 0, 1,"easeOutSine"]],
  }
}); 




//#region J Dissolve
customEvents.push({
  b: 5,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    dissolve: [[0.5, 0], [1, 0.5, "easeOutSine"],[0.5, 1, "easeInSine"],],
    repeat: 30
  }
}); 

//#region J Movement

customEvents.push({
  b: 0,
  t: "AssignPathAnimation",
  d: {
    track: "Juan",
    duration: 37,
    definitePosition: [[0, 0, 0, 0], [0, 0, 0, 1]],
    dissolve: [[0, 0], [1, 1]],

  }
}); 

customEvents.push({
  b: 0,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[20, 20, 20, 0], [20, 20, 20, 1],],
    offsetPosition: [[0, 100, 80, 0], [0, 100, 80, 1]],
  }
}); 

customEvents.push({
  b: 37,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 8,
    offsetPosition: [[-0.5, 30, 80, 0], [-0.5, 3, 80, 1, "easeOutSine"]],
  }
});   


//#region J color
customEvents.push({
  b: 0,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    color: [[0.2, 0.2, 1, 1, 0],[0.2, 0.2, 1, 1, 0]]
  }
}); 

//#region Juan is speaking

customEvents.push({
  b: 45,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 46,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 47,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 65,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 65.75,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 66.25,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 67,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 68,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 69,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeInSine"]],
  }
}); 

customEvents.push({
  b: 84,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 85,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 85.5,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 86.25,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 88,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 89,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 91,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 91.5,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 92.25,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 93.25,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 104.5,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 105,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 105.5,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 106,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 106.5,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 107.75,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 109.5,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 110.5,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 111.25,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 112.25,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.5,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 112.75,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.5,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 113.25,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.5,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 114.25,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.5,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeInSine"]],
  }
}); 

customEvents.push({
  b: 126.75,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 127.5,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 128,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 129.25,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 131.25,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 132,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});


//#region 133-165 Juan





//#region J color
customEvents.push({
  b: 129,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    color: [[0.2, 0.2, 1, 1, 0],[0.8, 0.2, 0.2, 1, 1,]]
  }
});  





//#region J Rotate
customEvents.push({
  b: 133,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    localRotation: [[0, 0, 0, 0], [40, 0, 0, 1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 140,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    localRotation: [[0, 0, 0, 0], [0, 0, 0, 1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 133+8,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    localRotation: [[0, 0, 0, 0], [40, 0, 0, 1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 140+8,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    localRotation: [[0, 0, 0, 0], [0, 0, 0, 1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 133+16,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    localRotation: [[0, 0, 0, 0], [40, 0, 0, 1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 140+16,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    localRotation: [[0, 0, 0, 0], [0, 0, 0, 1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 133+24,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    localRotation: [[0, 0, 0, 0], [40, 0, 0, 1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 140+23,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    localRotation: [[0, 0, 0, 0], [0, 0, 0, 1,"easeOutSine"]],
  }
});



//#region J Dissolve
customEvents.push({
  b: 129,
  t: "AssignPathAnimation",
  d: {
    track: "Juan",
    duration: 4,
    dissolve: [[0, 0], [4, 1]],
  }
}); 

//#region J Move
customEvents.push({
  b: 140+16,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    offsetPosition: [[-0.5, 0, 80, 0], [-0.5, 0, 80, 1, "easeOutSine"]],
  }
}); 

customEvents.push({
  b: 165,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    offsetPosition: [[-0.5, 5, 80, 0], [-0.5, 5, 80, 1, "easeOutSine"]],

  }
}); 



//#region Juan 4 kicks
customEvents.push({
  b: 140,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.25,
    scale: smallKickJuan,
    repeat: 3
  }
}); 

customEvents.push({
  b: 148,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.25,
    scale: smallKickJuan,
    repeat: 3
  }
}); 

customEvents.push({
  b: 140+16,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.25,
    scale: smallKickJuan,
    repeat: 3
  }
}); 

customEvents.push({
  b: 163,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.25,
    scale: smallKickJuan,
    repeat: 3
  }
}); 

customEvents.push({
  b: 164,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.25,
    scale: smallKickJuan,
    repeat: 3
  }
}); 



//#region Juan zoom 1 kick
customEvents.push({
  b: 133,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: smallKickJuan,
    repeat: 6
  }
});

customEvents.push({
  b: 133+8,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: smallKickJuan,
    repeat: 6
  }
});

customEvents.push({
  b: 133+16,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: smallKickJuan,
    repeat: 6
  }
});

customEvents.push({
  b: 133+24,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: smallKickJuan,
    repeat: 5
  }
});

/*
//#region J zoom out
customEvents.push({
  b: 133,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    scale: [[1*20,1*20,1*20,0],[0.85*20,0.85*20,1*20,1,"easeOutSine"]],  }
}); 

customEvents.push({
  b: 133+8,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    scale: [[1*20,1*20,1*20,0],[0.7*20,0.7*20,1*20,1,"easeOutSine"]],  }
}); 

customEvents.push({
  b: 133+16,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    scale: [[1*20,1*20,1*20,0],[0.55*20,0.55*20,1*20,1,"easeOutSine"]],  }
}); 

customEvents.push({
  b: 133+24,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    scale: [[1*20,1*20,1*20,0],[0.4*20,0.4*20,1*20,1,"easeOutSine"]],  }
}); 
*/

//#region J bulder 165-215





//#region Juan is speaking
customEvents.push({
  b: 126.25+79,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*7,1*7,1*7,0],[1.5*7,1.3*7,1,0.125,"easeInSine"], [7,7,7,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 127.5+79,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*10,1*10,1*10,0],[1.5*10,1.3*10,1*10,0.125,"easeInSine"], [10,10,10,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 128.25+79,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*15,1*15,1*15,0],[1.5*15,1.3*15,1*15,0.125,"easeInSine"], [15,15,15,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 129.25+80,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1*20,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 131+80,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1*20,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 132+80,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1*20,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});


//#region zoom 1/2 kick
customEvents.push({
  b: 165,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.5,
    scale: smallKickJuan,
    repeat: 31
  }
}); 

customEvents.push({
  b: 181,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.25,
    scale: smallKickJuan,
    repeat: 31
  }
}); 

customEvents.push({
  b: 189,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.125,
    scale: smallKickJuan,
    repeat: 31
  }
}); 

customEvents.push({
  b: 193,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: smallKickJuan,
  }
}); 

//#region J dissolve
customEvents.push({
  b: 193,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.5,
    dissolve: [[1, 0], [0, 1]],
    dissolveArrow: [[1, 0], [0, 1]],

  }
}); 

customEvents.push({
  b: 197,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    dissolve: [[0, 0], [1, 1]],
    dissolveArrow: [[0, 0], [1, 1]],
  }
}); 



//#region J zoom in out pause
customEvents.push({
  b: 197,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 16,
    scale: [[1*20,1*20,1*20,0],[0.2*20,0.2*20,1*20,0.5,"easeOutSine"], [1*20,1*20,1*20,1,"easeOutSine"]],
  }
}); 

//#region Juan move with zoom

customEvents.push({
  b: 197.01,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 16,
    offsetPosition: [[-0.5, 3, 80, 0], [-0.5, 0, 80, 0.5, "easeOutSine"],[-0.5, 3, 80, 1, "easeOutSine"]],
  }
}); 



//#region J drop1 213-240.9





//#region dissolve
customEvents.push({
  b: 213,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    dissolve: [[0.25, 0], [2, 1]],
  }
});

//#region J color
customEvents.push({
  b: 213,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    color: [[1, 0.2, 0.2, 1, 1,],[0.4, 0, 0, 0, 1,]]
  }
}); 

//#region J dropPause
customEvents.push({
  b: 213,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: [[1*20,1*20,1*20,0],[4*20,4*20,1*20,0.8,"easeOutSine"],[1*20,1*20,1*20,1,"easeOutSine"]],
    localRotation: [[0,0,0,0],[40,0,0,0.8,"easeInSine"],[-40,40,0,1,"easeOutSine"]],
  }
}); 


//#region J zoom in 2 kicks
customEvents.push({
  b: 215,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: bigKickJuan,
    repeat: 13
  }
}); 

customEvents.push({
  b: 229,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: bigKickJuan,
    repeat: 11
  }
}); 


//#region J Dance
customEvents.push({
  b: 215,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    localRotation: danceJuan,
    repeat: 5
  }
}); 

customEvents.push({
  b: 239,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    localRotation: danceJuanLast,
  }
}); 


//#region Juan dropPt2 241-276.9






//#region J dropPause
customEvents.push({
  b: 245,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: [[1*20,1*20,1*20,0],[4*20,4*20,1*20,0.8,"easeOutSine"],[1*20,1*20,1*20,1,"easeOutSine"]],
    localRotation: [[0,0,0,0],[40,0,0,0.8,"easeInSine"],[-40,40,0,1,"easeOutSine"]],
  }
});

//#region J Dance
customEvents.push({
  b: 241,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    localRotation: danceJuanResetA,
  }
}); 

customEvents.push({
  b: 215+32,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    localRotation: danceJuan,
    repeat: 5
  }
}); 

customEvents.push({
  b: 239+32,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    localRotation: danceJuanLast,
  }
}); 

customEvents.push({
  b: 273,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    localRotation: danceJuanResetA,
  }
}); 


//#region J zoom in 2 kicks
customEvents.push({
  b: 215+32,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: bigKickJuan,
    repeat: 13
  }
}); 

customEvents.push({
  b: 229+32,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: bigKickJuan,
    repeat: 11
  }
}); 



//#region Juan dropPt3 277-332.9





//#region J Move
customEvents.push({
  b: 277,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    offsetPosition: [[-0.5, 5, 80, 0], [-0.5, 0, 80, 1, "easeOutSine"]],
  }
}); 

customEvents.push({
  b: 277+16,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    offsetPosition: [[-0.5, 0, 80, 0], [-0.5, 0, 80, 1, "easeOutSine"]],
  }
}); 

customEvents.push({
  b: 277+32,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    offsetPosition: [[-0.5, 0, 80, 0], [-0.5, 1, 80, 1, "easeOutSine"]],
  }
}); 

customEvents.push({
  b: 277+48,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    offsetPosition: [[-0.5, 0, 80, 0], [-0.5, 2, 80, 1, "easeOutSine"]],
  }
}); 

customEvents.push({
  b: 333,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    offsetPosition: [[-0.5, 2, 80, 0, "easeOutSine"],[-0.5, 0, 80, 1],],
  }
}); 


//#region J rotat e
customEvents.push({
  b: 277,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    localRotation: [[0, 0, 0, 0], [40, 0, 0, 1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 283,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    localRotation: [[40,0,0,0.8,"easeInSine"],[-40,40,0,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 285,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    localRotation: danceJuan,
    repeat: 1
  }
}); 

customEvents.push({
  b: 293,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    localRotation: [[-40,40,0,0,"easeInSine"],[40, 0, 0, 1,"easeOutSine"]],
  }
}); 


customEvents.push({
  b: 283+16,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    localRotation: [[40,0,0,0.8,"easeInSine"],[-40,40,0,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 285+16,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    localRotation: danceJuan,
    repeat: 1
  }
}); 

customEvents.push({
  b: 293+16,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    localRotation: [[-40,40,0,0,"easeInSine"],[40, 0, 0, 1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 283+32,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    localRotation: [[40,0,0,0.8,"easeInSine"],[-40,40,0,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 285+32,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    localRotation: danceJuan,
    repeat: 1
  }
}); 

customEvents.push({
  b: 293+32,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    localRotation: [[-40,40,0,0,"easeInSine"],[40, 0, 0, 1,"easeOutSine"]],
  }
}); 



customEvents.push({
  b: 333,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 4,
    localRotation: [[40,0,0,0,"easeInSine"],[0, 0, 0, 1,"easeOutSine"]],
  }
}); 


//#region J zoom kicks
customEvents.push({
  b: 277,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: [[0.7*20,0.7*20,1*20,0],[1.4*0.7*20,1.4*0.7*20,1*20,0.125,"easeOutSine"],[0.7*20,0.7*20,1*20,1,"easeOutSine"]],
    repeat: 3
  }
}); 

customEvents.push({
  b: 285,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: [[1*20,1*20,1*20,0],[1.4*20,1.4*20,1*20,0.125,"easeOutSine"],[1*20,1*20,1*20,1,"easeOutSine"]],
    repeat: 4
  }
}); 

customEvents.push({
  b: 293,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: [[0.6*20,0.6*20,1*20,0],[1.4*0.6*20,1.4*0.6*20,1*20,0.125,"easeOutSine"],[0.6*20,0.6*20,1*20,1,"easeOutSine"]],
    repeat: 3
  }
}); 

customEvents.push({
  b: 301,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: [[1*20,1*20,1*20,0],[1.4*20,1.4*20,1*20,0.125,"easeOutSine"],[1*20,1*20,1*20,1,"easeOutSine"]],
    repeat: 4
  }
});  

customEvents.push({
  b: 309,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: [[0.5*20,0.5*20,1*20,0],[1.4*0.5*20,1.4*0.5*20,1*20,0.125,"easeOutSine"],[1*20,0.5*20,1*20,1,"easeOutSine"]],
    repeat: 3
  }
}); 

customEvents.push({
  b: 317,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: [[1*20,1*20,1*20,0],[1.4*20,1.4*20,1*20,0.125,"easeOutSine"],[1*20,1*20,1*20,1,"easeOutSine"]],
    repeat: 4
  }
}); 

customEvents.push({
  b: 325,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    scale: [[0.35*20,0.35*20,1*20,0],[1.4*0.35*20,1.4*0.35*20,1*20,0.125,"easeOutSine"],[1*20,1*20,1*20,1,"easeOutSine"]],
    repeat: 3
  }
}); 

//#region Juan is speaking
customEvents.push({
  b: 334,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 334.75,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 335.25,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 337,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 338.625,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

customEvents.push({
  b: 339.5,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 1,
    scale: [[1*20,1*20,1*20,0],[1.5*20,1.3*20,1,0.125,"easeInSine"], [20,20,20,1,"easeOutSine"]],
  }
});

//#region Juan is dead
customEvents.push({
  b: 339,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 2,
    dissolve: [[1, 0],[0, 1]],
    dissolveArrow: [[1, 0],[0, 1,]],
  }
});

//#region note filters


customEvents.push({
  b: 0,
  t: "AssignTrackParent",
  d: {
  childrenTracks: ["notes","arcs"], 
  parentTrack: "playBloqs",
  worldPositionStays: false,
  }
});

//#region Arc Track
filterednotes = sliders.filter(n => n.b >= 0 && n.b <= 999);
filterednotes.forEach(note => {
  note.customData.track = "arcs";
  note.customData.spawnEffect = false;
  note.customData.disableNoteGravity = true;
});





//#region buildNotes 133-164.9


customEvents.push({
  b: 140,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.25,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
    dissolve: [[1,0],[0,0.01,"easeOutSine"],[0.9,0.125,"easeInSine"], [0,0.99,"easeOutSine"],[1,1,"easeOutSine"]],
    repeat: 3,
  }
});

customEvents.push({
  b: 148,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.25,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
    dissolve: [[1,0],[0,0.01,"easeOutSine"],[0.9,0.125,"easeInSine"], [0,0.99,"easeOutSine"],[1,1,"easeOutSine"]],
    repeat: 3,
  }
});

customEvents.push({
  b: 156,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.25,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
    dissolve: [[1,0],[0,0.01,"easeOutSine"],[0.9,0.125,"easeInSine"], [0,0.99,"easeOutSine"],[1,1,"easeOutSine"]],
    repeat: 3,
  }
});

customEvents.push({
  b: 163,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.25,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
    dissolve: [[1,0],[0,0.01,"easeOutSine"],[0.9,0.125,"easeInSine"], [0,0.99,"easeOutSine"],[1,1,"easeOutSine"]],
    repeat: 7,
  }
});




//#region dropNotes 213-...






//#region scaleKicks
customEvents.push({
  b: 215,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 2,
    scale: [[1,1,1,0],[1.5,1.35,1,0.125,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
    repeat: 13
  }
}); 

customEvents.push({
  b: 229,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 2,
    scale: [[1,1,1,0],[1.5,1.35,1,0.125,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
    repeat: 11
  }
}); 

customEvents.push({
  b: 215+32,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 2,
    scale: [[1,1,1,0],[1.5,1.35,1,0.125,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
    repeat: 13
  }
}); 

customEvents.push({
  b: 229+32,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 2,
    scale: [[1,1,1,0],[1.5,1.35,1,0.125,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
    repeat: 11
  }
}); 


//#region dunno
customEvents.push({
  b: 227,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.25,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
    dissolve: [[1,0],[0,0.01,"easeOutSine"],[0.9,0.125,"easeInSine"], [0,0.99,"easeOutSine"],[1,1,"easeOutSine"]],
    repeat: 7,
  }
});



customEvents.push({
  b: 253,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.33,
    dissolve: [[0.25,0,"easeOutSine"],[1,0.5,"easeOutBounce"]],
    repeat : 2
  }
});

customEvents.push({
  b: 301,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.33,
    dissolve: [[0.25,0,"easeOutSine"],[1,0.5,"easeOutBounce"]],
    repeat : 2
  }
});

customEvents.push({
  b: 323,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.33,
    dissolve: [[0.25,0,"easeOutSine"],[1,1,"easeOutBounce"]],
    repeat : 2
  }
});

customEvents.push({
  b: 259,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.25,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
    dissolve: [[1,0],[0,0.01,"easeOutSine"],[0.9,0.125,"easeInSine"], [0,0.99,"easeOutSine"],[1,1,"easeOutSine"]],
    repeat: 7,
  }
});

customEvents.push({
  b: 307,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.25,
    scale: [[1,1,1,0],[1.5,1.3,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
    dissolve: [[1,0],[0,0.01,"easeOutSine"],[0.9,0.125,"easeInSine"], [0,0.99,"easeOutSine"],[1,1,"easeOutSine"]],
    repeat: 7,
  }
});


//#region notes disappear
customEvents.push({
  b: 221,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.66,
    dissolve: [[1, 0,"easeOutSine"],[0, 0.05,"easeOutCirc"],[0, 0.45,"easeOutSine"],[1, 0.5,"easeOutSine"]],
    repeat: 1
  }
});

customEvents.push({
  b: 237,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.66,
    dissolve: [[1, 0,"easeOutSine"],[0, 0.05,"easeOutCirc"],[0, 0.45,"easeOutSine"],[1, 0.5,"easeOutSine"]],
    repeat: 1
  }
});

customEvents.push({
  b: 269,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.66,
    dissolve: [[1, 0,"easeOutSine"],[0, 0.05,"easeOutCirc"],[0, 0.45,"easeOutSine"],[1, 0.5,"easeOutSine"]],
    repeat: 1
  }
});

customEvents.push({
  b: 285,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.66,
    dissolve: [[1, 0,"easeOutSine"],[0, 0.05,"easeOutCirc"],[0, 0.45,"easeOutSine"],[1, 0.5,"easeOutSine"]],
    repeat: 1
  }
});

customEvents.push({
  b: 317,
  t: "AnimateTrack",
  d: {
    track: "notes",
    duration: 0.66,
    dissolve: [[1, 0,"easeOutSine"],[0, 0.05,"easeOutCirc"],[0, 0.45,"easeOutSine"],[1, 0.5,"easeOutSine"]],
    repeat: 1
  }
});

//#region notes outro

//#region Intro 0-132.9







//#region longHornVibrate
customEvents.push({
  b: 37,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 38,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4,
    }
});
customEvents.push({
  b: 39,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5,
    }
});
customEvents.push({
  b: 40,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib6,
    }
});
customEvents.push({
  b: 41,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5,
    }
});
customEvents.push({
  b: 42,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 43,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2,
    }
});
customEvents.push({
  b: 44,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1,
    }
});






customEvents.push({
  b: 37+20,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 38+20,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4,
    }
});
customEvents.push({
  b: 39+20,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5,
    }
});
customEvents.push({
  b: 40+20,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib6,
    }
});
customEvents.push({
  b: 41+20,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5,
    }
});
customEvents.push({
  b: 42+20,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 43+20,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2,
    }
});
customEvents.push({
  b: 44+20,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1,
    }
});









customEvents.push({
  b: 37+40,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 38+40,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4,
    }
});
customEvents.push({
  b: 39+40,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5,
    }
});
customEvents.push({
  b: 40+40,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib6,
    }
});
customEvents.push({
  b: 41+40,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5,
    }
});
customEvents.push({
  b: 42+40,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 43+40,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2,
    }
});
customEvents.push({
  b: 44+40,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1,
    }
});







customEvents.push({
  b: 37+60,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 38+60,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4,
    }
});
customEvents.push({
  b: 39+60,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5,
    }
});
customEvents.push({
  b: 40+60,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib6,
    }
});
customEvents.push({
  b: 41+60,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5,
    }
});
customEvents.push({
  b: 42+60,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 43+60,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2,
    }
});
customEvents.push({
  b: 44+60,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1,
    }
});








customEvents.push({
  b: 37+80,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 38+80,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4,
    }
});
customEvents.push({
  b: 39+80,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5,
    }
});
customEvents.push({
  b: 40+80,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib6,
    }
});
customEvents.push({
  b: 41+80,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5,
    }
});
customEvents.push({
  b: 42+80,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 43+80,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2,
    }
});
customEvents.push({
  b: 44+80,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1,
    }
});

//#region shortHornVibrate

customEvents.push({
  b: 53,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 54,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4,
    }
});
customEvents.push({
  b: 55,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2,
    }
});
customEvents.push({
  b: 56,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1,
    }
});


//#region player track

customEvents.push({
  b: 0,
  t: "AssignPlayerToTrack",
  d: {
  track: "playBloqs"
  }
});



//#region preBuild pt 1 129-133












//#region disappear everything
customEvents.push({
  b: 129,
  t: "AnimateTrack",
  d: {
    duration: 0.125,
    track: "everything",
    position: [[0,0,-9999,0],[0,0,-9999,0.499],[0,0,0,0.5],[0,0,0,1]],
    repeat: 14

  }
});

customEvents.push({
  b: 131.25,
  t: "AnimateTrack",
  d: {
    duration: 0.125,
    track: "everything",
    position: [[0,0,-9999,0],[0,0,-9999,0.499],[0,0,0,0.5],[0,0,0,1]],
    repeat: 12

  }
});




//#region dissapear Juan
customEvents.push({
  b: 129,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.125,
    dissolve: [[0, 0],[0, 0.499],[1, 1, "easeOutSine"]],
    scale: [[1, 1, 1, 0], [2, 1.5, 1, 0.0625,"easeOutSine"],[1, 1, 1, 1,"easeInSine"]],
    dissolveArrow: [[0, 0],[0, 0.499],[1, 1, "easeOutSine"]],
    repeat: 14
  }
});

customEvents.push({
  b: 131.25,
  t: "AnimateTrack",
  d: {
    track: "Juan",
    duration: 0.125,
    dissolve: [[0, 0],[0, 0.499],[1, 1, "easeOutSine"]],
    dissolveArrow: [[0, 0],[0, 0.499],[1, 1, "easeOutSine"]],
    scale: [[1, 1, 1, 0], [2, 1.5, 1, 0.0625,"easeOutSine"],[1, 1, 1, 1,"easeInSine"]],
    repeat: 12
  }
});

//#region buildPt1 133-165








customEvents.push({
  b: 133+24,
  t: "AnimateTrack",
  d: {
    track: "playBloqs",
    duration: 8,
    position: [
      [0, 1, 0, 0],  
      [0, 1, 0, 1],       
    ],
  }
}); 

customEvents.push({
  b: 133+32,
  t: "AnimateTrack",
  d: {
    track: "playBloqs",
    duration: 8,
    position: [
      [0, 0, 0, 0],  
      [0, 0, 0, 1],       
    ],
  }
}); 


//#region zoom in 4 kicks
customEvents.push({
  b: 140,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 0.25,
    scale: smallKick,
    repeat: 3
  }
}); 

customEvents.push({
  b: 148,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 0.25,
    scale: smallKick,
    repeat: 3
  }
}); 

customEvents.push({
  b: 140+16,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 0.25,
    scale: smallKick,
    repeat: 3
  }
}); 

customEvents.push({
  b: 163,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 0.25,
    scale: smallKick,
    repeat: 3
  }
}); 

customEvents.push({
  b: 164,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 0.25,
    scale: smallKick,
    repeat: 3
  }
}); 

//#region zoom out
customEvents.push({
  b: 133,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 8,
    scale: [[1,1,1,0],[0.7,0.7,1,1,"easeOutSine"]],  }
}); 

customEvents.push({
  b: 133+8,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 8,
    scale: [[1,1,1,0],[0.6,0.6,1,1,"easeOutSine"]],  }
}); 

customEvents.push({
  b: 133+16,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 8,
    scale: [[1,1,1,0],[0.5,0.5,1,1,"easeOutSine"]],  }
}); 

customEvents.push({
  b: 133+24,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 8,
    scale: [[0.5,0.5,1,0],[0.4,0.4,1,1,"easeOutSine"]],  }
}); 

//#region vibrate

customEvents.push({
  b: 133,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,
    repeat: 6
  }
}); 

customEvents.push({
  b: 141,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,
    repeat: 6
  }
}); 

customEvents.push({
  b: 149,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,
    repeat: 6
  }
}); 

customEvents.push({
  b: 157,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,
    repeat: 6
  }
}); 

customEvents.push({
  b: 162.99,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: [0,0,0],
  }
});

//#region 165-196.9






//#region zoom 1/2 kick
customEvents.push({
  b: 165,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 0.5,
    scale: [[1,1,1,0],[1.1,1.1,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
    repeat: 31
  }
}); 

customEvents.push({
  b: 181,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 0.25,
    scale: [[1,1,1,0],[1.1,1.1,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
    repeat: 31
  }
}); 

customEvents.push({
  b: 189,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 0.125,
    scale: [[1,1,1,0],[1.1,1.1,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
    repeat: 31
  }
}); 

customEvents.push({
  b: 193,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    scale: [[1,1,1,0],[1.1,1.1,1,0.125,"easeInSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 




//#region vibrate

customEvents.push({
  b: 165,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,

    repeat: 15
  }
}); 

customEvents.push({
  b: 181,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: smallVib,
    
    repeat: 7
  }
});

customEvents.push({
  b: 189,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: [
      [0, 0, 0, 0],  
      [1, -0.4, 0, 0.05],  
      [-0.8, 0.2, 0, 0.1],  
      [0.6, -0.5, 0, 0.15],  
      [-1, 0.4, 0, 0.2],  
      [0.4, -0.3, 0, 0.25],  
      [-0.6, 0.5, 0, 0.3],  
      [0.8, -0.2, 0, 0.35],  
      [-1, 0.4, 0, 0.4],  
      [0.6, -0.5, 0, 0.45],  
      [-0.4, 0.2, 0, 0.5],  
      [1, -0.4, 0, 0.55],  
      [-0.8, 0.3, 0, 0.6],  
      [0.6, -0.5, 0, 0.65],  
      [-1, 0.4, 0, 0.7],  
      [0.4, -0.3, 0, 0.75],  
      [-0.6, 0.5, 0, 0.8],  
      [0.8, -0.2, 0, 0.85],  
      [-1, 0.4, 0, 0.9],  
      [0, 0, 0, 1]      
    ],

    repeat: 3
  }
}); 



//#region  197-213


//#region move playerSpace

customEvents.push({
  b: 197,
  t: "AnimateTrack",
  d: {
    track: "playerSpace",
    duration: 16,
    position: [[0,0,0,0],[0,0,-100,0.5,"easeOutSine"], [0,0,0,1,"easeOutSine"]],
  }
}); 


//#region zoom in out pause



customEvents.push({
  b: 197,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 16,
    scale: [[1,1,1,0],[0.2,0.2,4,0.5,"easeOutSine"], [1,1,1,1,"easeOutSine"]],
  }
}); 

//#region player move with zoom

customEvents.push({
  b: 197,
  t: "AnimateTrack",
  d: {
    track: "playBloqs",
    duration: 16,
    position: [
      [0, 0, 0, 0],  
      [0, -1.25, 0, 0.5, "easeOutSine"],  
      [0, 0, 0, 1, "easeOutSine"],     
    ],
  }
}); 







//#region vibrate


customEvents.push({
  b: 197,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib8B,   
  }
});

customEvents.push({
  b: 198,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib7B,   
  }
}); 

customEvents.push({
  b: 199,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib6B,   
  }
}); 

customEvents.push({
  b: 200,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5B,   
  }
}); 

customEvents.push({
  b: 201,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4B,   
  }
}); 

customEvents.push({
  b: 202,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3B,   
  }
});

customEvents.push({
  b: 203,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2B,   
  }
});

customEvents.push({
  b: 204,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1B,   
  }
});

customEvents.push({
  b: 205,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib, 
    repeat: 3
  }
}); 

customEvents.push({
  b: 209,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: smallVib,
    repeat: 1
  }
}); 

customEvents.push({
  b: 211,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: fuckingHugeVib,
    repeat: 1
  }
}); 

//#region dropPt1 213-240.9








//#region zoom out

customEvents.push({
  b: 213,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 2,
    scale: [[1,1,1,0],[0.7,0.7,1,0.8,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 241,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 4,
    scale: [[1,1,1,0], [0.7,0.7,2,0.75, "easeInSine"], [1,1,1,1,"easeInSine"]],
  }
}); 

//#region player move with zoom

customEvents.push({
  b: 241,
  t: "AnimateTrack",
  d: {
    track: "playBloqs",
    duration: 4,
    position: [
      [0, 0, 0, 0],  
      [0, -0.8, 0, 0.75, "easeInSine"],  
      [0, 0, 0, 1, "easeInSine"],     
    ],
  }
}); 

//#region zoom in 2 kicks

customEvents.push({
  b: 215,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 2,
    scale: [[1,1,1,0],[1.4,1.4,1,0.125,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
    repeat: 13
  }
}); 

customEvents.push({
  b: 229,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 2,
    scale: [[1,1,1,0],[1.4,1.4,1,0.125,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
    repeat: 11
  }
}); 





//#region zoom 4 kicks
customEvents.push({
  b: 227.5,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 0.25,
    scale: smallKick,
    repeat: 5
  }
});


//#region vibrate (multiple vibrations)
customEvents.push({
  b: 213,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,

    repeat: 1
  }
}); 

customEvents.push({
  b: 215,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: fuckingHugeVib,
    repeat: 5
  }
}); 

customEvents.push({
  b: 221,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: smallVib,
    
    repeat: 1
  }
});

customEvents.push({
  b: 223,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: fuckingHugeVib,
    repeat: 3
  }
}); 

customEvents.push({
  b: 227,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: smallVib,
    
    repeat: 3
  }
});

customEvents.push({
  b: 231,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: fuckingHugeVib,
    repeat: 5
  }
}); 

customEvents.push({
  b: 237,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,

    repeat: 1
  }
}); 

customEvents.push({
  b: 239,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: fuckingHugeVib,
    repeat: 1
  }
}); 

//Vibrate zoom out

customEvents.push({
  b: 273,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: zoomOutVib3,   
  }
}); 

customEvents.push({
  b: 274,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: zoomOutVib2,   
  }
}); 

customEvents.push({
  b: 275,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: zoomOutVib1,   
  }
}); 



//#region dropPt2 241-276.9









//#region zoom out


customEvents.push({
  b: 213+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 2,
    scale: [[1,1,1,0],[0.7,0.7,1,0.8,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
  }
}); 

customEvents.push({
  b: 241+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 4,
    scale: [[1,1,1,0], [0.4,0.4,1,0.75, "easeInSine"], [1,1,1,1,"easeInSine"]],
  }
}); 

//#region player move with zoom

customEvents.push({
  b: 241+32,
  t: "AnimateTrack",
  d: {
    track: "playBloqs",
    duration: 4,
    position: [
      [0, 0, 0, 0],  
      [0, -0.8, 0, 0.75, "easeInSine"],  
      [0, 0, 0, 1, "easeInSine"],     
    ],
  }
}); 

//#region zoom in 2 kicks

customEvents.push({
  b: 215+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 2,
    scale: [[1,1,1,0],[1.4,1.4,1,0.125,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
    repeat: 13
  }
}); 

customEvents.push({
  b: 229+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 2,
    scale: [[1,1,1,0],[1.4,1.4,1,0.125,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
    repeat: 11
  }
}); 

//#region zoom 4 kicks
customEvents.push({
  b: 227.5+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 0.25,
    scale: smallKick,
    repeat: 5
  }
});


//#region vibrate (multiple vibrations)
customEvents.push({
  b: 213+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,

    repeat: 1
  }
}); 

customEvents.push({
  b: 215+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: fuckingHugeVib,
    repeat: 5
  }
}); 

customEvents.push({
  b: 221+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: smallVib,
    
    repeat: 1
  }
});

customEvents.push({
  b: 223+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: fuckingHugeVib,
    repeat: 3
  }
}); 

customEvents.push({
  b: 227+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: smallVib,
    
    repeat: 3
  }
});

customEvents.push({
  b: 231+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: fuckingHugeVib,
    repeat: 5
  }
}); 

customEvents.push({
  b: 237+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,

    repeat: 1
  }
}); 

customEvents.push({
  b: 239+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: fuckingHugeVib,
    repeat: 1
  }
}); 

//Vibrate zoom out

customEvents.push({
  b: 241,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: zoomOutVib3,   
  }
}); 

customEvents.push({
  b: 242,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: zoomOutVib2,   
  }
}); 

customEvents.push({
  b: 243,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: zoomOutVib1,   
  }
}); 


//#region zoom out
customEvents.push({
  b: 277,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 8,
    scale: [[1,1,1,0],[0.7,0.7,1,1,"easeOutSine"]],  }
}); 

customEvents.push({
  b: 277+16,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 8,
    scale: [[1,1,1,0],[0.6,0.6,1,1,"easeOutSine"]],  }
}); 

customEvents.push({
  b: 277+32,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 8,
    scale: [[1,1,1,0],[0.5,0.5,1,1,"easeOutSine"]],  }
}); 

customEvents.push({
  b: 277+48,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 8,
    scale: [[0.5,0.5,1,0],[0.4,0.4,1,1,"easeOutSine"]],  }
}); 

//#region zoom in 2 kicks



customEvents.push({
  b: 285,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 2,
    scale: [[1,1,1,0],[1.4,1.4,1,0.125,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
    repeat: 4
  }
}); 

customEvents.push({
  b: 301,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 2,
    scale: [[1,1,1,0],[1.4,1.4,1,0.125,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
    repeat: 4
  }
});  

customEvents.push({
  b: 317,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 2,
    scale: [[1,1,1,0],[1.4,1.4,1,0.125,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
    repeat: 4
  }
}); 

//#region Player move above laser
customEvents.push({
  b: 325,
  t: "AnimateTrack",
  d: {
    track: "playBloqs",
    duration: 8,
    position: [
      [0, 0.5, 0, 0],  
      [0, 0.5, 0, 1,],       
    ],
  }
}); 

customEvents.push({
  b: 333,
  t: "AnimateTrack",
  d: {
    track: "playBloqs",
    duration: 4,
    position: [
      [0, 0.5, 0, 0],  
      [0, 0, 0, 1,],       
    ],
  }
}); 

//#region zoom 4 kicks
customEvents.push({
  b: 307.5,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 0.25,
    scale: smallKick,
    repeat: 5
  }
});


//#region vibrate (multiple vibrations)

customEvents.push({
  b: 277,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,
    repeat: 7
  }
}); 

customEvents.push({
  b: 293,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,
    repeat: 7
  }
}); 

customEvents.push({
  b: 309,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,
    repeat: 7
  }
}); 

customEvents.push({
  b: 325,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: tinyVib,
    repeat: 7
  }
}); 

customEvents.push({
  b: 285,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: smallVib,
    
    repeat: 1
  }
});

customEvents.push({
  b: 287,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: fuckingHugeVib,
    repeat: 3
  }
}); 

customEvents.push({
  b: 291,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: smallVib,
    
    repeat: 1
  }
});

customEvents.push({
  b: 301,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: smallVib,
    
    repeat: 1
  }
});

customEvents.push({
  b: 303,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: fuckingHugeVib,
    repeat: 3
  }
}); 

customEvents.push({
  b: 307,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: smallVib,
    
    repeat: 1
  }
});

customEvents.push({
  b: 317,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: smallVib,
    
    repeat: 1
  }
});

customEvents.push({
  b: 319,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: fuckingHugeVib,
    repeat: 3
  }
}); 

customEvents.push({
  b: 323,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: smallVib,
    
    repeat: 1
  }
});


//#region dropEnd 333-340.9
customEvents.push({
  b: 333,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 4,
    scale: [[0.35,0.35,1,0], [1,1,1,1,"easeOutSine"]],
  }
}); 



//#region Outro






//#region 2 kicks

customEvents.push({
  b: 341,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 2,
    scale: [[1,1,1,0],[1.2,1.2,1,0.125,"easeOutSine"],[1,1,1,1,"easeOutSine"]],
    repeat: 31
  }
}); 

//#region longHornVibrate

customEvents.push({
  b: 341,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib8
    }
});
customEvents.push({
  b: 342,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib7
    }
});
customEvents.push({
  b: 343,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib6
    }
});
customEvents.push({
  b: 344,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5
    }
});
customEvents.push({
  b: 345,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4
    }
});
customEvents.push({
  b: 346,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3
    }
});
customEvents.push({
  b: 347,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2
    }
});
customEvents.push({
  b: 348,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1
    }
});




customEvents.push({
  b: 37+320,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 38+320,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4,
    }
});
customEvents.push({
  b: 39+320,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5,
    }
});
customEvents.push({
  b: 40+320,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib6,
    }
});
customEvents.push({
  b: 41+320,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5,
    }
});
customEvents.push({
  b: 42+320,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 43+320,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2,
    }
});
customEvents.push({
  b: 44+320,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1,
    }
});





customEvents.push({
  b: 37+336,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3B,
    }
});
customEvents.push({
  b: 38+336,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4B,
    }
});
customEvents.push({
  b: 39+336,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5B,
    }
});
customEvents.push({
  b: 40+336,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib6B,
    }
});
customEvents.push({
  b: 41+336,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5B,
    }
});
customEvents.push({
  b: 42+336,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3B,
    }
});
customEvents.push({
  b: 43+336,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2B,
    }
});
customEvents.push({
  b: 44+336,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1B,
    }
});





customEvents.push({
  b: 37+352,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3C,
    }
});
customEvents.push({
  b: 38+352,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4C,
    }
});
customEvents.push({
  b: 39+352,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5C,
    }
});
customEvents.push({
  b: 40+352,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib6C,
    }
});
customEvents.push({
  b: 41+352,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib5C,
    }
});
customEvents.push({
  b: 42+352,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3C,
    }
});
customEvents.push({
  b: 43+352,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2C,
    }
});
customEvents.push({
  b: 44+352,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1C,
    }
});








//#region shortHornVibrate

customEvents.push({
  b: 53+296,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3,
    }
});
customEvents.push({
  b: 54+296,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4,
    }
});
customEvents.push({
  b: 55+296,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2,
    }
});
customEvents.push({
  b: 56+296,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1,
    }
});








customEvents.push({
  b: 53+312,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3A,
    }
});
customEvents.push({
  b: 54+312,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4A,
    }
});
customEvents.push({
  b: 55+312,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2A,
    }
});
customEvents.push({
  b: 56+312,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1A,
    }
});






customEvents.push({
  b: 381,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib3B,
    }
});
customEvents.push({
  b: 382,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib4B,
    }
});
customEvents.push({
  b: 383,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib2B,
    }
});
customEvents.push({
  b: 384,
  t: "AnimateTrack",
  d: {
    track: "everything",
    duration: 1,
    position: hornVib1B,
    }
});
































































//#region Environment Pieces

environment.push({
  id: "Dragons2Environment.[0]Environment",
  lookupMethod: "Exact",
  track: "everything",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[25]DustPS",
  lookupMethod: "Exact",
  track: "dust",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[16]PlayersPlace",
  lookupMethod: "Exact",
  track: "playerSpace",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[37]PlayersPlace",
  lookupMethod: "Exact",
  track: "playerSpace",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[22]Dragons2HUD",
  lookupMethod: "Exact",
  track: "hud",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[23]Spectrograms",
  lookupMethod: "Exact",
  track: "spectro",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[22]Spectrograms",
  lookupMethod: "Exact",
  track: "spectro",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[3]LightEffects",
  lookupMethod: "Exact",
  track: "lightEffects",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[31]BigRingsGroup",
  lookupMethod: "Exact",
  track: "bigRingGroup",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[31]BigRingsGroup.[1]BigTrackLaneRing",
  lookupMethod: "Exact",
  track: "bigTrackLaneRing",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[25]DustPS",
  lookupMethod: "Exact",
  track: "dust",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[24]BigSmokePS",
  lookupMethod: "Exact",
  track: "smoke",
  active: true,
});

//#region lasers
environment.push({
  id: "Dragons2Environment.[0]Environment.[36]TopLasersLeftBottom",
  lookupMethod: "Exact",
  track: "leftLasers",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[35]TopLasersLeftBottom",
  lookupMethod: "Exact",
  track: "leftLasers",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[38]TopLasersRightBottom",
  lookupMethod: "Exact",
  track: "rightLasers",
  active: true,
});


//#region spotlightGroups
environment.push({
  id: "Dragons2Environment.[0]Environment.[27]TopSpotlightsGroup",
  lookupMethod: "Exact",
  track: "topSpotlights",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[27]TopSpotlightsGroup.[0]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight1",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[27]TopSpotlightsGroup.[1]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight2",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[27]TopSpotlightsGroup.[2]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight3",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[27]TopSpotlightsGroup.[3]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight4",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[27]TopSpotlightsGroup.[4]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight5",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[27]TopSpotlightsGroup.[5]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight6",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[27]TopSpotlightsGroup.[6]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight7",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[27]TopSpotlightsGroup.[7]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight8",
  active: true,
});

//#region spotlightGroups updated
environment.push({
  id: "Dragons2Environment.[0]Environment.[26]TopSpotlightsGroup",
  lookupMethod: "Exact",
  track: "topSpotlights",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[26]TopSpotlightsGroup.[0]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight1",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[26]TopSpotlightsGroup.[1]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight2",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[26]TopSpotlightsGroup.[2]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight3",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[26]TopSpotlightsGroup.[3]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight4",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[26]TopSpotlightsGroup.[4]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight5",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[26]TopSpotlightsGroup.[5]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight6",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[26]TopSpotlightsGroup.[6]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight7",
  active: true,
});

environment.push({
  id: "Dragons2Environment.[0]Environment.[26]TopSpotlightsGroup.[7]LaserProjector",
  lookupMethod: "Exact",
  track: "topSpotlight8",
  active: true,
});





//#region Nuh uh







  //slider.customData.noteJumpStartBeatOffset = 69;
  //slider.customData.noteJumpMovementSpeed = 420;
  //slider.customData.flip = [x, y];
  //slider.customData.spawnEffect = false;
  //slider.customData.disableNoteGravity = true;
  //slider.customData.disableNoteLook = true;
  //slider.customData.uninteractable = true;
  //slider.customData.coordinates = [x, y];
  //slider.customData.worldRotation = [x, y, z];
  //slider.customData.localRotation = [x, y, z];
  //slider.customData.color = [r, g, b, a];
  //slider.customData.animation = {}
  //slider.customData.animation.dissolveArrow = [[1,0], [0,0.5]]; 

//environment.push({
//  id: "\\]CoreLighting\\.\\[5\\]DirectionalLight$",
//  lookupMethod: "Regex",
//  track: "MainDirLight",
//},{
//  id: "\\]CoreLighting\\.\\[4\\]DirectionalLight$",
//  lookupMethod: "Regex",
//  track: "RingsDirLight",
//},{
//  id: "\\]CoreLighting\\.\\[3\\]DirectionalLight$",
//  lookupMethod: "Regex",
//  track: "BackDirLight",
//},{
//  id: "\\]LightWrapper0\\.\\[0\\]DirectionalLight$",
//  lookupMethod: "Regex",
//  track: "RightDirLight",
//},{
//  id: "\\]LightWrapper1\\.\\[0\\]DirectionalLight$",
//  lookupMethod: "Regex",
//  track: "LeftDirLight",
//});
//
//
//customEvents.push({
//  b: 397,
//  t: "AnimateTrack",
//  d: {
//    track: ["MainDirLight", "BackDirLight", "RingsDirLight"],
//    duration: 1,
//    rotation: [[0, 0, 0, 0,"splineCatmul"], [0, 90, 0, 0.25,"splineCatmul"], [0, 180, 0, 0.5,"splineCatmul"], [0, 270, 0, 0.75,"splineCatmul"], [0, 0, 0, 1,"splineCatmul"]],
//    repeat: (494 - 397)/1,
//  }
//});


//arcSplode(397,32,250)
//arcSplode2(429,32,200)
//arcSplode(463,32,350)

//#endregion



//#endregion

//#region write file
const precision = 4; //decimals to round to  --- use this for better wall precision or to try and decrease JSON file size
const jsonP = Math.pow(10, precision);
const sortP = Math.pow(10, 2);

function deeperDaddy(obj) {
  if (obj)
    for (const key in obj) {
      if (obj[key] == null) {
        delete obj[key];
      } else if (typeof obj[key] === "object" || Array.isArray(obj[key])) {
        deeperDaddy(obj[key]);
      } else if (typeof obj[key] == "number") {
        obj[key] = parseFloat(
          Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP
        );
      }
    }
}
deeperDaddy(difficulty);

difficulty.colorNotes.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);
difficulty.customData.fakeColorNotes.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);

difficulty.bombNotes.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);
difficulty.customData.fakeBombNotes.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);

difficulty.sliders.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);

difficulty.burstSliders.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);
difficulty.customData.fakeBurstSliders.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);

difficulty.obstacles.sort((a, b) => a.b- b.b);
difficulty.basicBeatmapEvents.sort((a, b) => a.b - b.b);

fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));

//#endregion

const diffPaths = [OUTPUT];

var L = JSON.parse(fs.readFileSync(lightsPath));

//let eventType = L._events;
//if (!convertV2toV3) {
//  eventType = L.basicBeatmapEvents;
//}


// Note: This is a VERY rough translation from V2 to V3 and did require some manual editing of the difficulty file afterwards.
// If you are looking to do this I highly recommend using Aero's official "HeckedV2toV3 converter, then importing the file from that over"
// https://github.com/Aeroluna/HeckedV2ToV3/releases