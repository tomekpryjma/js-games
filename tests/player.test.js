test('Player is not be human', () => {
    const player = {
        id: 666,
        cpu: {/*...*/}
    }
    expect(player.cpu == null).toBe(false);
});

test('Player is human', () => {
    const player = {
        id: 666,
        cpu: null
    }
    expect(player.cpu == null).toBe(true);
});