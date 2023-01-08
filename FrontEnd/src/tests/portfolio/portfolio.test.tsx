import { portfolioSchema } from "../../sharedComponents/portfolioManager/portfolioDataSchemas"
import { portfolioMockData } from "./mockData"



describe('portfolio tests', () => {
    it('portfolioSchemaTest',() => {
        expect(portfolioSchema.parse(portfolioMockData).balance).toBe(12013)
    })
})