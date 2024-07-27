
var ENEMIES = {
    RussianBot: '',
    QAnonShamon: '',
    MagaHatMarge: '',
    InternetTroll: '',
    CyberNinja: '',
}

var Environments = {
    Street: {
        tileImage: 'backgroundTileStreetSidewalk'
    },
    OfficeInterior: {
        tileImage: 'backgroundTileOfficeInterior',
        backgroundColor: 'tan',
        minYOffset: 200,
        width: 1000
    },
    Grass: {
        tileImage: 'backgroundTileGrass',
        backgroundColor: "#322f35"
    },
}

var BlockWalkDoor = {};
var BusStop = {};

function randomEnemies() {
    return {};
}

var LouChalibre = {
    name: "Lou Chalibre",
    image: "LouChalibre",
    talkSound: SOUNDS.LouTalk,
    every: 3,
}


ImageLoader.onComplete( () => {
    LouChalibre.talkSound = SOUNDS.LouTalk;
    // LouChalibre.image = IMAGES.LouChalibre;
});

// SOUNDS.onComplete( () => {
//     LouChalibre.talkSound = SOUNDS.LouTalk;
// });
var rallyTables = [
    {
        fullName: 'Get Out The Vote!',
        acronymn: "GOTV",
        rallyTableFront: ImageLoader.loadImage('rallyTables/getOutTheVote.png'),
    }
]


function rallyScene(scene, x=0, y=180, imgFront, imgback) {
    {
        var deskImage =  new ImageDrawable(imgback || IMAGES.rallyTableBaseBack, 0,0);
        deskImage.w *= 2.5;
        deskImage.h *= 2.5;
        deskImage.y = -deskImage.h+60;
        var deskBack = scene.addEntity(new EntityTwoPointFiveD(450+x,y-60,0,deskImage))
    }
    {
        var deskImage =  new ImageDrawable(imgFront || randomFromListAndRemove(IMAGES.availableRallyTables), 0,0);
        deskImage.w *= 2.5;
        deskImage.h *= 2.5;
        deskImage.y = -deskImage.h;
        var desk = scene.addEntity(new EntityTwoPointFiveD(450+x,y,0,deskImage))
    }
    var npc = scene.addEntity(new HighFiver(520+x,y-40))
    // npc.shouldStartDiaolgueOnProximity = true;
    npc.dx = -1
    npc.getInputs = e=>{}
    npc.beHappy();
    npc.name = "Clerk"
    npc.canHighFive = false;
    npc.lookingAt = scene.players[0]
    npc.interactablesRange = 200;
    npc.avoidHealth = 0;
    npc.onAfterDialogue = e=> {
    }
    npc.giveItem = () => {
        npc.isInteractable = false;
        scene.showGo = true;
        scene.addEntity(new WaterBottle(npc.x+100,npc.y+100))
    }
    npc.dialogue = dialogueIndexedByScene["Rally Table Booth".toLowerCase()]
    npc.dialogue[0].zoom=2;
    // npc.dialogue = [
    //     {person: npc, text: "Hi!||| would you like to support our cause?", zoom:2},
    //     {options:[
    //         {text: 'yes', sequence:[
    //             {person: npc, text: "Okay cool!"},
    //             {person: npc, text: "Hey heres some water! Stay hydrated out there!"},
    //             {onStart: dia => {
    //                 npc.isInteractable = false;
    //                 scene.showGo = true;
    //                 scene.addEntity(new WaterBottle(npc.x+100,npc.y+100))
    //             }}
    //         ]},
    //         {text: 'no', sequence:[{
    //             person: npc, text: "oh. okay"
    //         }]},
    //     ]},
    // ]
}

var GameSequence;

