import { IPropertyShape, IUserShape } from "../interface";
import { IRequestResponse } from "./interfaces";

import { formatProperty } from "../utils/formatData";

import PropertyRepository from "./repositories/propertyRepository";

require("dotenv").config();

class PropertyService {
    constructor(private readonly propertyRepository: typeof PropertyRepository) { }

    async create(newProperty: IPropertyShape, user: IUserShape): Promise<IRequestResponse> {
        try {
            const createdProperty = await this.propertyRepository.create(
                newProperty,
                user
            );

            if (!createdProperty) {
                return {
                    status: 400,
                    data: { message: "Error on property creation" },
                };
            }

            const property = formatProperty(createdProperty, user);

            return {
                status: 201,
                data: { property },
            };
        } catch (error) {
            return {
                status: 400,
                data: { message: "Property already registered" },
            };
        }
    }

    async edit(updatedProperty: IPropertyShape, user: IUserShape, propertyId: number): Promise<IRequestResponse> {
        try {
            const editedProperty = await this.propertyRepository.edit(updatedProperty, propertyId);
            console.log(editedProperty);

            if (editedProperty === null) {
                return {
                    status: 404,
                    data: { message: "Property already up to date" },
                };
            }

            const property = formatProperty(editedProperty, user);

            return {
                status: 200,
                data: { property },
            };
        } catch (error) {
            return {
                status: 500,
                data: { message: "Internal server error" },
            };
        }
    }

    // async exclude(propertyId: number): Promise<IRequestResponse> { }

    // async getOne(propertyId: number): Promise<IRequestResponse> { }

    // async getAll(userId: number): Promise<IRequestResponse> { }
}

export default PropertyService;