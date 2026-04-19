import * as rm from "https://deno.land/x/remapper@4.1.0/src/mod.ts"
import * as bundleInfo from './bundleinfo.json' with { type: 'json' }
import { CHAR_0 } from "https://deno.land/std@0.187.0/path/_constants.ts";

const pipeline = await rm.createPipeline({ bundleInfo })

const bundle = rm.loadBundle(bundleInfo)
const materials = bundle.materials
const prefabs = bundle.prefabs

// ----------- { SCRIPT } -----------

async function doMap(file: rm.DIFFICULTY_NAME) {
    const map = await rm.readDifficultyV3(pipeline, file)
    
//rm.settings.forceNoteJumpMovementSpeed = false;
//rm.settings.forceNoteJumpStartBeatOffset = false;

    map.require('Vivify')
    map.require('Noodle Extensions')


    rm.assignPlayerToTrack(map, {
        beat: 0,
        track: 'player'
    })

    rm.assignTrackParent(map, 0, ['notes'], 'player')


    //#region Functions
    function movePlayer (beatNumber: any, positionValues: any, localRotationValues: any ) {
        rm.animateTrack(map, {
        beat: beatNumber,
        track: 'player',
        animation: {
            position: positionValues,
            localRotation: localRotationValues
        }
    })}

    function explosion (beatNumber: any, positionValues: any) {
    prefabs.explosions.instantiate(map, {
     beat: beatNumber,
     position: positionValues,
     //scale: [1.5,1.5,1.5]
    })
    }

    function Clicking (beatNumber: any) {
    prefabs.clicking.instantiate(map, {
     beat: beatNumber,
    })
    }

    //blits
    function blurBlit (beatNumber: any, duration: any, intensity: any) {
        materials.blur.set(map, {
    radius: intensity
    },beatNumber,duration)}

    function kickwowBlit (beatNumber: any, duration: any, intensity: any) {
        materials.kickwow.set(map, {
    _Intensity: intensity
    },beatNumber,duration)}

    function chromAbBlit (beatNumber: any, duration: any, intensityX: any, intensityY: any) {
        materials.chromaticaberration.set(map, {
    _IntensityX: intensityX,
    _IntensityY: intensityY,
    },beatNumber,duration)}

    //disappearingNotes
    function disappearType1 (beatNumber: any, durationAmt: any, trackName: any) {
    rm.animateTrack(map, {
     beat: beatNumber,
     track: trackName,
     duration: durationAmt,
     animation: {
        dissolve: [[0,0],[0,0.999],[1,1]],
        //dissolveArrow: [[0,0],[0,0.999],[1,1]],
        }
    })}

    


    //#region Variables

    //blits
    const blurBigKickIntensity = [[0,0],[20,0.2,"easeOutSine"],[0,1,"easeOutSine"]]
    const blurKickIntensity = [[0,0],[5,0.2,"easeOutSine"],[0,1,"easeOutSine"]]
    const kickwowDropRattleIntensity = [[0,0.05],[0.5,0.2,'easeOutSine'],[0.25,0.67,'easeInSine'],[0,1,"easeOutSine"]]
    const dropChromAbIntensityX0 = [[0,0],[0.25/3,.1],[0.25/3,.9]]
    const dropChromAbIntensityY0 = [[0,0],[0.5/6,.1],[0.5/6,.9]]
    const dropChromAbIntensityX1 = [[0,0],[0.25,.1],[0.25,.9]]
    const dropChromAbIntensityY1 = [[0,0],[0.5/8,.1],[0.5/8,.9]]
    const dropChromAbIntensityX2 = [[0.25,0],[0.25/2,.9]]
    const dropChromAbIntensityY2 = [[0.5/8,0],[0.5/2,.9]]
    const dropChromAbIntensityX3 = [[0.25/2,0],[0.25,.7],[0,1,"easeOutSine"]]
    const dropChromAbIntensityY3 = [[0.5/2,0],[0.5,.7],[0,1,"easeOutSine"]]


    //Player Movement
    const resetPos = [[0,0,0,0],[0,0,0,1]]
    const resetRot = [[0,0,0,0],[0,0,0,1]]
    const bigKickPos = [[169.6589, -468.0236, 1550.215, 0],[109.6589, -468.0236, 1500.215, 1]]
    const bigKickRot = [[90, 0, 0, 0],[90, 0, -90, 1]]

    //Clap Explosion Positions
    const pos1L = [-15,5,30]
    const pos2L = [-18,2,30]
    const pos3L = [-8,10,30]
    const pos4L = [-13,-3,30]
    const pos5L = [-10,5,30]
    const pos6L = [-12,3,30]
    const pos7L = [-15,0,30]
    const pos8L = [-17,2,30]

    const pos1R = [15,5,30]
    const pos2R = [18,2,30]
    const pos3R = [8,10,30]
    const pos4R = [13,-3,30]
    const pos5R = [10,5,30]
    const pos6R = [12,3,30]
    const pos7R = [15,0,30]
    const pos8R = [17,2,30]


//#region Script Begin

//prefabs
prefabs["thewholeassscene 1"].instantiate(map)


//Clicking Instantiate

for (let i=0; i<=160; i+=160){
Clicking(296.031+i)
Clicking(296.281+i)
Clicking(296.469+i)
Clicking(296.594+i)
Clicking(296.781+i)
Clicking(296.969+i)
Clicking(297.094+i)
Clicking(297.281+i)
Clicking(297.75+i)
Clicking(298+i)
Clicking(298.25+i)
Clicking(298.531+i)
//Clicking(298.812+i)
}

for (let j=0; j<=48; j+=48){
for (let i=0; i<=16; i+=16){
Clicking(533+i+j)
Clicking(533.281+i+j)
Clicking(533.469+i+j)
Clicking(533.594+i+j)
Clicking(533.781+i+j)
//Clicking(534+i+j)
}}

for (let j=0; j<=32; j+=32){
Clicking(540.562+j)
Clicking(541.281+j)
Clicking(541.531+j)
Clicking(541.812+j)
for (let i=0; i<544-541.75; i+=0.125){
Clicking(541.875+i-0.125)
}}

for (let i=0; i<=16; i+=16){
Clicking(557+i)
Clicking(557.156+i)
Clicking(557.281+i)
Clicking(557.469+i)
Clicking(557.594+i)
//Clicking(557.781+i)
}









/*
    rm.assignObjectPrefab(map, {
        colorNotes: {
            track: "notes",
            asset: prefabs.glassnote.path,
            debrisAsset: prefabs.glassnote_debris.path,
        }
    })
*/


//blits initalize
materials.kickwow.blit(map,0, 999)
materials.blur.blit(map, 0, 999)
materials.chromaticaberration.blit(map, 0, 999)
materials.vignette.blit(map, 0, 2600)

materials.vignette.set(map, {
  _VignetteFeather: [[0.5,0],[0.5,1]],
  _VignetteOpacity: [[0.5,0],[0.5,1]],
  _VignetteRadius: [[0.5,0],[0.5,1]],
}, 0, 8)

materials.kickwow.set(map, {
    _Intensity: [[0,0],[0,1]]
},0,1)
materials.blur.set(map, {
    radius: [[0,0],[0,1]]
},0,1)

kickwowBlit(85, 2, kickwowDropRattleIntensity)

chromAbBlit(168, 2, [[0,0],[0.2,0.1,"easeOutSine"],[0,1,"easeOutSine"]], [[0,0],[0.2,0.1,"easeOutSine"],[0,1,"easeOutSine"]])


//Environment


rm.environmentRemoval(map, [
    'Environment',
    'GameCore'
])


//#region notes
disappearType1(0, 40, 'Disappear1')
disappearType1(40, 72-40, 'Disappear2')
disappearType1(72, 104-72, 'Disappear1')

rm.animateTrack(map, {
beat: 85,
track: 'GetLaunchedIdiot',
duration: 4,
animation: {
    offsetPosition: [[0,0,0,0],[-6/5,50/4,20,1,"easeOutElastic"]],
    localRotation: [[69,69,-40,0],[0,0,0,1,"easeOutElastic"]],
    scale: [[1,1,1,0,"easeOutBounce"],[6.9*3,6.9*3,6.9*3,0.15],[1,1,1,0.25,"easeOutBounce"]],
    dissolve: [[1,0],[0,0.125]],
    dissolveArrow: [[1,0],[0,0.125]],
}})

rm.animateTrack(map, {
beat: 85,
track: 'notes',
duration: 2,
animation: {
    scale: [[1,1,1,0,"easeOutBounce"],[6.9,6.9,6.9,0.15],[1,1,1,0.25,"easeOutBounce"]],
    dissolve: [[1,0],[0,0.8,"easeOutCubic"],[1,1]],
    dissolveArrow: [[1,0],[0,0.8,"easeOutCubic"],[1,1]]
}})

rm.animateTrack(map, {
beat: 168,
track: 'Disappear2',
duration: 1,
animation: {
    dissolve: [[1,0],[0,0.1,"easeOutSine"],[1,1,"easeOutSine"]],
    dissolveArrow: [[1,0],[0,0.1,"easeOutSine"],[1,1,"easeOutSine"]],
}})

disappearType1(174, 2, 'Disappear1')
for (let i=0; i<=160; i+=160){
disappearType1(182+i, 2, 'Disappear1')
disappearType1(198+i, 2, 'Disappear1')
disappearType1(214+i, 2, 'Disappear1')
disappearType1(230+i, 2, 'Disappear1')
disappearType1(230+16+i, 2, 'Disappear1')
disappearType1(230+32+i, 2, 'Disappear1')
disappearType1(230+48+i, 2, 'Disappear1')
disappearType1(230+48+8+i, 2, 'Disappear1')
disappearType1(270+i, 2, 'Disappear1')
}

disappearType1(486, 2, 'Disappear1')
disappearType1(518, 2, 'Disappear1')
disappearType1(518+8, 2, 'Disappear1')
disappearType1(518+16, 2, 'Disappear1')
disappearType1(518+24, 2, 'Disappear1')
disappearType1(518+32, 2, 'Disappear1')
disappearType1(558, 2, 'Disappear1')
disappearType1(558+8, 2, 'Disappear1')
disappearType1(558+16, 2, 'Disappear1')
disappearType1(558+24, 2, 'Disappear1')
disappearType1(558+32, 2, 'Disappear1')


//All Notes Animation
rm.noteIterator()
    .betweenTime(105, 231.9)//168
    .betweenXPositions(0, 2)
    .betweenYPositions(0, 3)
    .addTrack('leftNotes')
    .run(map)

rm.noteIterator()
    .betweenTime(105, 231.9)
    .betweenXPositions(2, 4)
    .betweenYPositions(0, 3)
    .addTrack('rightNotes')
    .run(map)

rm.noteIterator()
    .betweenTime(299, 391.9)//299 349
    .betweenXPositions(0, 2)
    .betweenYPositions(0, 3)
    .addTrack('leftNotes')
    .run(map)

rm.noteIterator()
    .betweenTime(299, 391.9)
    .betweenXPositions(2, 4)
    .betweenYPositions(0, 3)
    .addTrack('rightNotes')
    .run(map)
/*
    rm.noteIterator()
    .betweenTime(352.1, 455)
    .betweenXPositions(0, 2)
    .betweenYPositions(0, 3)
    .addTrack('leftNotes')
    .run(map)

rm.noteIterator()
    .betweenTime(352.1, 455)
    .betweenXPositions(2, 4)
    .betweenYPositions(0, 3)
    .addTrack('rightNotes')
    .run(map)
*/

 map.allNotes.forEach((x) => {
        if (
            x.beat >= 130 && x.beat <= 159.9
        ) {
            x.noteJumpStartBeatOffset = -0.5
        }
        if (
            x.beat >= 160 && x.beat <= 162
        ) {
            x.noteJumpStartBeatOffset = -0.5
        }
        if (
            x.beat >= 163 && x.beat <= 191.9
        ) {
            x.noteJumpStartBeatOffset = -0.5
        }
        if (
            x.beat >= 192 && x.beat <= 193.9
        ) {
            x.noteJumpStartBeatOffset = -0.5
        }
        if (
            x.beat >= 194 && x.beat <= 231.9
        ) {
            x.noteJumpStartBeatOffset = -0.5
        }
        if (
            x.beat >= 320 && x.beat <= 321.9
        ) {
            x.noteJumpStartBeatOffset = -0.5
        }
        if (
            x.beat >= 322 && x.beat <= 349
        ) {
            x.noteJumpStartBeatOffset = -0.5
        }
        if (
            x.beat == 336
        ) {
            x.noteJumpStartBeatOffset = 2
        }
        if (
            x.beat >= 350 && x.beat <= 352
        ) {
            x.noteJumpStartBeatOffset = -0.5
        }
        if (
            x.beat >= 352.1 && x.beat <= 391.9
        ) {
            x.noteJumpStartBeatOffset = -0.5
        }
        if (
            x.beat >= 310 && x.beat <= 319
        ) {
            x.noteJumpStartBeatOffset = -0.5
        }

      
      })

rm.animateTrack(map, {
beat: 333,
track: 'rightNotesAlt',
duration: 3.5,
animation: {
    offsetPosition: [[4,2,0,0.7],[0,0,0,1,"easeOutBounce"]],
    scale: [[1,1,1,0,"easeOutBounce"],[6.9,6.9,6.9,0.15],[1,1,1,0.5,"easeOutBounce"]],
    dissolve: [[0,0],[0,0.75],[1,1]],
    dissolveArrow: [[0,0],[0,0.5],[1,1]]
}})

rm.animateTrack(map, {
beat: 333,
track: 'leftNotesAlt',
duration: 3.5,
animation: {
    offsetPosition: [[-4,2,0,0.7],[0,0,0,1,"easeOutBounce"]],
    scale: [[1,1,1,0,"easeOutBounce"],[6.9,6.9,6.9,0.15],[1,1,1,0.5,"easeOutBounce"]],
    dissolve: [[0,0],[0,0.75],[1,1]],
    dissolveArrow: [[0,0],[0,0.5],[1,1]]
}})

new rm.AssignPathAnimation(map, {
  beat: 105,
  track: 'leftNotes',
  duration: 2,
  animation: {
    /*
    offsetPosition: [
        [
          -1,
          0.5,
          0,
          0
        ],
        [
          0,
          0,
          0,
          0.20,
          "easeOutExpo"
        ]
      ],
      */
      dissolve : [
        [
          0.25,
          0
        ],
        [
          1,
          0.2,
          "easeOutCirc"
        ]
      ],
      dissolveArrow : [
        [
          0,
          0
        ],
        [
          1,
          0.1,
          "easeOutCubic"
        ]
      ],
      "Scale" : [
        [
          0.01,
          0.01,
          1,
          0
        ],
        [
          1,
          1,
          1,
          0.25,
          "easeOutCubic"
        ]
      ]
    }
  }
)


new rm.AssignPathAnimation(map, {
  beat: 105,
  track: 'rightNotes',
  duration: 2,
  animation: {
    /*
    offsetPosition: [
        [
          1,
          0.5,
          0,
          0
        ],
        [
          0,
          0,
          0,
          0.20,
          "easeOutExpo"
        ]
      ],
      */
      dissolve : [
        [
          0.25,
          0
        ],
        [
          1,
          0.2,
          "easeOutCirc"
        ]
      ],
      dissolveArrow : [
        [
          0,
          0
        ],
        [
          1,
          0.1,
          "easeOutCubic"
        ]
      ],
      "Scale" : [
        [
          0.01,
          0.01,
          1,
          0
        ],
        [
          1,
          1,
          1,
          0.25,
          "easeOutCubic"
        ]
      ]
    }
  }
)



/*
rm.animateTrack(map, {
beat: 86,
track: 'notes',
duration: 4,
animation: {
    offsetPosition: [[0,0,0,0],[0,0,0,1,"easeOutElastic"]],
    localRotation: [[0,0,0,0],[0,0,0,1,"easeOutElastic"]],
    scale: [[1,1,1,0,"easeOutBounce"],[1,1,1,0.25,"easeOutBounce"]],
    dissolve: [[1,0],[1,0.125]],
    dissolveArrow: [[1,0],[1,0.125]],
}})
*/

rm.animateTrack(map, {
beat: 587.65,
track: 'notes',
animation: {
    offsetPosition: [[0,0,-999,0],[0,0,-999,1]]
}})

//arcs

rm.animateTrack(map, {
beat: 499,
track: 'arcs',
duration: 2,
animation: {
    dissolve: [[1,0],[0.1,0.125],[1,0.125*2],[0.1,0.125*3],[1,0.125*4],[0.1,0.125*5],[0,0.125*6]],
}})





















/*

 function softRemove(lookup: rm.LOOKUP, id: Array<string>){
    id.forEach((env) =>{
        const sR = new rm.Environment(env, lookup);
        sR.position = [-69420,-69420,-69420];
        sR.push();
    })
};

 function hardRemove(lookup: rm.LOOKUP, id: Array<string>){
    id.forEach((env) =>{
        const hR = new rm.Environment(env, lookup);
        hR.active = false;
        hR.push();
    })
};

 function animateTrack(time: number, duration: number, track: rm.TrackValue, anim: (x: rm.AnimationInternals.AbstractAnimation) => void) {
    const event = new rm.CustomEvent(time).animateTrack(track, duration);
    anim(event.animate);
    event.push(false);
};





const waterfall = new rm.Environment("Waterfall$", "Regex");
waterfall.track.value = "WaterTrack";
waterfall.push();



new rm.Environment
*/

/*
  rm.environment(map, {
    id: "BillieEnvironment.[0]Environment.[13]PlayersPlace.[0]Mirror",
    lookupMethod: "Exact",
    track: "Mirror",
    active: true,
    scale: [1000,1000,1000],
    position: [0,0,0]
  });
*/









}

await Promise.all([
    doMap('ExpertStandard'),
    doMap('ExpertPlusLawless'),
])

// ----------- { OUTPUT } -----------

pipeline.export({
    outputDirectory: '../OutputMaps/Numb & Getting Colder'
})
