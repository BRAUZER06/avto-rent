module.exports = {

    typescript: {
    
        ignoreBuildErrors: true,
      },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: [
            "localhost",

            process.env.IMAGES_HOSTNAME,
            process.env.NEXT_API_URL,
          
            
        ],
    },
};
