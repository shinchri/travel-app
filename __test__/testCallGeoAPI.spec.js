const { callGeo } = require('../src/client/js/callGeoAPI')


test("Testing callGeo exists", () => {
    expect(callGeo).toBeDefined();
});

test('Testing API call"', () => {
    return callGeo("Winnipeg", "2021-09-30", 5).then(data => {
        expect(data).toBe("Geo API Called");
    });
});

