export default () => ({
    port: parseInt(process.env.PORT) || 8000,
    database: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        name: process.env.DB_NAME,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    }
})