window.addEventListener('load', function() {
    
GameSequence = [
    {
        name: "opening cutscene",
        music: SOUNDS.norteno,
        DialogueData: [
            {person: LouChalibre, text: "The time to <color red>vote</color> is <wiggle>approaching!"},
            {person: LouChalibre, text: "Are you ready to cast your ballot?"},
        ],
        continueOnDialogueFinish: true,
    },
    {
        name: "Level 1",
        Goal: "Get to The Registrar Office!",

        DialogueData: [
            {person: LouChalibre, text: "You're not registered to vote? Today is the last day!"},
            {person: LouChalibre, text: "Hurry! you better get to the Registrar Office!"},
            {person: LouChalibre, text: "Before its <wiggle> <speed 0.3>toooooo late!"},
        ],
        npcTexts: [
            "You haven't registered to vote yet? Cmon lets go!",
            "You're not registered yet? Its the last day!",
            "Lets get you to the registrar office!",
            "Oh the last day is today?, I need to register to vote too!",
            "The registrar office? Lets go!",
        ],
        spawnRandom: [
            [HighFiver, 10]
        ],
        levelData: {},
        // encounters: [
        //     {
        //         name: "First combat",
        //         Goal: "Defeat the enemies!",
        //         enemies: [
        //             ENEMIES.RussianBot,
        //             ENEMIES.QAnonShamon,
        //             ENEMIES.MagaHatMarge,
        //         ]
        //     },
        //     {
        //         name: "Registrar Office"
        //     }
        // ]
    },
    {
        name: "First combat",
        Goal: "Defeat the enemies!",
        music: SOUNDS.cumbia,
        DialogueData: [
            {music: SOUNDS.cumbia},
            {person: LouChalibre, text: "<bam>Uh Oh!"},
            {person: LouChalibre, text: "Watch out for the bots!"},
            {person: LouChalibre, text: "Press the [Attack] button to teach 'em a lesson"},
        ],
        spawnRandom: [
            [Bot, 4],
            [TrashCan, 1],
        ]
    },
    {
        name: "1-2",
        DialogueData: [], 
        music: SOUNDS.cumbia,
        spawnRandom: [
            // [KnockableDoor, 10],
            // [Bot, 8],
            [Ninja, 3],
            [TrashCan, 1],
            [QAnonShamon, 1],
            // [Bot, 10],
        ]
    },
    {
        name: "Tacos",
        showGo: true,
        music: SOUNDS.norteno,
        DialogueData: [], 
        spawnRandom: [
            // [KnockableDoor, 10],
            [TrashCan, 1],
            [Taco, 3],
            // [Bot, 10],
        ],
        onLoad: scene => {
            var x = 600;
            var y = 50;
            {
                var deskImage =  new ImageDrawable(IMAGES.tacosLocosBack, 0,0);
                deskImage.w *= 2.5;
                deskImage.h *= 2.5;
                deskImage.y = -deskImage.h+60;
                var deskBack = scene.addEntity(new EntityTwoPointFiveD(450+x,y-60,0,deskImage))
            }
            {
                var deskImage =  new ImageDrawable(IMAGES.tacosLocos, 0,0);
                deskImage.w *= 2.5;
                deskImage.h *= 2.5;
                deskImage.y = -deskImage.h;
                var desk = scene.addEntity(new EntityTwoPointFiveD(450+x,y,0,deskImage))
            }
            var npc = scene.addEntity(new Carumba(520+x,y-40))
            // npc.shouldStartDiaolgueOnProximity = true;
            npc.dx = -1
            npc.getInputs = e=>{}
            npc.beHappy();
            npc.name = "Carumba"
            npc.canHighFive = false;
            npc.lookingAt = scene.players[0]
            npc.interactablesRange = 200;
            npc.onAfterDialogue = e=> {
            }
            scene.specialActors.Carumba = npc;
            npc.giveItem = () => {
                // npc.isInteractable = false;
                scene.showGo = true;
                var taco = scene.addEntity(new Taco(npc.x+150,npc.y+50))
                taco.z += -80
            }
            npc.dialogue = dialogueIndexedByScene["taco stand"];


            // npc.dialogue = [
            //     {person: npc, text: "Taco?", zoom:2},
            //     {options:[
            //         {text: 'yes', sequence:[
            //             {person: npc, text: "Heres Taco!"},
            //             {onStart: dia => {
                            // // npc.isInteractable = false;
                            // scene.showGo = true;
                            // var taco = scene.addEntity(new Taco(npc.x+150,npc.y+50))
                            // taco.z += -80
            //             }}
            //         ]},
            //         {text: 'no', sequence:[{
            //             person: npc, text: "oh. okay"
            //         }]},
            //     ]},
            // ]
        }
    },
    {
        name: "1-2",
        music: SOUNDS.bossMusic,
        DialogueData: [], 
        spawnRandom: [
            // [KnockableDoor, 10],
            // [Bot, 3],
            [Putin, 1],
            [TrashCan, 1],
            // [Bot, 10],
        ]
    },
    {
        name: "Putin Run away",
        preLoad: scene => {
            var putin = scene.addEntity(new PutinOnAHorse(scene.level.width*.7,100));
            putin.dx = -1;
            putin.afterDialogue = () => {
                for(var i =0;i<12;i++) {
                    this.setTimeout(()=>{
                        var x = 200+Math.random()*1000;
                        var y = 0+Math.random()*300;
                        var t = scene.addEntity(new BotSpawnAirStrike(x,y));
                    }, i*200)
                }
            }
        },
        DialogueData: [
            {personString: "Putin", text:"Oh no. Time to make escape"},
            {personString: "Putin", text:"Good luck with vote", doA: 'getOnHorse'},
            {personString: "Putin", text:"hahahaha", doA: 'moveRight'},
            // {
            //     onStart: dc => {
            //         var scene = dc.gameScene;
                    // for(var i =0;i<12;i++) {
                    //     this.setTimeout(()=>{
                    //         var x = 200+Math.random()*1000;
                    //         var y = 0+Math.random()*300;
                    //         var t = scene.addEntity(new BotSpawnAirStrike(x,y));
                    //     }, i*200)
                    // }
            //     }
            // }
        ]
    },
    {
        name: "Registrar Office Reached",
        Goal: "Enter the Registrar Office",
        music: SOUNDS.norteno,
        environment: Environments.Street,
        DialogueData: [
            {person: LouChalibre, text: "you made it to the Registrar office!"},
            // {text: "<color red> you received a ballot!"},
        ], //give ballot cutscene
        dontShowGo: true,
        onLoad: (scene) => {
            scene.player.health = scene.player.maxHealth;
            scene.addEntity(createItemDrop(300,300, ITEMS.flag, 10))
            var office = scene.addEntity(
                new ImageDrawable(
                    ImageLoader.loadImage("RegistrarOffice.png",null, (img) => {
                        office.reInit();
                        office.w *= 4
                        office.h *= 4
                        window.office=office;
                        office.y=-office.h - 80
                        // scene.addEntity(new ItemPickup('Ballot', IMAGES.ballotItem, 600,100,64,64))
                        scene.addEntity(new EnterableDoor(office.x+office.w/2+30,-100,0));
                        scene.defaultZoom = 0.5
                        scene.cameraLerpSpeed = 40
                        // scene.camera.zoom = 0.5
                        scene.camera.offsetY = -200
                    }), 350,0))
            
        }
        
    },
    {
        name: 'Registrar Office Combat',
        Goal: "Get your ballot!",
        music: SOUNDS.cumbia,
        environment: Environments.OfficeInterior,
        spawnRandom: [
            [Ninja, 3],
            [LizardPerson, 3]
        ],
        onLoad: (scene) => {
            scene.minY += 200
        }
    },
    {
        name: 'Registrar Office Interior',
        Goal: "Get your ballot!",
        music: SOUNDS.norteno,
        environment: Environments.OfficeInterior,
        onLoad: (scene) => {
            scene.minY += 200
            var deskImage =  new ImageDrawable(IMAGES.deskFront, 0,0);
            deskImage.w *= 3;
            deskImage.h *= 3;
            deskImage.y = -deskImage.h;
            scene.addEntity(createItemDrop(750,200, ITEMS.flag, 10))

            var desk = scene.addEntity(new EntityTwoPointFiveD(450,160,0,deskImage))
            var npc = scene.addEntity(new HighFiver(500,100))
            // npc.shouldStartDiaolgueOnProximity = true;
            npc.dx = -1
            npc.getInputs = e=>{}
            npc.beHappy();
            npc.name = "Clerk"
            scene.specialActors.Clerk = npc;
            npc.canHighFive = false;
            npc.lookingAt = scene.players[0]
            npc.giveItem = () => {
                npc.isInteractable = false;
                var ballot = scene.addEntity(new ItemPickup('Voter Guide', IMAGES.ballotItem, 500,250,64,64))
                console.log(ballot.itemName)
                // npc.shouldStartDiaolgueOnProximity = false;
                ballot.afterPickup = e=>{
                    scene.showGo = true;
                    scene.driver.setScene(new VoterGuideScene(scene))
                }
            }
            npc.dialogue = dialogueIndexedByScene["Registrar Office Interior NPC".toLowerCase()]
            // npc.dialogue = [
            //     {person: npc, text: "Hi!||| are you here to receive your ballot?", zoom:2},
            //     {options:[
            //         {text: 'yes', sequence:[
            //             {person: npc, text: "Wow you were just in time, we were just about to close!"},
            //             {person: npc, text: "Well, here you go!"},
            //             {onStart: dia => {
                            // npc.isInteractable = false;
                            // var ballot = scene.addEntity(new ItemPickup('Ballot', IMAGES.ballotItem, 500,250,64,64))
                            // // npc.shouldStartDiaolgueOnProximity = false;
                            // ballot.afterPickup = e=>{
                            //     scene.showGo = true;
                            //     scene.driver.setScene(new VoterGuideScene(scene))
                            // }
            //             }}
            //         ]},
            //         {text: 'no', sequence:[{
            //             person: npc, text: "oh. okay"
            //         }]},
            //     ]},
            // ]
            npc.onAfterDialogue = e=> {
            //     var ballot = scene.addEntity(new ItemPickup('Ballot', IMAGES.ballotItem, 500,250,64,64))
            //     ballot.afterPickup = e=>{
            //         scene.showGo = true;
            //     }
                npc.isInteractable = false;
                var ballot = scene.addEntity(new ItemPickup('Voter Guide', IMAGES.ballotItem, 500,250,64,64))
                // npc.shouldStartDiaolgueOnProximity = false;
                ballot.afterPickup = e=>{
                    scene.showGo = true;
                    scene.driver.setScene(new VoterGuideScene(scene))
                }
            }

            // scene.maxY -= 100
        }
    },
    {
        name: "Low Rider Transition",
        DialogueData: [
            {person: LouChalibre, text: "Hey bud, We're heading to the community rally"},
            {person: LouChalibre, text: "Need a ride?"},
            
        ],
        dontShowGo: true,
        onLoad: (scene) => {
            // var lowRider = scene.addEntity(new ImageDrawable(IMAGES.lowRider, 250,-100))
            // lowRider.w *= 3;
            // lowRider.h *= 3;
            var lowRider = scene.addEntity(new LowRider(150,-100))


            var door = scene.addEntity(new EnterableDoor(lowRider.x+250,lowRider.y+250,-50));
            door.afterDialogue = () => {
                scene.loadNextLevel();
                player.hidden = false;
            }
            door.onInteract = player => {
                player.hidden = true;
                player.scene.dialogueController.speakerImage = null;
                player.x = lowRider.x + 300
                var dialogue = [
                    {onStart: () => {
                        lowRider.bouncing = true;
                        lowRider.update = () => {
                            lowRider.x += 10;
                            player.x += 10;
                            lowRider.frontOffset = Math.sin(frameCount * Math.PI/25);
                            lowRider.frontOffset = lowRider.frontOffset*lowRider.frontOffset*3;
                        }
                    }, waitFor: 120}
                ]
                player.scene.playDialogue(
                    dialogue, true, door.afterDialogue
                )
            }
        },
        // night: true,
    },
    {
        name: "Community Rally Entrance",
        Goal: "Enter the Community Rally",
        environment: Environments.Street,
        levelData: {},
        width: 1000,
        spawnRandom: [
            [HighFiver, 5],
            [TrashCan, 1],
        ],
        onLoad: (scene) => {
            var office = scene.addEntity(new ImageDrawable(IMAGES.rallyBackgroundEntrance, 0,0))
            
            office.w *= 4
            office.h *= 2
            window.office=office;
            office.y=-office.h - 100
            // scene.addEntity(new ItemPickup('Ballot', IMAGES.ballotItem, 600,100,64,64))
            scene.addEntity(new EnterableDoor(office.x+office.w/2+30,-100,0));
            // scene.defaultZoom = 0.8
            // scene.cameraLerpSpeed = 40
            // // scene.camera.zoom = 0.5
            // scene.camera.offsetY = 0
        }
        
    },
    // {
    //     name: "Community Rally - 1",
    //     Goal: "Join the cause",
    //     environment: Environments.Grass,
    //     levelData: {},
    //     width: 2000,
    //     spawnRandom: [
    //         // [HighFiver, 5],
    //         [TrashCan, 2],
    //     ],
    //     onLoad: (scene) => {
    //         rallyScene(scene,-100);
    //         rallyScene(scene, 400);
    //         rallyScene(scene, 900);
    //         for(var i=0;i<5;i++) {
    //             var x = Math.random()*2000;
    //             var y = 1000;
    //             scene.addEntity(new HighFiver(x,y))
    //         }
    //     }
    // },
    {
        name: "Community Rally Fight",
        environment: Environments.Grass,
        music: SOUNDS.cumbia2,
        spawnRandom: [
            // [Troll, 4],
            [TrashCan, 2],
        ],

        width: 5000,
        onLoad: (scene) => {
            var stage = new ImageDrawable(IMAGES.parkStage, 2000,0)
            scene.showGoOnEnemiesDefeated = true;
            scene.backgrounds.push(stage);
            stage.w *= 3;
            stage.h *= 3;
            stage.y = scene.minY-stage.h
            var candidate = scene.addEntity(new Candidate(stage.x+stage.w/2,stage.y+stage.h/2));
            candidate.avoidHealth = 0;
            candidate.shouldStealCamera = true;
            candidate.dialogue = dialogueIndexedByScene["community rally speech"]
            candidate.isInteractable = false;
            IMAGES.availableRallyTables = IMAGES.rallyTables.map(a=>a);
            rallyScene(scene,-100);
            rallyScene(scene, 400);
            rallyScene(scene, 900);


            rallyScene(scene,-100+3000);
            rallyScene(scene, 400+3000);
            rallyScene(scene, 900+3000);
            for(var i=0;i<5;i++) {
                var x = Math.random()*2000;
                var y = 1000;
                scene.addEntity(new HighFiver(x,y))
            }
            var troll = scene.addEntity(new Troll(stage.x+stage.w, stage.y+400))
            scene.specialActors.Troll = troll;
            troll.obj = troll;
            troll.dx=-1
            troll.shouldSceneCollide= false;
            troll.update();
            troll.shouldSceneCollide = true;
            troll.shouldStealCamera = true;

            for(var i=0;i<5;i++) {
                var x = stage.x + stage.w +i*50+50
                var y = stage.y+400;
                troll = scene.addEntity(new Troll(x,y))
                troll.dx=-1
                troll.shouldSceneCollide= false;
                troll.update();
                troll.shouldSceneCollide = true;
            }

            for(var i=0;i<5;i++) {
                var x = Math.random()*1000+2000;
                var y = 1000;
                scene.addEntity(new Troll(x,y))
                
            }
            for(var i=0;i<5;i++) {
                var x = Math.random()*500+2500;
                var y = 1000;
                scene.addEntity(new Bot(x,y))
            }
            scene.addEntity(new MagaMarge(1500,1000));
            candidate.startDialogueToPlayer(scene.player);
            scene.player.inputBlocked = true;
        }
    },
    // {
    //     name: "Community Rally - 3",
    //     Goal: "Join the cause",
    //     music: SOUNDS.norteno,
    //     environment: Environments.Grass,
    //     levelData: {},
    //     spawnRandom: [
    //         [HighFiver, 5],
    //         [TrashCan, 5],
    //         [Bot, 4],
    //         [Ninja, 4],
    //         [Troll, 1],
    //     ],
    //     onLoad: (scene) => {
    //         rallyScene(scene);
    //     }
    // },
    // {
    //     name: "Community Rally - 4",
    //     environment: Environments.Grass,
    //     music: SOUNDS.cumbia,
    //     spawnRandom: [
    //         [Bot, 4],
    //         [Ninja, 4],
    //         [Troll, 1],
    //         [TrashCan, 5],
    //     ]
    // },
    // {
    //     name: "Community Rally - 5",
    //     Goal: "Join the cause",
    //     music: SOUNDS.norteno,
    //     environment: Environments.Grass,
    //     levelData: {},
    //     spawnRandom: [
    //         [HighFiver, 5],
    //         [TrashCan, 5],
    //     ],
    //     onLoad: (scene) => {
    //         rallyScene(scene);
    //     }
    // },
    // {
    //     name: "Community Rally",
    //     Goal: "Talk to 5 tables",
    //     levelData: {},
    //     encounters: [
    //         {
    //             name :'table 1',
    //             DialogueData: [],
    //         },
    //         {
    //             name :'enemyEncounter',
    //             enemies: [
    //                 ENEMIES.InternetTroll,
    //                 ENEMIES.RussianBot,
    //             ]
    //         },
    //         {
    //             name :'table 2',
    //             DialogueData: [],
    //         },
    //         {
    //             name :'enemyEncounter',
    //             enemies: [
    //                 ENEMIES.RussianBot,
    //                 ENEMIES.CyberNinja,
    //             ]
    //         },{
    //             name :'table 3',
    //             DialogueData: [],
    //         },
    //         {
    //             name :'enemyEncounter',
    //             enemies: [
    //                 ENEMIES.InternetTroll,
    //                 ENEMIES.CyberNinja,
    //             ]
    //         },{
    //             name :'table 4',
    //             DialogueData: [],
    //         },
    //         {
    //             name :'enemyEncounter',
    //             enemies: [
    //                 ENEMIES.InternetTroll,
    //                 ENEMIES.RussianBot,
    //                 ENEMIES.CyberNinja,
    //                 ENEMIES.QAnonShamon,
    //                 ENEMIES.MagaHatMarge,
    //             ]
    //         },{
    //             name :'table 5',
    //             DialogueData: [],
    //         },
    //     ]
    // },
    // {
    //     name :"Community Rally complete",
    //     environment: Environments.Grass,
    //     DialogueData: [
    //         {person: LouChalibre, text: "Its time for the march!"},
        
    //     ],
    //     continueOnDialogueFinish: true,
    // },
    {
        name: "March Transition",
        environment: Environments.Grass,
        music: SOUNDS.norteno,
        continueOnDialogueFinish: true,
    },
    {
        name: "March",
        environment: Environments.Grass,
        notBlocking: true,
        music: SOUNDS.marchMusic,
        continueOnDialogueFinish: true,
        // continueOnDialogueFinish: true,
        onLoad: scene => {
            scene.showGo = true;
            var w = scene.level.width/2;
            var h = scene.maxY - scene.minY;
            var is = 5;
            var js = 6;
            for(var i=0;i<is;i++) {
                for(var j=0;j<js;j++ ){
                    var x = w * (i+j/js)/is;
                    var y = scene.minY + j*h/js;
                    if(i==2&&j==3) {
                        scene.player.x = x;
                        scene.player.y = y;
                        continue;
                    };
                    var npc = scene.addEntity(new HighFiver(x,y))
                    // if(Math.random()>.8) {
                    //     npc.model.addPicketSign();
                    // }
                    npc.shouldSceneCollide = false;
                    npc.getInputs = ()=>{}
                    npc.mx = 0.5;
                    npc.speed = 2;
                }
            }
            scene.player.model.endAnim();
            scene.player.mx = 0.5;
            scene.player.speed = 2;
            scene.player.inputBlocked = true;
        }
    },
    {
        name: "March - 2",
        notBlocking: true,
        continueOnDialogueFinish: true,
        onLoad: scene => {
            var w = scene.level.width/2;
            var h = (scene.maxY - scene.minY)*.8;
            var sy = scene.minY + 100;
            var is = 5;
            var js = 5;
            scene.showGo = true;
            for(var i=0;i<is;i++) {
                for(var j=0;j<js;j++ ){
                    var x = w * (i+j/js)/is;
                    var y = sy + j*h/js;
                    if(i==2&&j==3) {
                        scene.player.x = x;
                        scene.player.y = y;
                        continue;
                    };
                    var npc = scene.addEntity(new HighFiver(x,y))
                    // if(Math.random()>.8) {
                    //     npc.model.addPicketSign();
                    // }
                    npc.shouldSceneCollide = false;
                    npc.getInputs = ()=>{}
                    npc.mx = 0.5;
                    npc.speed = 2;
                }
            }
            scene.player.model.endAnim();
            scene.player.mx = 0.5;
            scene.player.speed = 2;
            scene.player.inputBlocked = true;
        }
    },
    {
        name :"Block Walking",
        // musicOff: true,
        Goal: 'knock on every door 3 times',
        music: SOUNDS.norteno,
        environment: Environments.Street,
        dontShowGo: true,
        width: 5000,
        DialogueData: [
            {person: LouChalibre, text: 'Lets get the word out!'},
            {person: LouChalibre, text: 'Knock on some doors to spread the word!'},
        ],
        spawnRandom: [
            [Taco, 3],
        ],
        winCondition: scene => {
            return scene.enemies.length==0&&openedDoors>=12
        },
        onLoad: scene =>{
            openedDoors = 0;
            var candidate = scene.addEntity(new Candidate(300,100));
            candidate.dialogue = dialogueIndexedByScene["candidate block walking"]
            // scene.minY = 0;
            var houses = [];
            for(var i=0;i<12;i++) {
                var house = scene.addEntity(new KnockableHouse((i+0.5)*400, scene.minY))
                houses[i]=house;
            }
            var numEnemies = 2;
            var numBads = 3;
            for(var j=0;j<numEnemies&&j<houses.length;j++) {
                var i = Math.floor(Math.random()*houses.length)
                var house = houses[i];
                if(house.door.onOpen != house.door.createFollower) {
                    numEnemies++
                    continue;
                }
                house.door.setTrap();
            }
            for(var j=0;j<numBads&&j<houses.length;j++) {
                var i = Math.floor(Math.random()*houses.length)
                var house = houses[i];
                if(house.door.onOpen != house.door.createFollower) {
                    numBads += 1;
                    continue;
                }
                house.door.onOpen = house.door.createRefuser
            }
            for(var i=0;i<2;i++) {
                scene.addEntity(new Ninja((i+0.5)*50+2000, 500))
            }
            for(var i=0;i<2;i++) {
                scene.addEntity(new Bot((i+0.5)*50+2000, 200))
            }
            for(var i=0;i<6;i++) {
                scene.addEntity(new Troll((i+0.5)*50+3000, 500))
            }
            for(var i=0;i<6;i++) {
                scene.addEntity(new Troll((i+0.5)*50+3000, 200))
            }
            
        }

    },
    {
        name: "Bus Transition",
        DialogueData: [
            {person: LouChalibre, text: "We need to get you to the polling location"},
            {person: LouChalibre, text: "Lets take the bus!"},
            {person: LouChalibre, text: "Many cities have free public buses to the polling location."},
        ],
        dontShowGo: true,
        onLoad: (scene) => {
            // var lowRider = scene.addEntity(new ImageDrawable(IMAGES.lowRider, 250,-100))
            // lowRider.w *= 3;
            // lowRider.h *= 3;
            var lowRider = scene.addEntity(new FreedomBus(150,-100))


            var door = scene.addEntity(new EnterableDoor(lowRider.x+250,lowRider.y+250,0));
            door.afterDialogue = () => {
                scene.loadNextLevel();
                player.hidden = false;
            }
            door.onInteract = player => {
                player.hidden = true;
                player.scene.dialogueController.speakerImage = null;
                player.x = lowRider.x + 300
                var dialogue = [
                    {onStart: () => {
                        lowRider.bouncing = true;
                        lowRider.update = () => {
                            lowRider.x += 10;
                            player.x += 10;
                            lowRider.frontOffset = Math.sin(frameCount * Math.PI/25);
                            lowRider.frontOffset = lowRider.frontOffset*lowRider.frontOffset*3;
                        }
                    }, waitFor: 120}
                ]
                player.scene.playDialogue(
                    dialogue, true, door.afterDialogue
                )
            }
        },
        // night: true,
    },
    {
        name: "To The Polling Station",
        Goal: "Get to the Polling Station!",
        showGo: true,
        onLoad: scene => {
            var x = 600;
            var y = 50;
            {
                var deskImage =  new ImageDrawable(IMAGES.tacosLocosBack, 0,0);
                deskImage.w *= 2.5;
                deskImage.h *= 2.5;
                deskImage.y = -deskImage.h+60;
                var deskBack = scene.addEntity(new EntityTwoPointFiveD(450+x,y-60,0,deskImage))
            }
            {
                var deskImage =  new ImageDrawable(IMAGES.tacosLocos, 0,0);
                deskImage.w *= 2.5;
                deskImage.h *= 2.5;
                deskImage.y = -deskImage.h;
                var desk = scene.addEntity(new EntityTwoPointFiveD(450+x,y,0,deskImage))
            }
            var npc = scene.addEntity(new Carumba(520+x,y-40))
            // npc.shouldStartDiaolgueOnProximity = true;
            npc.dx = -1
            npc.getInputs = e=>{}
            npc.beHappy();
            npc.name = "Carumba"
            npc.canHighFive = false;
            npc.lookingAt = scene.players[0]
            npc.interactablesRange = 200;
            // npc.model.headBase.drawable.image = IMAGES.CarumbaHead;
            // npc.model.glasses.drawable.image = null;
            // npc.model.hair.drawable.image = null;
            npc.onAfterDialogue = e=> {
            }
            scene.specialActors.Carumba = npc;
            npc.giveItem = () => {
                // npc.isInteractable = false;
                scene.showGo = true;
                var taco = scene.addEntity(new Taco(npc.x+150,npc.y+50))
                taco.z += -80
            }
            npc.dialogue = dialogueIndexedByScene["taco stand 2"];

            scene.addEntity(new Victor(300,0))
            scene.addEntity(new Pocha(250,0))
        }
    },
    {
        name: "Blockade Entrance",
        // debugStartWithThisOne: true,
        // width: 5000,
        winCondition: scene => {
            if(scene.phase == 5) return true;
            if(scene.enemies.length==0) {
                scene.phase += 1;
                switch(scene.phase) {
                    case (1) :
                        scene.level.width = 3000
                        scene.ground.w = 3000;
                        for(var j=0;j<6;j++) {
                            for(var i=0;i<8;i++) {
                                var x = 1900+i*50 + j*15;
                                var y = 0 + j * 50;
                                var bot = scene.addEntity( new Troll(x,y));
                                bot.dx=-1;
                                bot.update();
                                // bot1.getInputs = ()=>{}
                            }
                        }
                    break;
                    case 2:
                        scene.level.width = 4000
                        scene.ground.w = 4000;
                        var x = 3100;
                        var y = 50;
                        {
                            var deskImage =  new ImageDrawable(IMAGES.tacosLocosBack, 0,0);
                            deskImage.w *= 2.5;
                            deskImage.h *= 2.5;
                            deskImage.y = -deskImage.h+60;
                            var deskBack = scene.addEntity(new EntityTwoPointFiveD(450+x,y-60,0,deskImage))
                        }
                        {
                            var deskImage =  new ImageDrawable(IMAGES.tacosLocos, 0,0);
                            deskImage.w *= 2.5;
                            deskImage.h *= 2.5;
                            deskImage.y = -deskImage.h;
                            var desk = scene.addEntity(new EntityTwoPointFiveD(450+x,y,0,deskImage))
                        }
                        var npc = scene.addEntity(new Carumba(520+x,y-40))
                        // npc.shouldStartDiaolgueOnProximity = true;
                        npc.dx = -1
                        npc.getInputs = e=>{}
                        npc.beHappy();
                        npc.name = "Carumba"
                        npc.canHighFive = false;
                        npc.lookingAt = scene.players[0]
                        npc.interactablesRange = 200;
                        npc.onAfterDialogue = e=> {
                        }
                        scene.specialActors.Carumba = npc;
                        npc.giveItem = () => {
                            // npc.isInteractable = false;
                            scene.showGo = true;
                            var taco = scene.addEntity(new Taco(npc.x+150,npc.y+50))
                            taco.z += -80
                        }
                        npc.dialogue = dialogueIndexedByScene["taco stand"];
                        break;
                    case 3:
                    scene.level.width = 5500
                    scene.ground.w = 5500;
                        for(var j=0;j<3;j++) {
                            for(var i=0;i<1;i++) {
                                var x = 3900+i*50+8*50 + j*30;
                                var y = 0 + j * 50;
                                var bot = scene.addEntity( new QAnonShamon(x,y));
                                bot.dx=-1;
                                bot.update();
                                // bot1.getInputs = ()=>{}
                            }
                        }
                        for(var j=0;j<3;j++) {
                            for(var i=0;i<1;i++) {
                                var x = 4200+i*50+9*50 + j*15;
                                var y = 0 + j * 50;
                                var bot = scene.addEntity( new MagaMarge(x,y));
                                bot.dx=-1;
                                bot.update();
                                // bot1.getInputs = ()=>{}
                            }
                        }
                        for(var j=0;j<1;j++) {
                            for(var i=0;i<3;i++) {
                                var x = 3900+i*50+10*50 + j*30;
                                var y = 0 + j * 50;
                                var bot = scene.addEntity( new LizardPerson(x,y));
                                bot.dx=-1;
                                bot.update();
                                // bot1.getInputs = ()=>{}
                            }
                        }
                        break;
                    case 4:
                        scene.addEntity(new Putin(5000,200))
                        break;
                }
            }
            return scene.player.x < scene.level.width-1000 && !scene.dialogueBlocking;
        },
        spawnRandom: [
            [Taco, 3],
        ],
        onLoad: scene => {
            var bot1;
            scene.phase = 0;
            scene.showGoOnEnemiesDefeated = true;
            for(var j=0;j<6;j++) {
                for(var i=0;i<10;i++) {
                    var x = 400+i*50 + j*15;
                    var y = 0 + j * 50;
                    var bot = scene.addEntity( new Bot(x,y));
                    bot.dx=-1;
                    bot.update();
                    if(j==3&&i==5)bot1 = bot;
                    // bot1.getInputs = ()=>{}
                }
            }
            // for(var j=0;j<6;j++) {
            //     for(var i=0;i<8;i++) {
            //         var x = 1900+i*50 + j*15;
            //         var y = 0 + j * 50;
            //         var bot = scene.addEntity( new Troll(x,y));
            //         bot.dx=-1;
            //         bot.update();
            //         // bot1.getInputs = ()=>{}
            //     }
            // }
            // for(var j=0;j<3;j++) {
            //     for(var i=0;i<1;i++) {
            //         var x = 2900+i*50+8*50 + j*30;
            //         var y = 0 + j * 50;
            //         var bot = scene.addEntity( new QAnonShamon(x,y));
            //         bot.dx=-1;
            //         bot.update();
            //         // bot1.getInputs = ()=>{}
            //     }
            // }
            // for(var j=0;j<6;j++) {
            //     for(var i=0;i<1;i++) {
            //         var x = 3900+i*50+9*50 + j*15;
            //         var y = 0 + j * 50;
            //         var bot = scene.addEntity( new MagaMarge(x,y));
            //         bot.dx=-1;
            //         bot.update();
            //         // bot1.getInputs = ()=>{}
            //     }
            // }
            // for(var j=0;j<1;j++) {
            //     for(var i=0;i<3;i++) {
            //         var x = 3900+i*50+10*50 + j*30;
            //         var y = 0 + j * 50;
            //         var bot = scene.addEntity( new LizardPerson(x,y));
            //         bot.dx=-1;
            //         bot.update();
            //         // bot1.getInputs = ()=>{}
            //     }
            // }
            bot1.obj = bot1;
            bot1.shouldStealCamera = true;
            scene.specialActors.Bot = bot1;
            scene.player.obj = scene.player;
            scene.player.name = "";
            scene.player.model.mouth.drawable.image = IMAGES.mouthFrown;
            scene.specialActors.Everyone = scene.player;
            var dialogue = dialogueIndexedByScene["blockade"];
            LouChalibre.spawnFriends = () => {
                for(var i=0;i<8;i++) {
                    var x = 0;
                    var y = Math.random()*scene.maxY + scene.minY;
                    var e = scene.addEntity(new HighFiver(x,y))
                    e.startFollow(scene.player,80)
                    e.contactDamage = 5;
                    e.mx = Math.random();
                    e.isBrawlingMode = true;
                }
            }
            if(!dialogue.edited) {
                dialogue.push(
                    // {onStart: () => {
                    //     for(var i=0;i<8;i++) {
                    //         var x = 0;
                    //         var y = Math.random()*scene.maxY + scene.minY;
                    //         var e = scene.addEntity(new HighFiver(x,y))
                    //         e.startFollow(scene.player,80)
                    //         e.contactDamage = 5;
                    //         e.mx = Math.random();
                    //         e.isBrawlingMode = true;
                    //     }
                    // }, waitFor: 20},
                    {
                        onStart: () => {
                            highFivers.forEach(h=>h.mx=0)
                        }, waitFor: 20
                    },
                    {
                        person: {name: "Everyone", obj: scene.player},
                        text: "Lets go!",
                        onStart: () => {
                            highFivers.forEach(h=> {
                                h.highFive();
                            })
                        }
                    },
                    {
                        onStart: () => {
                            highFivers.forEach(h=>{
                                h.mx=1,
                            h.enemySeekRange=1000;
                            h.avoidHealth = h.maxHealth/4
    
                        })
                        }, waitFor: 20
                    },
                )
                dialogue.edited = true
            }
            scene.playDialogue(dialogue, true, )
            // scene.playDialogue([
            //     {person: bot1, text: 'you will never get past our blockade!'},
            //     {person: bot1, text: 'hahaha'},
            //     {person: scene.player, text: "oh no!"},
            //     {person: scene.player, text: "how will we get through?"},
            //     {person: scene.player, set:{mx:1},       waitFor: 20},
            //     {person: scene.player, set:{mx:0},       waitFor: 20},
            //     {person: scene.player, set:{mx:0, dx:-1}, waitFor: 20},
            //     {person: scene.player, set:{mx:0, dx:1}, waitFor: 20},
            //     {person: scene.player, text: '<color red>*your cell phone rings*'},
            //     {person: LouChalibre, text: "Hola!", onStart: () => {
            //         scene.player.model.mouth.drawable.image = IMAGES.mouthSmile;
            //         scene.player.jump();
            //     }},
            //     {person: LouChalibre, text: "I heard there was some problems at the ballot office!"},
            //     {person: LouChalibre, text: "We are on our way to help!"},
            //     {person: LouChalibre, text: "All the friends you made along the way will come help you fight"},
            //     // {person: scene.player, doA: "jump",waitFor:10},
            //     {onStart: () => {
            //         for(var i=0;i<8;i++) {
            //             var x = 0;
            //             var y = Math.random()*scene.maxY + scene.minY;
            //             var e = scene.addEntity(new HighFiver(x,y))
            //             e.startFollow(scene.player,80)
            //             e.contactDamage = 5;
            //             e.mx = Math.random();
            //             e.isBrawlingMode = true;
            //         }
            //     }, waitFor: 20},
            //     {
            //         onStart: () => {
            //             highFivers.forEach(h=>h.mx=0)
            //         }, waitFor: 20
            //     },
            //     {
            //         person: {name: "Everyone", obj: scene.player},
            //         text: "Lets go!",
            //         onStart: () => {
            //             highFivers.forEach(h=> {
            //                 h.highFive();
            //             })
            //         }
            //     },
            //     {
            //         onStart: () => {
            //             highFivers.forEach(h=>{
            //                 h.mx=1,
            //             h.enemySeekRange=1000;
            //             h.avoidHealth = h.maxHealth/4

            //         })
            //         }, waitFor: 20
            //     },
            // ], true,  )
            
        },
        // DialogueData: [
        //     {target: {x:500,y:200}, waitFor: 100},
        //     // {target: {x: 0,y:200}, waitFor: 100},
        // ]
    },
    {
        name: "Polling Station",
        Goal: "Enter the Polling Station",
        music: SOUNDS.norteno,
        environment: Environments.Street,
        DialogueData: [
            {person: LouChalibre, text: "you made it to the Polling station!", zoom: 0.5},
            // {text: "<color red> you received a ballot!"},
        ], //give ballot cutscene
        dontShowGo: true,
        onLoad: (scene) => {
            var office = scene.addEntity(
                new ImageDrawable(
                    ImageLoader.loadImage("RegistrarOffice.png",null, (img) => {
                        office.reInit();
                        office.w *= 4
                        office.h *= 4
                        window.office=office;
                        office.y=-office.h - 80
                        // scene.addEntity(new ItemPickup('Ballot', IMAGES.ballotItem, 600,100,64,64))
                        scene.addEntity(new EnterableDoor(office.x+office.w/2+30,-100,0));
                        scene.defaultZoom = 0.5
                        scene.cameraLerpSpeed = 40
                        // scene.camera.zoom = 0.5
                        scene.camera.offsetY = -200
                    }), 350,0))
            // scene.addEntity(new DrawableImage(office.x+650,0, IMAGES.ballotBox,1.5))
            scene.addEntity(new ExplodingBallotBox(office.x+200,20))
            scene.addEntity(new ExplodingBallotBox(office.x+800,20))
            
                for(var i=0;i<8;i++) {
                    var x = 0;
                    var y = Math.random()*scene.maxY + scene.minY;
                    var e = scene.addEntity(new HighFiver(x,y))
                    e.startFollow(scene.player,80)
                    e.contactDamage = 5;
                    e.mx = Math.random();
                    // e.isBrawlingMode = true;
                }
            
        }
        
    },
    {
        name: "DEMO COMPLETE",
        continueOnDialogueFinish: true,
        showGo: false,
        music: SOUNDS.cumbia2,
        environment: Environments.OfficeInterior,
        DialogueData: [
            {text: "Congratulations! you made it to the ballot office and completed the demo content so far"},
        ],
        winCondition: scene => {
            scene.player.inputBlocked = true;
            return false
        },
        onLoad: scene => {
            scene.player.hidden = true;
            scene.minY += 200

            for(var i=0;i<10;i++) {
                for(var j=0;j<2;j++) {
                    var x = i * 100 + j*50;
                    var y = 150+j*100;
                    scene.addEntity(new DrawableImage(x,y,IMAGES.votingBooth, 2))
                }
            }
            frameCount = 0;
            scene.camera.target.y += 500
            for(var i=0;i<10;i++) {
                for(var j=0;j<2;j++) {
                var hf = scene.addEntity(new HighFiver(-i*100+j*50-i*10,100+j*100))
                hf.isInteractable = false;
                hf.shouldSceneCollide = false;
                hf.state = 0
                hf.timer = -i*10;
                hf.mx = 1;
                hf.item.type = ITEMS.ballot;
                hf.item.count = 1;
                hf.getInputs = function() {
                    // if(frameCount%40==0) {
                        // this.state = (this.state+1)%3;
                        this.timer +=1;
                        switch(this.state) {
                            case 0:
                                this.mx = 1;
                                if(this.timer>240) {this.state =1; this.timer = 0}
                                break;
                            case 1:
                                this.mx =0
                                if(this.timer>40){this.state = 2; this.timer = 0;}
                                break;
                            case 2:
                                // this.model.throw();
                                this.useItem();
                                this.state++;
                                this.timer=0;
                            break;
                            case 3:
                                if(this.timer>80){this.state++;this.timer = 0;}
                                break;
                            case 4:
                                this.mx = 1;
                                // if(this.timer > 500) this.scene.loadNextLevel()
                        }
                    // }
                }
            }}
        }
    },
    // {
    //     name: "Boss cutscene"
    // },
    // {
    //     name: "Boss Fight"
    // },
    // {
    //     name: "Vote Cutscene"
    // }

]

})


