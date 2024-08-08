import ms from 'ms';

export default () => ({
    cookieOptions: {
        httpOnly: true,
        secure: true,
        maxAge: ms(process.env.REFRESH_TOKEN_EXPIRE),
        sameSite: 'none',
    },
});
