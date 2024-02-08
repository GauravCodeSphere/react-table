import { faker } from "@faker-js/faker";


export const FakeData = () => {
    const numberOfRows = 100
    const fakeDataGenerater = [...Array(numberOfRows).fill(null)].map((_, index) => ({
        id: index + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        address: faker.location.streetAddress(),
        zipCode: faker.location.zipCode(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        age: faker.number.int({ min: 10, max: 100 }),
        salary: faker.number
            .int({ min: 0, max: 1000000 })
            .toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            }),
        dateOfBirth: faker.date.past({ years: 50 }).toDateString(),
        dateOfJoining: faker.date.past({ years: 20 }).toDateString(),
        isActive: faker.datatype.boolean() ? 'Active' : 'Inactive',
    }));

    return fakeDataGenerater

};
