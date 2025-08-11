import * as rm from "https://deno.land/x/remapper@4.1.0/src/mod.ts"
import * as bundleInfo from './bundleinfo.json' with { type: 'json' }

const pipeline = await rm.createPipeline({ bundleInfo })

const bundle = rm.loadBundle(bundleInfo)
const materials = bundle.materials
const prefabs = bundle.prefabs

// ----------- { SCRIPT } -----------

async function doMap(file: rm.DIFFICULTY_NAME) {
    const map = await rm.readDifficultyV3(pipeline, file)
    map.require('Vivify')

/*
prefabs.sds.instantiate(map, 0)
prefabs.aaaaaaaa.instantiate(map, 0)
prefabs.pyro1.instantiate(map, 0)


prefabs.bung.instantiate(map, 0)
prefabs["bung 1"].instantiate(map, 0)
prefabs.artic.instantiate(map, 0)
prefabs.firess.instantiate(map, 0)
*/



    "_assetBundle"; {
      "_windows2019"; 879320801,
      "_windows2021"; 4182977615,
      "_android2021"; 1227571881
      }



rm.settings.forceNoteJumpMovementSpeed = false;
rm.settings.forceNoteJumpStartBeatOffset = false;

    function scaleArrayWithInterpolation(
        arr: number[][],
        baseFactor: number,
        startFactor: number,
        endFactor: number,
        x: number = 0,
        y: number = 0,
        z: number = 0
      ): number[][] {
        const numRows = arr.length;
      
        return arr.map((row, index) => {
          const interpolationFactor =
            startFactor + (endFactor - startFactor) * (index / (numRows - 1));
      
          return row.map((value, colIndex) => {
            if (colIndex === 0) {
              return value * baseFactor * interpolationFactor + x;
            }
            if (colIndex === 1) {
              return value * baseFactor * interpolationFactor + y;
            }
            if (colIndex === 2) {
              return value + z;
            }
            return value;
          });
        });
      }
      const dataArray: number[][] = [
        [0, 0, 0, 0],
        [-1, -0.2 * 2, 0, 0.05],
        [0.8, 0.1 * 2, 0, 0.1],
        [0.6, -0.25 * 2, 0, 0.15],
        [-1, 0.2 * 2, 0, 0.2],
        [0.4, -0.15 * 2, 0, 0.25],
        [0.6, 0.25 * 2, 0, 0.3],
        [0.8, -0.1 * 2, 0, 0.35],
        [-1, 0.2 * 2, 0, 0.4],
        [-0.6, -0.25 * 2, 0, 0.45],
        [-0.4, 0.1 * 2, 0, 0.5],
        [1, 0.2, 0, 0.55],
        [0.8, 0.15 * 2, 0, 0.6],
        [0.6, -0.25 * 2, 0, 0.65],
        [-1, 0.2 * 2, 0, 0.7],
        [-0.4, -0.15 * 2, 0, 0.75],
        [-0.6, 0.25 * 2, 0, 0.8],
        [0.8, -0.3 * 2, 0, 0.85],
        [1, 0.2 * 2, 0, 0.9],
        [0, 0, 0, 1],
      ];
      
//#region Ex+
const pyro1fuckingHugeVib = scaleArrayWithInterpolation(dataArray, 0.6, 1, 1, -10, -4, 35);
const pyro1smallVib       = scaleArrayWithInterpolation(dataArray, 0.4, 1, 1, -10, -4, 35);
const pyro2fuckingHugeVib = scaleArrayWithInterpolation(dataArray, 0.6, 1, 1, -7.5, -4, 35);
const pyro2smallVib       = scaleArrayWithInterpolation(dataArray, 0.4, 1, 1, -7.5, -4, 35);
const pyro3fuckingHugeVib = scaleArrayWithInterpolation(dataArray, 0.6, 1, 1, -5, -4, 35);
const pyro3smallVib       = scaleArrayWithInterpolation(dataArray, 0.4, 1, 1, -5, -4, 35);
const pyro4fuckingHugeVib = scaleArrayWithInterpolation(dataArray, 0.6, 1, 1, 5, -4, 35);
const pyro4smallVib       = scaleArrayWithInterpolation(dataArray, 0.4, 1, 1, 5, -4, 35);
const pyro5fuckingHugeVib = scaleArrayWithInterpolation(dataArray, 0.6, 1, 1, 7.5, -4, 35);
const pyro5smallVib       = scaleArrayWithInterpolation(dataArray, 0.4, 1, 1, 7.5, -4, 35);
const pyro6fuckingHugeVib = scaleArrayWithInterpolation(dataArray, 0.6, 1, 1, 10, -4, 35);
const pyro6smallVib       = scaleArrayWithInterpolation(dataArray, 0.4, 1, 1, 10, -4, 35);

  


//#region ChromaticAbb

materials.chromaticaberrationmat.blit(map, 277, 285+48)
materials.chromaticaberrationmat.set(map,{
    _IntensityY: [
        [0.5*0.25,0],
        [0.5*0.25,1]
    ]
}, 277, 8)
materials.chromaticaberrationmat.set(map,{
    _IntensityY: [
        [0,0],
        [0,1]
    ]
}, 285, 1)

materials.chromaticaberrationmat.set(map,{
    _IntensityY: [
        [0.5*0.25,0],
        [0.5*0.25,1]
    ]
}, 277+16, 8)
materials.chromaticaberrationmat.set(map,{
    _IntensityY: [
        [0,0],
        [0,1]
    ]
}, 285+16, 1)

materials.chromaticaberrationmat.set(map,{
    _IntensityY: [
        [0.75*0.25,0],
        [0.75*0.25,1]
    ]
}, 277+32, 8)
materials.chromaticaberrationmat.set(map,{
    _IntensityY: [
        [0,0],
        [0,1]
    ]
}, 285+32, 1)

materials.chromaticaberrationmat.set(map,{
    _IntensityY: [
        [1*0.25,0],
        [1*0.25,1]
    ]
}, 277+48, 8)
materials.chromaticaberrationmat.set(map,{
    _IntensityY: [
        [0,0],
        [0,1]
    ]
}, 285+48, 1)











    //#region Pyro


    //#region pyro color change
        materials.bluepyromat.set(map,{
            '_InColor' : [1, 0.4315633, 0.1718138, 0],
            '_OutColor' : [0.8773585, 0.3020317, 0.1448469, 0]
        }, 215, 32)
    
        materials.bluepyromat.set(map,{
            '_InColor' : [0.2078431, 0.6274511, 0.8313726, 0],
            '_OutColor' : [0.1254902, 0.5254902, 0.7647059, 0]
        }, 247, 32)
    
        materials.bluepyromat.set(map,{
            '_InColor' : [1, 0.4315633, 0.1718138, 0],
            '_OutColor' : [0.8773585, 0.3020317, 0.1448469, 0]
        }, 277, 16)

        materials.bluepyromat.set(map,{
            '_InColor' : [0.2078431, 0.6274511, 0.8313726, 0],
            '_OutColor' : [0.1254902, 0.5254902, 0.7647059, 0]
        }, 301, 16)

        materials.bluepyromat.set(map,{
            '_InColor' : [1, 0.4315633, 0.1718138, 0],
            '_OutColor' : [0.8773585, 0.3020317, 0.1448469, 0]
        }, 317, 16)


    //#region drop pt1    
        for (let i = 215; i < 220; i=i+2) {       
            const pyro1 = prefabs.pyro1.instantiate(map,i)
            rm.animateTrack(map, {
                beat: 215,
                track: pyro1.id,    
                duration: 1,
                animation: {
                    position: pyro1fuckingHugeVib
                },
                repeat: 5
  })
            const pyro2 = prefabs.pyro2.instantiate(map,i)
            rm.animateTrack(map, {
                beat: 215,
                track: pyro2.id,    
                duration: 1,
                animation: {
                    position: pyro2fuckingHugeVib
                },
                repeat: 5
  })
            const pyro3 = prefabs.pyro3.instantiate(map,i)
            rm.animateTrack(map, {
                beat: 215,
                track: pyro3.id,    
                duration: 1,
                animation: {
                    position: pyro3fuckingHugeVib
                },
                repeat: 5
  })
            const pyro4 = prefabs.pyro4.instantiate(map,i)
            rm.animateTrack(map, {
                beat: 215,
                track: pyro4.id,    
                duration: 1,
                animation: {
                    position: pyro4fuckingHugeVib
                },
                repeat: 5
  })
            const pyro5 = prefabs.pyro5.instantiate(map,i)
            rm.animateTrack(map, {
                beat: 215,
                track: pyro5.id,    
                duration: 1,
                animation: {
                    position: pyro5fuckingHugeVib
                },
                repeat: 5
  })
            const pyro6 = prefabs.pyro6.instantiate(map,i)
            rm.animateTrack(map, {
                beat: 215,
                track: pyro6.id,    
                duration: 1,
                animation: {
                    position: pyro6fuckingHugeVib
                },
                repeat: 5
  })
            //scaling
        rm.animateTrack(map, {
            beat: 215,
            track: [pyro1.id,pyro2.id,pyro3.id,pyro4.id,pyro5.id,pyro6.id],
            duration: 2,
            animation: {
                scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
            },
            repeat: 5
      })
        }

        const pyro1A = prefabs.pyro3.instantiate(map,221)
        const pyro2A = prefabs.pyro4.instantiate(map,221)
        const pyro3A = prefabs.pyro2.instantiate(map,221.66)
        const pyro4A = prefabs.pyro5.instantiate(map,221.66)
        const pyro5A = prefabs.pyro1.instantiate(map,222.33)
        const pyro6A = prefabs.pyro6.instantiate(map,222.33)
        rm.animateTrack(map, {
            beat: 221,
            track: [pyro1A.id,pyro2A.id,pyro3A.id,pyro4A.id,pyro5A.id,pyro6A.id],
            duration: 2,
            animation: {
                scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
            },
            repeat: 1
      })


    
    for (let i = 223; i < 226; i=i+2) {       
        const pyro1 = prefabs.pyro1.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 223,
            track: pyro1.id,    
            duration: 1,
            animation: {
                position: pyro1fuckingHugeVib
            },
            repeat: 5
})
        const pyro2 = prefabs.pyro2.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 223,
            track: pyro2.id,    
            duration: 1,
            animation: {
                position: pyro2fuckingHugeVib
            },
            repeat: 5
})
        const pyro3 = prefabs.pyro3.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 223,
            track: pyro3.id,    
            duration: 1,
            animation: {
                position: pyro3fuckingHugeVib
            },
            repeat: 5
})
        const pyro4 = prefabs.pyro4.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 223,
            track: pyro4.id,    
            duration: 1,
            animation: {
                position: pyro4fuckingHugeVib
            },
            repeat: 5
})
        const pyro5 = prefabs.pyro5.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 223,
            track: pyro5.id,    
            duration: 1,
            animation: {
                position: pyro5fuckingHugeVib
            },
            repeat: 5
})
        const pyro6 = prefabs.pyro6.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 223,
            track: pyro6.id,    
            duration: 1,
            animation: {
                position: pyro6fuckingHugeVib
            },
            repeat: 5
})
        //scaling
    rm.animateTrack(map, {
        beat: 223,
        track: [pyro1.id,pyro2.id,pyro3.id,pyro4.id,pyro5.id,pyro6.id],
        duration: 2,
        animation: {
            scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
        },
        repeat: 5
  })
    }

    
    
    for (let i = 231; i < 236; i=i+2) {       
        const pyro1 = prefabs.pyro1.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 231,
            track: pyro1.id,    
            duration: 1,
            animation: {
                position: pyro1fuckingHugeVib
            },
            repeat: 5
})
        const pyro2 = prefabs.pyro2.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 231,
            track: pyro2.id,    
            duration: 1,
            animation: {
                position: pyro2fuckingHugeVib
            },
            repeat: 5
})
        const pyro3 = prefabs.pyro3.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 231,
            track: pyro3.id,    
            duration: 1,
            animation: {
                position: pyro3fuckingHugeVib
            },
            repeat: 5
})
        const pyro4 = prefabs.pyro4.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 231,
            track: pyro4.id,    
            duration: 1,
            animation: {
                position: pyro4fuckingHugeVib
            },
            repeat: 5
})
        const pyro5 = prefabs.pyro5.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 231,
            track: pyro5.id,    
            duration: 1,
            animation: {
                position: pyro5fuckingHugeVib
            },
            repeat: 5
})
        const pyro6 = prefabs.pyro6.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 231,
            track: pyro6.id,    
            duration: 1,
            animation: {
                position: pyro6fuckingHugeVib
            },
            repeat: 5
})
        //scaling
    rm.animateTrack(map, {
        beat: 231,
        track: [pyro1.id,pyro2.id,pyro3.id,pyro4.id,pyro5.id,pyro6.id],
        duration: 2,
        animation: {
            scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
        },
        repeat: 5
  })
    }
    

        const pyro1B = prefabs.pyro3.instantiate(map,237)
        const pyro2B = prefabs.pyro4.instantiate(map,237)
        const pyro3B = prefabs.pyro2.instantiate(map,237.66)
        const pyro4B = prefabs.pyro5.instantiate(map,237.66)
        const pyro5B = prefabs.pyro1.instantiate(map,238.33)
        const pyro6B = prefabs.pyro6.instantiate(map,238.33)
        rm.animateTrack(map, {
            beat: 235,
            track: [pyro1B.id,pyro2B.id,pyro3B.id,pyro4B.id,pyro5B.id,pyro6B.id],
            duration: 2,
            animation: {
                scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
            },
            repeat: 1
      })
    
      for (let i = 239; i < 240; i=i+2) {       
        const pyro1 = prefabs.pyro1.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 239,
            track: pyro1.id,    
            duration: 1,
            animation: {
                position: pyro1fuckingHugeVib
            },
            repeat: 5
})
        const pyro2 = prefabs.pyro2.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 239,
            track: pyro2.id,    
            duration: 1,
            animation: {
                position: pyro2fuckingHugeVib
            },
            repeat: 5
})
        const pyro3 = prefabs.pyro3.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 239,
            track: pyro3.id,    
            duration: 1,
            animation: {
                position: pyro3fuckingHugeVib
            },
            repeat: 5
})
        const pyro4 = prefabs.pyro4.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 239,
            track: pyro4.id,    
            duration: 1,
            animation: {
                position: pyro4fuckingHugeVib
            },
            repeat: 5
})
        const pyro5 = prefabs.pyro5.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 239,
            track: pyro5.id,    
            duration: 1,
            animation: {
                position: pyro5fuckingHugeVib
            },
            repeat: 5
})
        const pyro6 = prefabs.pyro6.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 239,
            track: pyro6.id,    
            duration: 1,
            animation: {
                position: pyro6fuckingHugeVib
            },
            repeat: 5
})
        //scaling
    rm.animateTrack(map, {
        beat: 239,
        track: [pyro1.id,pyro2.id,pyro3.id,pyro4.id,pyro5.id,pyro6.id],
        duration: 2,
        animation: {
            scale: [[0.375,0.375,0.45,0],[0.375*3,0.375*2,0.45*3,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
        },
        repeat: 5
  })
    }
    
    
    //#region drop pt2
    for (let i = 247; i < 252; i=i+2) {       
        const pyro1 = prefabs.pyro1.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 247,
            track: pyro1.id,    
            duration: 1,
            animation: {
                position: pyro1fuckingHugeVib
            },
            repeat: 5
})
        const pyro2 = prefabs.pyro2.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 247,
            track: pyro2.id,    
            duration: 1,
            animation: {
                position: pyro2fuckingHugeVib
            },
            repeat: 5
})
        const pyro3 = prefabs.pyro3.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 247,
            track: pyro3.id,    
            duration: 1,
            animation: {
                position: pyro3fuckingHugeVib
            },
            repeat: 5
})
        const pyro4 = prefabs.pyro4.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 247,
            track: pyro4.id,    
            duration: 1,
            animation: {
                position: pyro4fuckingHugeVib
            },
            repeat: 5
})
        const pyro5 = prefabs.pyro5.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 247,
            track: pyro5.id,    
            duration: 1,
            animation: {
                position: pyro5fuckingHugeVib
            },
            repeat: 5
})
        const pyro6 = prefabs.pyro6.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 247,
            track: pyro6.id,    
            duration: 1,
            animation: {
                position: pyro6fuckingHugeVib
            },
            repeat: 5
})
        //scaling
    rm.animateTrack(map, {
        beat: 247,
        track: [pyro1.id,pyro2.id,pyro3.id,pyro4.id,pyro5.id,pyro6.id],
        duration: 2,
        animation: {
            scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
        },
        repeat: 5
  })
    }
    
    for (let i = 255; i < 259; i=i+2) {       
        const pyro1 = prefabs.pyro1.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 255,
            track: pyro1.id,    
            duration: 1,
            animation: {
                position: pyro1fuckingHugeVib
            },
            repeat: 5
})
        const pyro2 = prefabs.pyro2.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 255,
            track: pyro2.id,    
            duration: 1,
            animation: {
                position: pyro2fuckingHugeVib
            },
            repeat: 5
})
        const pyro3 = prefabs.pyro3.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 255,
            track: pyro3.id,    
            duration: 1,
            animation: {
                position: pyro3fuckingHugeVib
            },
            repeat: 5
})
        const pyro4 = prefabs.pyro4.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 255,
            track: pyro4.id,    
            duration: 1,
            animation: {
                position: pyro4fuckingHugeVib
            },
            repeat: 5
})
        const pyro5 = prefabs.pyro5.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 255,
            track: pyro5.id,    
            duration: 1,
            animation: {
                position: pyro5fuckingHugeVib
            },
            repeat: 5
})
        const pyro6 = prefabs.pyro6.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 255,
            track: pyro6.id,    
            duration: 1,
            animation: {
                position: pyro6fuckingHugeVib
            },
            repeat: 5
})
        //scaling
    rm.animateTrack(map, {
        beat: 255,
        track: [pyro1.id,pyro2.id,pyro3.id,pyro4.id,pyro5.id,pyro6.id],
        duration: 2,
        animation: {
            scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
        },
        repeat: 5
  })
    }
    
    for (let i = 263; i < 268; i=i+2) {       
        const pyro1 = prefabs.pyro1.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 263,
            track: pyro1.id,    
            duration: 1,
            animation: {
                position: pyro1fuckingHugeVib
            },
            repeat: 5
})
        const pyro2 = prefabs.pyro2.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 263,
            track: pyro2.id,    
            duration: 1,
            animation: {
                position: pyro2fuckingHugeVib
            },
            repeat: 5
})
        const pyro3 = prefabs.pyro3.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 263,
            track: pyro3.id,    
            duration: 1,
            animation: {
                position: pyro3fuckingHugeVib
            },
            repeat: 5
})
        const pyro4 = prefabs.pyro4.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 263,
            track: pyro4.id,    
            duration: 1,
            animation: {
                position: pyro4fuckingHugeVib
            },
            repeat: 5
})
        const pyro5 = prefabs.pyro5.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 263,
            track: pyro5.id,    
            duration: 1,
            animation: {
                position: pyro5fuckingHugeVib
            },
            repeat: 5
})
        const pyro6 = prefabs.pyro6.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 263,
            track: pyro6.id,    
            duration: 1,
            animation: {
                position: pyro6fuckingHugeVib
            },
            repeat: 5
})
        //scaling
    rm.animateTrack(map, {
        beat: 263,
        track: [pyro1.id,pyro2.id,pyro3.id,pyro4.id,pyro5.id,pyro6.id],
        duration: 2,
        animation: {
            scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
        },
        repeat: 5
  })
    }
    
    const pyro1C = prefabs.pyro3.instantiate(map,269)
    const pyro2C = prefabs.pyro4.instantiate(map,269)
    const pyro3C = prefabs.pyro2.instantiate(map,269.66)
    const pyro4C = prefabs.pyro5.instantiate(map,269.66)
    const pyro5C = prefabs.pyro1.instantiate(map,270.33)
    const pyro6C = prefabs.pyro6.instantiate(map,270.33)
    rm.animateTrack(map, {
        beat: 267,
        track: [pyro1C.id,pyro2C.id,pyro3C.id,pyro4C.id,pyro5C.id,pyro6C.id],
        duration: 2,
        animation: {
            scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
        },
        repeat: 1
  })
    
      for (let i = 271; i < 273; i=i+2) {       
        const pyro1 = prefabs.pyro1.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 271,
            track: pyro1.id,    
            duration: 1,
            animation: {
                position: pyro1fuckingHugeVib
            },
            repeat: 5
})
        const pyro2 = prefabs.pyro2.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 271,
            track: pyro2.id,    
            duration: 1,
            animation: {
                position: pyro2fuckingHugeVib
            },
            repeat: 5
})
        const pyro3 = prefabs.pyro3.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 271,
            track: pyro3.id,    
            duration: 1,
            animation: {
                position: pyro3fuckingHugeVib
            },
            repeat: 5
})
        const pyro4 = prefabs.pyro4.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 271,
            track: pyro4.id,    
            duration: 1,
            animation: {
                position: pyro4fuckingHugeVib
            },
            repeat: 5
})
        const pyro5 = prefabs.pyro5.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 271,
            track: pyro5.id,    
            duration: 1,
            animation: {
                position: pyro5fuckingHugeVib
            },
            repeat: 5
})
        const pyro6 = prefabs.pyro6.instantiate(map,i)
        rm.animateTrack(map, {
            beat: 271,
            track: pyro6.id,    
            duration: 1,
            animation: {
                position: pyro6fuckingHugeVib
            },
            repeat: 5
})
        //scaling
    rm.animateTrack(map, {
        beat: 271,
        track: [pyro1.id,pyro2.id,pyro3.id,pyro4.id,pyro5.id,pyro6.id],
        duration: 2,
        animation: {
            scale: [[0.375,0.375,0.45,0],[0.375*3,0.375*2,0.45*3,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
        },
        repeat: 5
  })
    }
    
    //#region drop pt3

    const pyro1E = prefabs.pyro3.instantiate(map,285)
    const pyro2E = prefabs.pyro4.instantiate(map,285)
    const pyro3E = prefabs.pyro2.instantiate(map,285.66)
    const pyro4E = prefabs.pyro5.instantiate(map,285.66)
    const pyro5E = prefabs.pyro1.instantiate(map,286.33)
    const pyro6E = prefabs.pyro6.instantiate(map,286.33)
    rm.animateTrack(map, {
        beat: 283,
        track: [pyro1E.id,pyro2E.id,pyro3E.id,pyro4E.id,pyro5E.id,pyro6E.id],
        duration: 2,
        animation: {
            scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
        },
        repeat: 1
  })

  for (let i = 287; i < 291; i=i+2) {       
    const pyro1 = prefabs.pyro1.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 287,
        track: pyro1.id,    
        duration: 1,
        animation: {
            position: pyro1fuckingHugeVib
        },
        repeat: 5
})
    const pyro2 = prefabs.pyro2.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 287,
        track: pyro2.id,    
        duration: 1,
        animation: {
            position: pyro2fuckingHugeVib
        },
        repeat: 5
})
    const pyro3 = prefabs.pyro3.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 287,
        track: pyro3.id,    
        duration: 1,
        animation: {
            position: pyro3fuckingHugeVib
        },
        repeat: 5
})
    const pyro4 = prefabs.pyro4.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 287,
        track: pyro4.id,    
        duration: 1,
        animation: {
            position: pyro4fuckingHugeVib
        },
        repeat: 5
})
    const pyro5 = prefabs.pyro5.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 287,
        track: pyro5.id,    
        duration: 1,
        animation: {
            position: pyro5fuckingHugeVib
        },
        repeat: 5
})
    const pyro6 = prefabs.pyro6.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 287,
        track: pyro6.id,    
        duration: 1,
        animation: {
            position: pyro6fuckingHugeVib
        },
        repeat: 5
})
    //scaling
