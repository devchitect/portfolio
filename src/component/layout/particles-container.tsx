'use client'

import { useCallback } from "react";
import type { Container, Engine, ISourceOptions } from "tsparticles-engine" // importing the ISourceOptions type
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { desktop } from "../utils/use-media_queries";


const ParticlesContainer = () => {

    const theme = useSelector((state : RootState) => state.theme.mode);

    const particlesColor = theme === 'dark' ? '#ffffff' : '#111111d7';
    const particlesLink = theme === 'dark' ? '#00ffff' : 'rgba(111,0,255)';

    const particlesInit = useCallback(async (engine : Engine) => {
        // console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    // const particlesLoaded = useCallback(async container => {
    //     await console.log(container);
    // }, []);

    const particlesConfig : ISourceOptions = {
        autoPlay: true,
        background: {
            color: {
                value: ""
            },
            image: "",
            position: "",
            repeat: "",
            size: "",
            opacity: 0
        },
        backgroundMask: {
            composite: "destination-out",
            cover: {
                color: {
                    value: "#fff"
                },
                opacity: 0
            },
            enable: false
        },
        defaultThemes: {},
        delay: 0,
        fullScreen: {
            enable: true,
            zIndex: 0
        },
        detectRetina: true,
        duration: 0,
        fpsLimit: 80,
        interactivity: {
            detectsOn: "window",
            events: {
                onClick: {
                    enable: true,
                    mode: "repulse"
                },
                onDiv: {
                    selectors: [],
                    enable: false,
                    mode: [],
                    type: "circle"
                },
                onHover: {
                    enable: true,
                    mode: "grab",
                    parallax: {
                        enable: false,
                        force: 2,
                        smooth: 10
                    }
                },
                resize: {
                    delay: 0.5,
                    enable: true
                }
            },
            modes: {
                attract: {
                    distance: 200,
                    duration: 0.4,
                    easing: "ease-out-quad",
                    factor: 1,
                    maxSpeed: 50,
                    speed: 1
                },
                bounce: {
                    distance: 200
                },
                bubble: {
                    distance: 200,
                    duration: 0.4,
                    mix: false,
                    divs: {
                        distance: 200,
                        duration: 0.4,
                        mix: false,
                        selectors: []
                    }
                },
                connect: {
                    distance: 110,
                    links: {
                        opacity: 1
                    },
                    radius: 60
                },
                grab: {
                    distance: 180,
                    links: {
                        blink: false,
                        consent: true,
                        color: {
                            value: `${particlesLink}`
                        },
                        opacity: 1
                    }
                },
                push: {
                    default: true,
                    groups: [],
                    quantity: 3
                },
                remove: {
                    quantity: 2
                },
                repulse: {
                    distance: 250,
                    duration: 0.3,
                    factor: 0,
                    speed: 3,
                    maxSpeed: 10,
                    easing: "ease-out-quad",
                    // divs: {
                    //     distance: 200,
                    //     duration: 0.4,
                    //     factor: 100,
                    //     speed: 1,
                    //     maxSpeed: 50,
                    //     easing: "ease-out-quad",
                    //     selectors: []
                    // }
                },
                slow: {
                    factor: 3,
                    radius: 100
                },
            
                light: {
                    area: {
                        gradient: {
                            start: {
                                value: "#ffffff"
                            },
                            stop: {
                                value: "#000000"
                            }
                        },
                        radius: 1000
                    },
                    shadow: {
                        color: {
                            value: "#000000"
                        },
                        length: 2000
                    }
                }
            }
        },
        manualParticles: [],
        particles: {
            bounce: {
                horizontal: {
                    random: {
                        enable: false,
                        minimumValue: 0.1
                    },
                    value: 1
                },
                vertical: {
                    random: {
                        enable: false,
                        minimumValue: 0.1
                    },
                    value: 1
                }
            },
            collisions: {
                absorb: {
                    speed: 2
                },
                bounce: {
                    horizontal: {
                        random: {
                            enable: false,
                            minimumValue: 0.1
                        },
                        value: 1
                    },
                    vertical: {
                        random: {
                            enable: false,
                            minimumValue: 0.1
                        },
                        value: 1
                    }
                },
                enable: true,
                mode: "bounce",
                overlap: {
                    enable: true,
                    retries: 0
                }
            },
            color: {
                value: `${particlesColor}`, //#ff0000
                animation: {
                    h: {
                        count: 0,
                        enable: true,
                        offset: 0,
                        speed: 1,
                        decay: 0,
                        sync: false
                    },
                    s: {
                        count: 0,
                        enable: false,
                        offset: 0,
                        speed: 1,
                        decay: 0,
                        sync: true
                    },
                    l: {
                        count: 0,
                        enable: false,
                        offset: 0,
                        speed: 1,
                        decay: 0,
                        sync: true
                    }
                }
            },
            groups: {},
            move: {
                angle: {
                    offset: 0,
                    value: 90
                },
                attract: {
                    distance: 200,
                    enable: false,
                    rotate: {
                        x: 3000,
                        y: 3000
                    }
                },
                center: {
                    x: 50,
                    y: 50,
                    mode: "percent",
                    radius: 0
                },
                decay: 0,
                distance: {},
                direction: "none",
                drift: 0,
                enable: true,
                gravity: {
                    acceleration: 9.81,
                    enable: false,
                    inverse: false,
                    maxSpeed: 50
                },
                path: {
                    clamp: true,
                    delay: {
                        random: {
                            enable: false,
                            minimumValue: 0
                        },
                        value: 0
                    },
                    enable: false,
                    options: {}
                },
                outModes: {
                    default: "out",
                    bottom: "out",
                    left: "out",
                    right: "out",
                    top: "out"
                },
                random: false,
                size: false,
                speed: 1.3,
                spin: {
                    acceleration: 0,
                    enable: false
                },
                straight: false,
                trail: {
                    enable: false,
                    length: 10,
                    fill: {}
                },
                vibrate: false,
                warp: false
            },
            number: {
                density: {
                    enable: true,
                    width: 1920,
                    height: 1080
                },
                limit: 200,
                value: 88
            },
            opacity: {
                random: {
                    enable: true,
                    minimumValue: 0.3
                },
                value: {
                    min: 0.3,
                    max: 1
                },
                animation: {
                    count: 0,
                    enable: true,
                    speed: 0.5,
                    decay: 0,
                    sync: false,
                    destroy: "none",
                    startValue: "random",
                    minimumValue: 0.5
                }
            },
            reduceDuplicates: false,
            shadow: {
                blur: 0,
                color: {
                    value: "#000"
                },
                enable: false,
                offset: {
                    x: 0,
                    y: 0
                }
            },
            shape: {
                options: {},
                type: "polygon"
            },
            size: {
                random: {
                    enable: true,
                    minimumValue: 1
                },
                value: {
                    min: 1,
                    max: 3
                },
                animation: {
                    count: 0,
                    enable: true,
                    speed: 3,
                    decay: 0,
                    sync: false,
                    destroy: "none",
                    startValue: "random",
                    minimumValue: 1
                }
            },
            stroke: {
                width: 0.1,
                color: {
                    value: "",
                    animation: {
                        h: {
                            count: 0,
                            enable: false,
                            offset: 0,
                            speed: 0,
                            decay: 0,
                            sync: false
                        },
                        s: {
                            count: 0,
                            enable: false,
                            offset: 0,
                            speed: 1,
                            decay: 0,
                            sync: true
                        },
                        l: {
                            count: 0,
                            enable: false,
                            offset: 0,
                            speed: 1,
                            decay: 0,
                            sync: true
                        }
                    }
                }
            },
            zIndex: {
                random: {
                    enable: false,
                    minimumValue: 0
                },
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1
            },
            life: {
                count: 0,
                delay: {
                    random: {
                        enable: false,
                        minimumValue: 0
                    },
                    value: 0,
                    sync: false
                },
                duration: {
                    random: {
                        enable: false,
                        minimumValue: 0.0001
                    },
                    value: 0,
                    sync: false
                }
            },
            rotate: {
                random: {
                    enable: false,
                    minimumValue: 0
                },
                value: 0,
                animation: {
                    enable: false,
                    speed: 0,
                    decay: 0,
                    sync: false
                },
                direction: "clockwise",
                path: false
            },
            destroy: {
                bounds: {},
                mode: "none",
                split: {
                    count: 1,
                    factor: {
                        random: {
                            enable: false,
                            minimumValue: 0
                        },
                        value: 3
                    },
                    rate: {
                        random: {
                            enable: false,
                            minimumValue: 0
                        },
                        value: {
                            min: 4,
                            max: 9
                        }
                    },
                    sizeOffset: true,
                    particles: {}
                }
            },
            // roll: {
            //     darken: {
            //         enable: false,
            //         value: 0
            //     },
            //     enable: false,
            //     enlighten: {
            //         enable: false,
            //         value: 0
            //     },
            //     mode: "vertical",
            //     speed: 25
            // },
            // tilt: {
            //     random: {
            //         enable: false,
            //         minimumValue: 0
            //     },
            //     value: 0,
            //     animation: {
            //         enable: false,
            //         speed: 0,
            //         decay: 0,
            //         sync: false
            //     },
            //     direction: "clockwise",
            //     enable: false
            // },
            // twinkle: {
            //     lines: {
            //         enable: false,
            //         frequency: 0.05,
            //         opacity: 1
            //     },
            //     particles: {
            //         enable: false,
            //         frequency: 0.05,
            //         opacity: 1
            //     }
            // },
            // wobble: {
            //     distance: 5,
            //     enable: false,
            //     speed: {
            //         angle: 50,
            //         move: 10
            //     }
            // },
            // orbit: {
            //     animation: {
            //         count: 0,
            //         enable: false,
            //         speed: 1,
            //         decay: 0,
            //         sync: false
            //     },
            //     enable: false,
            //     opacity: 1,
            //     rotation: {
            //         random: {
            //             enable: false,
            //             minimumValue: 0
            //         },
            //         value: 45
            //     },
            //     width: 1
            // },
            links: {
                blink: false,
                color: {
                    value: "random"
                },
                consent: false,
                distance: 111,
                enable: true,
                frequency: 13,
                opacity: 0.69,
                shadow: {
                    blur: 5,
                    color: {
                        value: "#000"
                    },
                    enable: false
                },
                triangles: {
                    enable: false,
                    frequency: 1
                },
                width: 1.5,
                warp: false
            },
            repulse: {
                random: {
                    enable: false,
                    minimumValue: 0
                },
                value: 0,
                enabled: false,
                distance: 1,
                duration: 1,
                factor: 1,
                speed: 1
            }
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        responsive: [],
        smooth: false,
        style: {},
        themes: [],
        zLayers: 100,
        emitters: []
    }
    

    return (
      <>
      {(theme === 'dark' && desktop) &&
       <div style={{position:'fixed', zIndex:'-3'}}>  
            <Particles
                id="tsparticles"
                init={particlesInit}
                // loaded={particlesLoaded}
                options={particlesConfig}/>
        </div>
        } 
      </> 
    )


  
}

export default ParticlesContainer;


