import React, { Component } from 'react'
import Particles from 'react-tsparticles'

class ParticleSettings extends Component {
    render() {
        return (
            <div>
                <Particles
                    height="100vh"
                    width="100%"
                    id='tsparticles'
                    options={{
                        fullScreen: {
                            enable: false,
                        },

                        background: {
                            color: {
                                value: "#050816",
                            },
                        },

                        fpsLimit: 60,

                        interactivity: {
                            events: {
                                onHover: {
                                    enable: true,
                                    mode: "grab",
                                },
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                resize: true,
                            },

                            modes: {
                                grab: {
                                    distance: 180,
                                    links: {
                                        opacity: 0.8,
                                    },
                                },

                                push: {
                                    quantity: 2,
                                },
                            },
                        },

                        particles: {
                            number: {
                                value: 60,
                                density: {
                                    enable: true,
                                },
                            },

                            color: {
                                value: "#38bdf8",
                            },

                            links: {
                                enable: true,
                                color: "#38bdf8",
                                distance: 170,
                                opacity: 0.25,
                                width: 1,
                            },

                            move: {
                                enable: true,
                                speed: 1,
                                outModes: {
                                    default: "bounce",
                                },
                            },

                            opacity: {
                                value: 0.4,
                            },

                            size: {
                                value: {
                                    min: 1,
                                    max: 4,
                                },
                            },

                            shape: {
                                type: "circle",
                            },
                        },

                        detectRetina: true,
                    }}
                />
            </div>
        )
    }
}

export default ParticleSettings;