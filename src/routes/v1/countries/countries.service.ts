import { PrismaClient } from "@/generated/index.js"
import type { CreateCountryDTO } from "./countries.dto.ts"

export class CountriesService {
    private db: PrismaClient
    constructor() {
        this.db = new PrismaClient()
    }

    async handleGetCountries() {
            
    }

    async handleCreateCounry(data: CreateCountryDTO) {}
}