import * as logger20_service from "../../../../src/share/domain/config/logger20.service"
// @ponicode
describe("logger20_service.Logger20Service.log", () => {
    let inst: any

    beforeEach(() => {
        inst = new logger20_service.Logger20Service()
    })

    test("0", () => {
        let result: any = inst.log(2, 3, 3)
        expect(result).toBe(undefined)
    })
    test("1", () => {
        let result: any = inst.error(2, 3, 3)
        expect(result).toBe(undefined)
    })
    test("2", () => {
        let result: any = inst.warn(2, 3, 3)
        expect(result).toBe(undefined)
    })
})
