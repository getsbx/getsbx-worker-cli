import { expect, test } from '@oclif/test';
describe('hello world', function () {
    test
        .stdout()
        .command(['hello:world'])
        .it('runs hello world cmd', function (ctx) {
        expect(ctx.stdout).to.contain('hello world!');
    });
});
