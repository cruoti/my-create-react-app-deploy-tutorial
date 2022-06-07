const config_envs = {
    "local": {
        stageName: "local"
    },

    "dev": {
        stageName: "dev"
    },

    "prod": {
        stageName: "prod"
    }
}

const config = config_envs[process.env.REACT_APP_STAGE]

export default {
    ...config
}