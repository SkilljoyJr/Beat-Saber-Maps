import * as rm from "https://deno.land/x/remapper@4.1.0/src/mod.ts"
import * as bundleInfo from './bundleinfo.json' with { type: 'json' }

const pipeline = await rm.createPipeline({ bundleInfo })

const bundle = rm.loadBundle(bundleInfo)
const materials = bundle.materials
const prefabs = bundle.prefabs

// ----------- { SCRIPT } -----------

async function doMap(file: rm.DIFFICULTY_NAME) {
    const map = await rm.readDifficultyV3(pipeline, file)
    
rm.settings.forceNoteJumpMovementSpeed = false;
rm.settings.forceNoteJumpStartBeatOffset = false;

    map.require('Vivify')
    map.require('Noodle Extensions')
    map.require('Chroma')

    rm.environmentRemoval(map, [
        'Environment',
        'GameCore'
    ])

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

    function explosionBeatandTime (beatNumber: any, positionValues: any) {
    prefabs.explosions.instantiate(map, {
     beat: beatNumber,
     position: positionValues,
     //scale: [1.5,1.5,1.5]
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

    //#region Variables

    //blits
    const blurBigKickIntensity = [[0,0],[20,0.2,"easeOutSine"],[0,1,"easeOutSine"]]
    const blurKickIntensity = [[0,0],[5,0.2,"easeOutSine"],[0,1,"easeOutSine"]]
    const kickwowDropRattleIntensity = [[0,0.05],[2,0.2,'easeOutSine'],[1,0.67,'easeInSine'],[0,1,"easeOutSine"]]
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
    const bigKickRot = [[90, 0, -0, 0],[90, 0, -90, 1]]

    //Clap Explosion Positions
    const pos1L = [-15,5,50]
    const pos2L = [-18,2,50]
    const pos3L = [-8,10,50]
    const pos4L = [-13,-3,50]
    const pos5L = [-10,5,50]
    const pos6L = [-12,3,50]
    const pos7L = [-15,0,50]
    const pos8L = [-17,2,50]

    const pos1R = [15,5,50]
    const pos2R = [18,2,50]
    const pos3R = [8,10,50]
    const pos4R = [13,-3,50]
    const pos5R = [10,5,50]
    const pos6R = [12,3,50]
    const pos7R = [15,0,50]
    const pos8R = [17,2,50]


    //#region Script Begin


//move player with weird kick effect

//drop 1
movePlayer(0, resetPos, resetRot)
movePlayer(140, bigKickPos, bigKickRot)
movePlayer(142, resetPos, resetRot)
movePlayer(155, bigKickPos, bigKickRot)
movePlayer(158, resetPos, resetRot)
movePlayer(171, bigKickPos, bigKickRot)
movePlayer(174, resetPos, resetRot)
movePlayer(187, bigKickPos, bigKickRot)
movePlayer(190, resetPos, resetRot)

//drop 2
movePlayer(140+192, bigKickPos, bigKickRot)
movePlayer(142+192, resetPos, resetRot)
movePlayer(155+192, bigKickPos, bigKickRot)
movePlayer(158+192, resetPos, resetRot)
movePlayer(171+192, bigKickPos, bigKickRot)
movePlayer(174+192, resetPos, resetRot)
movePlayer(187+192, bigKickPos, bigKickRot)
movePlayer(190+192, resetPos, resetRot)

movePlayer(140+192+64-1, bigKickPos, bigKickRot)
movePlayer(142+192+64, resetPos, resetRot)
movePlayer(155+192+64, bigKickPos, bigKickRot)
movePlayer(158+192+64, resetPos, resetRot)
movePlayer(171+192+64, bigKickPos, bigKickRot)
movePlayer(174+192+64, resetPos, resetRot)
movePlayer(187+192+64, bigKickPos, bigKickRot)
movePlayer(190+192+64, resetPos, resetRot)

//drop 3
movePlayer(0, resetPos, resetRot)
movePlayer(140+448, bigKickPos, bigKickRot)
movePlayer(142+448, resetPos, resetRot)
movePlayer(155+448, bigKickPos, bigKickRot)
movePlayer(158+448, resetPos, resetRot)
movePlayer(171+448, bigKickPos, bigKickRot)
movePlayer(174+448, resetPos, resetRot)
movePlayer(187+448, bigKickPos, bigKickRot)
movePlayer(190+448, resetPos, resetRot)




//#region Claps (great code btw good job it's so efficient you ctrl c ctrl v ctrl h using stupid a)

explosionBeatandTime(268, pos1L)
explosionBeatandTime(268+1, pos1R)
explosionBeatandTime(268+2, pos2L)
explosionBeatandTime(268+3, pos2R)
explosionBeatandTime(268+4, pos3L)
explosionBeatandTime(268+5, pos3R)
explosionBeatandTime(268+6, pos4L)
explosionBeatandTime(268+7, pos4R)
explosionBeatandTime(268+8, pos5L)
explosionBeatandTime(268+9, pos5R)
explosionBeatandTime(268+10, pos6L)
explosionBeatandTime(268+11, pos6R)
explosionBeatandTime(268+12, pos7L)
explosionBeatandTime(268+13, pos7R)
explosionBeatandTime(268+14, pos8L)
explosionBeatandTime(268+15, pos8R)

explosionBeatandTime(268+16, pos1L)
explosionBeatandTime(268+1+16, pos1R)
explosionBeatandTime(268+2+16, pos2L)
explosionBeatandTime(268+3+16, pos2R)
explosionBeatandTime(268+4+16, pos3L)
explosionBeatandTime(268+5+16, pos3R)
explosionBeatandTime(268+6+16, pos4L)
explosionBeatandTime(268+7+16, pos4R)
explosionBeatandTime(268+8+16, pos5L)
explosionBeatandTime(268+9+16, pos5R)
explosionBeatandTime(268+10+16, pos6L)
explosionBeatandTime(268+11+16, pos6R)
explosionBeatandTime(268+12+16, pos7L)
explosionBeatandTime(268+13+16, pos7R)
explosionBeatandTime(268+14+16, [0,1,10])

explosionBeatandTime(268+32, pos1L)
explosionBeatandTime(268+1+32, pos1R)
explosionBeatandTime(268+2+32, pos2L)
explosionBeatandTime(268+3+32, pos2R)
explosionBeatandTime(268+4+32, pos3L)
explosionBeatandTime(268+5+32, pos3R)
explosionBeatandTime(268+6+32, pos4L)
explosionBeatandTime(268+7+32, pos4R)
explosionBeatandTime(268+8+32, pos5L)
explosionBeatandTime(268+9+32, pos5R)
explosionBeatandTime(268+10+32, pos6L)
explosionBeatandTime(268+11+32, pos6R)
explosionBeatandTime(268+12+32, pos7L)
explosionBeatandTime(268+13+32, pos7R)
explosionBeatandTime(268+14+32, pos8L)
explosionBeatandTime(268+15+32, pos8R)

explosionBeatandTime(268+16+32, pos1L)
explosionBeatandTime(268+1+16+32, pos1R)
explosionBeatandTime(268+2+16+32, pos2L)
explosionBeatandTime(268+3+16+32, pos2R)
explosionBeatandTime(268+4+16+32, pos3L)
explosionBeatandTime(268+5+16+32, pos3R)
explosionBeatandTime(268+6+16+32, pos4L)
explosionBeatandTime(268+7+16+32, pos4R)
explosionBeatandTime(268+8+16+32, pos5L)
explosionBeatandTime(268+9+16+32, pos5R)
explosionBeatandTime(268+10+16+32, pos6L)
explosionBeatandTime(268+11+16+32, pos6R)
explosionBeatandTime(268+12+16+32, pos7L)
explosionBeatandTime(268+13+16+32, pos7R)
explosionBeatandTime(268+14+16+32, [0,1,10])

//after next drop
explosionBeatandTime(524, pos1L)
explosionBeatandTime(524+1, pos1R)
explosionBeatandTime(524+2, pos2L)
explosionBeatandTime(524+3, pos2R)
explosionBeatandTime(524+4, pos3L)
explosionBeatandTime(524+5, pos3R)
explosionBeatandTime(524+6, pos4L)
explosionBeatandTime(524+7, pos4R)
explosionBeatandTime(524+8, pos5L)
explosionBeatandTime(524+9, pos5R)
explosionBeatandTime(524+10, pos6L)
explosionBeatandTime(524+11, pos6R)
explosionBeatandTime(524+12, pos7L)
explosionBeatandTime(524+13, pos7R)
explosionBeatandTime(524+14, pos8L)
explosionBeatandTime(524+15, pos8R)

explosionBeatandTime(524+16, pos1L)
explosionBeatandTime(524+1+16, pos1R)
explosionBeatandTime(524+2+16, pos2L)
explosionBeatandTime(524+3+16, pos2R)
explosionBeatandTime(524+4+16, pos3L)
explosionBeatandTime(524+5+16, pos3R)
explosionBeatandTime(524+6+16, pos4L)
explosionBeatandTime(524+7+16, pos4R)
explosionBeatandTime(524+8+16, pos5L)
explosionBeatandTime(524+9+16, pos5R)
explosionBeatandTime(524+10+16, pos6L)
explosionBeatandTime(524+11+16, pos6R)
explosionBeatandTime(524+12+16, pos7L)
explosionBeatandTime(524+13+16, pos7R)
explosionBeatandTime(524+14+16, [0,1,10])

explosionBeatandTime(524+32, pos1L)
explosionBeatandTime(524+1+32, pos1R)
explosionBeatandTime(524+2+32, pos2L)
explosionBeatandTime(524+3+32, pos2R)
explosionBeatandTime(524+4+32, pos3L)
explosionBeatandTime(524+5+32, pos3R)
explosionBeatandTime(524+6+32, pos4L)
explosionBeatandTime(524+7+32, pos4R)
explosionBeatandTime(524+8+32, pos5L)
explosionBeatandTime(524+9+32, pos5R)
explosionBeatandTime(524+10+32, pos6L)
explosionBeatandTime(524+11+32, pos6R)
explosionBeatandTime(524+12+32, pos7L)
explosionBeatandTime(524+13+32, pos7R)
explosionBeatandTime(524+14+32, pos8L)
explosionBeatandTime(524+15+32, pos8R)

explosionBeatandTime(524+16+32, pos1L)
explosionBeatandTime(524+1+16+32, pos1R)
explosionBeatandTime(524+2+16+32, pos2L)
explosionBeatandTime(524+3+16+32, pos2R)
explosionBeatandTime(524+4+16+32, pos3L)
explosionBeatandTime(524+5+16+32, pos3R)
explosionBeatandTime(524+6+16+32, pos4L)
explosionBeatandTime(524+7+16+32, pos4R)
explosionBeatandTime(524+8+16+32, pos5L)
explosionBeatandTime(524+9+16+32, pos5R)
explosionBeatandTime(524+10+16+32, pos6L)
explosionBeatandTime(524+11+16+32, pos6R)
explosionBeatandTime(524+12+16+32, pos7L)
explosionBeatandTime(524+13+16+32, pos7R)
explosionBeatandTime(524+14+16+32, [0,1,10])


//#region Blits

//initiaze
materials.kickwow.blit(map,0, 999)
materials.blur.blit(map, 0, 999)
materials.chromaticaberration.blit(map, 0, 999)

//intro
materials.kickwow.set(map, {
    _Intensity: [[0,0],[.5,0.67,'easeOutSine'],[0,1,"easeOutSine"]]
},0,8)
materials.blur.set(map, {
    radius: [[2,0],[3,0.5,"easeOutSine"],[2,12/13,"easeOutSine"],[0,1,"easeOutCubic"]]
},0,13)

//builds
chromAbBlit(108, 4, dropChromAbIntensityX0, dropChromAbIntensityY0)
chromAbBlit(300, 4, dropChromAbIntensityX0, dropChromAbIntensityY0)
chromAbBlit(460, 7, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(588, 0.5, dropChromAbIntensityX0, dropChromAbIntensityY0)



blurBlit(556, 1, blurBigKickIntensity)
blurBlit(572, 1, blurBigKickIntensity)
blurBlit(580, 1, blurBigKickIntensity)
blurBlit(582, 1, blurBigKickIntensity)
blurBlit(584, 1, blurBigKickIntensity)
blurBlit(585, 1, blurBigKickIntensity)



//drop 1
kickwowBlit(142, 3, kickwowDropRattleIntensity)

blurBlit(140, 1, blurBigKickIntensity)
blurBlit(145.5, 0.25, blurBigKickIntensity)
blurBlit(145.75, 0.25, blurBigKickIntensity)
blurBlit(147.25, 1, blurBigKickIntensity)
blurBlit(148, 1, blurBigKickIntensity)
blurBlit(151, 1, blurBigKickIntensity)
blurBlit(155, 1, blurBigKickIntensity)
blurBlit(156, 1, blurBigKickIntensity)

chromAbBlit(142, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+16, 3, kickwowDropRattleIntensity)

blurBlit(140+16, 1, blurBigKickIntensity)
blurBlit(145.5+16, 0.25, blurBigKickIntensity)
blurBlit(145.75+16, 0.25, blurBigKickIntensity)
blurBlit(147.25+16, 1, blurBigKickIntensity)
blurBlit(148+16, 1, blurBigKickIntensity)
blurBlit(151+16, 1, blurBigKickIntensity)
blurBlit(155+16, 1, blurBigKickIntensity)
blurBlit(156+16, 1, blurBigKickIntensity)

chromAbBlit(142+16, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+16, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+16, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+32, 3, kickwowDropRattleIntensity)

blurBlit(140+32, 1, blurBigKickIntensity)
blurBlit(145.5+32, 0.25, blurBigKickIntensity)
blurBlit(145.75+32, 0.25, blurBigKickIntensity)
blurBlit(147.25+32, 1, blurBigKickIntensity)
blurBlit(148+32, 1, blurBigKickIntensity)
blurBlit(151+32, 1, blurBigKickIntensity)
blurBlit(155+32, 1, blurBigKickIntensity)
blurBlit(156+32, 1, blurBigKickIntensity)

chromAbBlit(142+32, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+32, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+32, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+48, 3, kickwowDropRattleIntensity)

blurBlit(140+48, 1, blurBigKickIntensity)
blurBlit(145.5+48, 0.25, blurBigKickIntensity)
blurBlit(145.75+48, 0.25, blurBigKickIntensity)
blurBlit(147.25+48, 1, blurBigKickIntensity)
blurBlit(148+48, 1, blurBigKickIntensity)
blurBlit(151+48, 1, blurBigKickIntensity)
blurBlit(155+48, 1, blurBigKickIntensity)
//blurBlit(156+48, 1, blurBigKickIntensity)

chromAbBlit(142+48, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+48, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+48, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

//bridge 1
blurBlit(204, 1, blurKickIntensity)
blurBlit(209.5, 1, blurKickIntensity)
blurBlit(212, 1, blurKickIntensity)
blurBlit(216.5, 1, blurKickIntensity)
blurBlit(217.5, 1, blurKickIntensity)

blurBlit(204+16, 1, blurKickIntensity)
blurBlit(209.5+16, 1, blurKickIntensity)
blurBlit(212+16, 1, blurKickIntensity)
blurBlit(216.5+16, 1, blurKickIntensity)
blurBlit(217.5+16, 1, blurKickIntensity)

blurBlit(204+32, 1, blurKickIntensity)
blurBlit(209.5+32, 1, blurKickIntensity)
blurBlit(212+32, 1, blurKickIntensity)
blurBlit(216.5+32, 1, blurKickIntensity)
blurBlit(217.5+32, 1, blurKickIntensity)

blurBlit(204+48, 1, blurKickIntensity)
blurBlit(209.5+48, 1, blurKickIntensity)
blurBlit(212+48, 1, blurKickIntensity)
blurBlit(216.5+48, 1, blurKickIntensity)
blurBlit(217.5+48, 1, blurKickIntensity)

blurBlit(268, 1, blurBigKickIntensity)
blurBlit(209.5+64, 1, blurKickIntensity)
blurBlit(212+64, 1, blurKickIntensity)
blurBlit(216.5+64, 1, blurKickIntensity)
blurBlit(217.5+64, 1, blurKickIntensity)

blurBlit(204+16+64, 1, blurKickIntensity)
blurBlit(209.5+16+64, 1, blurKickIntensity)
blurBlit(212+16+64, 1, blurKickIntensity)
blurBlit(215+16+64, 1, blurKickIntensity)
blurBlit(217.5+16+64, 1, blurKickIntensity)

blurBlit(204+32+64, 1, blurKickIntensity)
blurBlit(209.5+32+64, 1, blurKickIntensity)
blurBlit(212+32+64, 1, blurKickIntensity)
blurBlit(216.5+32+64, 1, blurKickIntensity)
blurBlit(217.5+32+64, 1, blurKickIntensity)

blurBlit(204+48+64, 1, blurKickIntensity)
blurBlit(209.5+48+64, 1, blurKickIntensity)
blurBlit(212+48+64, 1, blurKickIntensity)
blurBlit(215+48+64, 1, blurKickIntensity)
blurBlit(218+48+64, 1, blurKickIntensity)




//drop 2
kickwowBlit(142+192, 3, kickwowDropRattleIntensity)

blurBlit(140+192, 1, blurBigKickIntensity)
blurBlit(145.5+192, 0.25, blurBigKickIntensity)
blurBlit(145.75+192, 0.25, blurBigKickIntensity)
blurBlit(147.25+192, 1, blurBigKickIntensity)
blurBlit(148+192, 1, blurBigKickIntensity)
blurBlit(151+192, 1, blurBigKickIntensity)
blurBlit(155+192, 1, blurBigKickIntensity)
blurBlit(156+192, 1, blurBigKickIntensity)

chromAbBlit(142+192, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+192, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+192, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+16+192, 3, kickwowDropRattleIntensity)

blurBlit(140+16+192, 1, blurBigKickIntensity)
blurBlit(145.5+16+192, 0.25, blurBigKickIntensity)
blurBlit(145.75+16+192, 0.25, blurBigKickIntensity)
blurBlit(147.25+16+192, 1, blurBigKickIntensity)
blurBlit(148+16+192, 1, blurBigKickIntensity)
blurBlit(151+16+192, 1, blurBigKickIntensity)
blurBlit(155+16+192, 1, blurBigKickIntensity)
blurBlit(156+16+192, 1, blurBigKickIntensity)

chromAbBlit(142+16+192, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+16+192, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+16+192, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+32+192, 3, kickwowDropRattleIntensity)

blurBlit(140+32+192, 1, blurBigKickIntensity)
blurBlit(145.5+32+192, 0.25, blurBigKickIntensity)
blurBlit(145.75+32+192, 0.25, blurBigKickIntensity)
blurBlit(147.25+32+192, 1, blurBigKickIntensity)
blurBlit(148+32+192, 1, blurBigKickIntensity)
blurBlit(151+32+192, 1, blurBigKickIntensity)
blurBlit(155+32+192, 1, blurBigKickIntensity)
blurBlit(156+32+192, 1, blurBigKickIntensity)

chromAbBlit(142+32+192, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+32+192, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+32+192, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+48+192, 3, kickwowDropRattleIntensity)

blurBlit(140+48+192, 1, blurBigKickIntensity)
blurBlit(145.5+48+192, 0.25, blurBigKickIntensity)
blurBlit(145.75+48+192, 0.25, blurBigKickIntensity)
blurBlit(147.25+48+192, 1, blurBigKickIntensity)
blurBlit(148+48+192, 1, blurBigKickIntensity)
blurBlit(151+48+192, 1, blurBigKickIntensity)
blurBlit(155+48+192, 1, blurBigKickIntensity)
//blurBlit(156+48, 1, blurBigKickIntensity)

chromAbBlit(142+48+192, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+48+192, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+48+192, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+192+64, 3, kickwowDropRattleIntensity)

blurBlit(140+192+64, 1, blurBigKickIntensity)
blurBlit(145.5+192+64, 0.25, blurBigKickIntensity)
blurBlit(145.75+192+64, 0.25, blurBigKickIntensity)
blurBlit(147.25+192+64, 1, blurBigKickIntensity)
blurBlit(148+192+64, 1, blurBigKickIntensity)
blurBlit(151+192+64, 1, blurBigKickIntensity)
blurBlit(155+192+64, 1, blurBigKickIntensity)
blurBlit(156+192+64, 1, blurBigKickIntensity)

chromAbBlit(142+192+64, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+192+64, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+192+64, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+16+192+64, 3, kickwowDropRattleIntensity)

blurBlit(140+16+192+64, 1, blurBigKickIntensity)
blurBlit(145.5+16+192+64, 0.25, blurBigKickIntensity)
blurBlit(145.75+16+192+64, 0.25, blurBigKickIntensity)
blurBlit(147.25+16+192+64, 1, blurBigKickIntensity)
blurBlit(148+16+192+64, 1, blurBigKickIntensity)
blurBlit(151+16+192+64, 1, blurBigKickIntensity)
blurBlit(155+16+192+64, 1, blurBigKickIntensity)
blurBlit(156+16+192+64, 1, blurBigKickIntensity)

chromAbBlit(142+16+192+64, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+16+192+64, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+16+192+64, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+32+192+64, 3, kickwowDropRattleIntensity)

blurBlit(140+32+192+64, 1, blurBigKickIntensity)
blurBlit(145.5+32+192+64, 0.25, blurBigKickIntensity)
blurBlit(145.75+32+192+64, 0.25, blurBigKickIntensity)
blurBlit(147.25+32+192+64, 1, blurBigKickIntensity)
blurBlit(148+32+192+64, 1, blurBigKickIntensity)
blurBlit(151+32+192+64, 1, blurBigKickIntensity)
blurBlit(155+32+192+64, 1, blurBigKickIntensity)
blurBlit(156+32+192+64, 1, blurBigKickIntensity)

chromAbBlit(142+32+192+64, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+32+192+64, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+32+192+64, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+48+192+64, 3, kickwowDropRattleIntensity)

blurBlit(140+48+192+64, 1, blurBigKickIntensity)
blurBlit(145.5+48+192+64, 0.25, blurBigKickIntensity)
blurBlit(145.75+48+192+64, 0.25, blurBigKickIntensity)
blurBlit(147.25+48+192+64, 1, blurBigKickIntensity)
blurBlit(148+48+192+64, 1, blurBigKickIntensity)
blurBlit(151+48+192+64, 1, blurBigKickIntensity)
blurBlit(155+48+192+64, 1, blurBigKickIntensity)
//blurBlit(156+48, 1, blurBigKickIntensity)

chromAbBlit(142+48+192+64, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+48+192+64, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+48+192+64, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

//Bridge 2
blurBlit(460, 1, blurKickIntensity)
blurBlit(465.5, 1, blurKickIntensity)
blurBlit(468, 1, blurKickIntensity)
blurBlit(472.5, 1, blurKickIntensity)
blurBlit(473.5, 1, blurKickIntensity)

blurBlit(476, 1, blurKickIntensity)
blurBlit(481.5, 1, blurKickIntensity)
blurBlit(484, 1, blurKickIntensity)
blurBlit(487, 1, blurKickIntensity)
blurBlit(489.5, 1, blurKickIntensity)

blurBlit(460+32, 1, blurKickIntensity)
blurBlit(465.5+32, 1, blurKickIntensity)
blurBlit(468+32, 1, blurKickIntensity)
blurBlit(472.5+32, 1, blurKickIntensity)
blurBlit(473.5+32, 1, blurKickIntensity)

blurBlit(460+48, 1, blurKickIntensity)
blurBlit(465.5+48, 1, blurKickIntensity)
blurBlit(468+48, 1, blurKickIntensity)
blurBlit(473.5+48, 1, blurKickIntensity)

blurBlit(519, 1, blurKickIntensity)

blurBlit(524, 1, blurBigKickIntensity)

//drop 3
kickwowBlit(142+448, 3, kickwowDropRattleIntensity)

blurBlit(140+448, 1, blurBigKickIntensity)
blurBlit(145.5+448, 0.25, blurBigKickIntensity)
blurBlit(145.75+448, 0.25, blurBigKickIntensity)
blurBlit(147.25+448, 1, blurBigKickIntensity)
blurBlit(148+448, 1, blurBigKickIntensity)
blurBlit(151+448, 1, blurBigKickIntensity)
blurBlit(155+448, 1, blurBigKickIntensity)
blurBlit(156+448, 1, blurBigKickIntensity)

chromAbBlit(142+448, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+448, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+448, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+16+448, 3, kickwowDropRattleIntensity)

blurBlit(140+16+448, 1, blurBigKickIntensity)
blurBlit(145.5+16+448, 0.25, blurBigKickIntensity)
blurBlit(145.75+16+448, 0.25, blurBigKickIntensity)
blurBlit(147.25+16+448, 1, blurBigKickIntensity)
blurBlit(148+16+448, 1, blurBigKickIntensity)
blurBlit(151+16+448, 1, blurBigKickIntensity)
blurBlit(155+16+448, 1, blurBigKickIntensity)
blurBlit(156+16+448, 1, blurBigKickIntensity)

chromAbBlit(142+16+448, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+16+448, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+16+448, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+32+448, 3, kickwowDropRattleIntensity)

blurBlit(140+32+448, 1, blurBigKickIntensity)
blurBlit(145.5+32+448, 0.25, blurBigKickIntensity)
blurBlit(145.75+32+448, 0.25, blurBigKickIntensity)
blurBlit(147.25+32+448, 1, blurBigKickIntensity)
blurBlit(148+32+448, 1, blurBigKickIntensity)
blurBlit(151+32+448, 1, blurBigKickIntensity)
blurBlit(155+32+448, 1, blurBigKickIntensity)
blurBlit(156+32+448, 1, blurBigKickIntensity)

chromAbBlit(142+32+448, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+32+448, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+32+448, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)

kickwowBlit(142+48+448, 3, kickwowDropRattleIntensity)

blurBlit(140+48+448, 1, blurBigKickIntensity)
blurBlit(145.5+48+448, 0.25, blurBigKickIntensity)
blurBlit(145.75+48+448, 0.25, blurBigKickIntensity)
blurBlit(147.25+48+448, 1, blurBigKickIntensity)
blurBlit(148+48+448, 1, blurBigKickIntensity)
blurBlit(151+48+448, 1, blurBigKickIntensity)
blurBlit(155+48+448, 1, blurBigKickIntensity)
//blurBlit(156+48, 1, blurBigKickIntensity)

chromAbBlit(142+48+448, 2, dropChromAbIntensityX1, dropChromAbIntensityY1)
chromAbBlit(144+48+448, 4, dropChromAbIntensityX2, dropChromAbIntensityY2)
chromAbBlit(148+48+448, 7, dropChromAbIntensityX3, dropChromAbIntensityY3)








/*
    rm.animateTrack(map, {
        beat: 0,
        track: 'player',
        duration: 0,
        animation: {
            position: [[109.6589, -468.0236, 1500.215, 0],[109.6589, -468.0236, 1500.215, 1]],
            localRotation: [[90, 0, 90, 0],[90, 0, 90, 1]]
        }
    })
*/



prefabs.introscene.instantiate(map,0)
//prefabs["connected skybox"].instantiate(map,0)
prefabs["swirly sphere"].instantiate(map,0)
prefabs.intro.instantiate(map,{
    //position: [0,0,0]
})
prefabs.mainbackground.instantiate(map,0)
prefabs.universe.instantiate(map,0)









}

await Promise.all([
    doMap('ExpertPlusStandard'),
    doMap('HardStandard')
])

// ----------- { OUTPUT } -----------

pipeline.export({
    outputDirectory: '../OutputMaps/Say It'
})
