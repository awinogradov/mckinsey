module.exports = {
    plugins: [
        {
            name: 'typescript',
            options: {
                forkTsChecker: {
                    tsconfig: './tsconfig.json',
                    tslint: false,
                },
            },
        },
    ],
};