rm.animateTrack(map, {
    beat: 287,
    track: [pyro1.id,pyro2.id,pyro3.id,pyro4.id,pyro5.id,pyro6.id],
    duration: 2,
    animation: {
        scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
    },
    repeat: 5
})
}

for (let i = 303; i < 307; i=i+2) {       
    const pyro1 = prefabs.pyro1.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 303,
        track: pyro1.id,    
        duration: 1,
        animation: {
            position: pyro1fuckingHugeVib
        },
        repeat: 5
})
    const pyro2 = prefabs.pyro2.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 303,
        track: pyro2.id,    
        duration: 1,
        animation: {
            position: pyro2fuckingHugeVib
        },
        repeat: 5
})
    const pyro3 = prefabs.pyro3.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 303,
        track: pyro3.id,    
        duration: 1,
        animation: {
            position: pyro3fuckingHugeVib
        },
        repeat: 5
})
    const pyro4 = prefabs.pyro4.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 303,
        track: pyro4.id,    
        duration: 1,
        animation: {
            position: pyro4fuckingHugeVib
        },
        repeat: 5
})
    const pyro5 = prefabs.pyro5.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 303,
        track: pyro5.id,    
        duration: 1,
        animation: {
            position: pyro5fuckingHugeVib
        },
        repeat: 5
})
    const pyro6 = prefabs.pyro6.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 303,
        track: pyro6.id,    
        duration: 1,
        animation: {
            position: pyro6fuckingHugeVib
        },
        repeat: 5
})
    //scaling