var Events_table = {
    "Event_Water": {
        onStart: dia => {
            npc.isInteractable = false;
            scene.showGo = true;
            scene.addEntity(new WaterBottle(npc.x+100,npc.y+100))
        }
    }
}
const dialogueIndexedByScene = {};

const convertDialogueJsonToJs = async function() {
	ImageLoader.imagesToLoad += 1;
	const resp = await fetch(`${ROOT_DIR}Assets/Dialogue/Dialogue.json`);
	/**
	 * @type {Array<{
	 *	"Scene": String,
	 *	"Person": null,
	 *	"English": null,
	 *	"": null,
	 *	"notes": "Scene and Person are assumed to be the same as above if not specified"
	 * }>
	 * }
	 * */
	const dialogueArr = await resp.json();

	let lastSceneDetected = dialogueArr[0].Scene;
	if (!lastSceneDetected) throw("First scene is not");
    var lastType = "";
    var lastDialogue = null;
	for (const info of dialogueArr) {
		// check if this is an empty line in csv
		let hasData = false;
		for (const key in info) {
			hasData = info[key];
			if (hasData) break;
		}

		if (!hasData) continue;
        if(info.Scene) {
            lastType = "";
        }
        if(info.set) {
            var correctJson = info.set.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
            info.set = JSON.parse(correctJson);

        }
		lastSceneDetected = (info.Scene || lastSceneDetected || "").replaceAll('"', "").toLowerCase();
        var type=((info.type||"") || lastType).toLowerCase()
        lastType = type;
        var key = lastSceneDetected + type;
        info.dialogueKey = key
        if(!info.English && !info.doA&&!info.set&&!info.waitFor) continue;
		dialogueIndexedByScene[key] = dialogueIndexedByScene[key] || [];
		dialogueIndexedByScene[key].push(info);
        lastDialogue = info;
        
	}

	window.dispatchEvent(new CustomEvent("finished_loading_dialog", {
		detail: {
			dialogue: dialogueArr,
			dialogueIndexedByScene,
		}
	}));
	ImageLoader.onLoad();
}

convertDialogueJsonToJs();


/* example output
{
  "Opening Cutscene": [
    {
      "Scene": "Opening Cutscene",
      "Person": null,
      "English": null,
      "": null,
      "notes": "Scene and Person are assumed to be the same as above if not specified"
    },
    {
      "Scene": "Opening Cutscene",
      "Person": "LouChalibre",
      "English": "The time to <color red>vote</color> is <wiggle>approaching!",
      "": null,
      "notes": "You can insert more lines of dialogue"
    },
    {
      "Scene": "Opening Cutscene",
      "Person": "LouChalibre",
      "English": "Are you ready to cast your ballot?",
      "": null,
      "notes": null
    },
    {
      "Scene": null,
      "Person": null,
      "English": "blah blah blah",
      "": null,
      "notes": null
    }
  ],
  **/
