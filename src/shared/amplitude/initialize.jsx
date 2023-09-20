import { ampli, DefaultConfiguration } from '../../ampli';

export const initialize = (AMPLITUDE_API_KEY) => {
    const sdkOptions = { 
        logLevel: 3,
        defaultTracking: true,
        ...DefaultConfiguration
    };

    ampli.load({
        client: {
            apiKey: AMPLITUDE_API_KEY,
            configuration: sdkOptions
        }
    })
}