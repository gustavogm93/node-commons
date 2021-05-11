module.exports = {
    preset: 'ts-jest',
    verbose: true,
    testEnvironment: 'jsdom',
    rootDir: `${process.cwd()}/src`,
    globals: {
        'ts-jest': {
            babelConfig: true,
        },
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