rm.animateTrack(map, {
    beat: 303,
    track: [pyro1.id,pyro2.id,pyro3.id,pyro4.id,pyro5.id,pyro6.id],
    duration: 2,
    animation: {
        scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
    },
    repeat: 5
})
}

    const pyro1D = prefabs.pyro3.instantiate(map,317)
    const pyro2D = prefabs.pyro4.instantiate(map,317)
    const pyro3D = prefabs.pyro2.instantiate(map,317.66)
    const pyro4D = prefabs.pyro5.instantiate(map,317.66)
    const pyro5D = prefabs.pyro1.instantiate(map,318.33)
    const pyro6D = prefabs.pyro6.instantiate(map,318.33)
    rm.animateTrack(map, {
        beat: 315,
        track: [pyro1D.id,pyro2D.id,pyro3D.id,pyro4D.id,pyro5D.id,pyro6D.id],
        duration: 2,
        animation: {
            scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
        },
        repeat: 1
  })

  for (let i = 319; i < 323; i=i+2) {       
    const pyro1 = prefabs.pyro1.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 319,
        track: pyro1.id,    
        duration: 1,
        animation: {
            position: pyro1fuckingHugeVib
        },
        repeat: 5
})
    const pyro2 = prefabs.pyro2.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 319,
        track: pyro2.id,    
        duration: 1,
        animation: {
            position: pyro2fuckingHugeVib
        },
        repeat: 5
})
    const pyro3 = prefabs.pyro3.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 319,
        track: pyro3.id,    
        duration: 1,
        animation: {
            position: pyro3fuckingHugeVib
        },
        repeat: 5
})
    const pyro4 = prefabs.pyro4.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 319,
        track: pyro4.id,    
        duration: 1,
        animation: {
            position: pyro4fuckingHugeVib
        },
        repeat: 5
})
    const pyro5 = prefabs.pyro5.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 319,
        track: pyro5.id,    
        duration: 1,
        animation: {
            position: pyro5fuckingHugeVib
        },
        repeat: 5
})
    const pyro6 = prefabs.pyro6.instantiate(map,i)
    rm.animateTrack(map, {
        beat: 319,
        track: pyro6.id,    
        duration: 1,
        animation: {
            position: pyro6fuckingHugeVib
        },
        repeat: 5
})
    //scaling
rm.animateTrack(map, {
    beat: 319,
    track: [pyro1.id,pyro2.id,pyro3.id,pyro4.id,pyro5.id,pyro6.id],
    duration: 2,
    animation: {
        scale: [[0.375,0.375,0.45,0],[0.375*1.75,0.375*1.8,0.45*1.75,0.125,"easeOutSine"],[0.375,0.375,0.45,1,"easeOutSine"]],
    },
    repeat: 5
})
}











}

await Promise.all([
    doMap('ExpertPlusLawless'),
    doMap('ExpertPlusStandard'),
    doMap('ExpertStandard'),
    doMap('ExpertLawless'),
    doMap('HardStandard'),
    doMap('NormalStandard'),

])

// ----------- { OUTPUT } -----------

pipeline.export({
    outputDirectory: '../OutputMaps/New Folder - Copy - Copy'
})