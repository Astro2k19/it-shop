import bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const productCategories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Sports',
    'Outdoor',
    'Home',
] as const;

const main = async () => {
    try {
        await prisma.product.deleteMany();
        const hashedPassword = await bcrypt.hash('my_secure_password', 10);
        const userData = {
            name: faker.person.firstName(),
            email: faker.internet.email({
                firstName: 'admin',
                provider: 'example.gmail',
            }),
            password: hashedPassword,
        };
        console.log(userData, 'userData');

        await prisma.user
            .delete({ where: { email: userData.email } })
            .catch(() => {});

        const user = await prisma.user.create({
            data: userData,
        });

        const createRandomProduct = () => {
            return {
                userId: user.id,
                name: faker.commerce.product(),
                price: Number(faker.commerce.price()),
                description: faker.lorem.paragraph(),
                images: [
                    {
                        public_id: 'shopit/demo/jzqaj98nnhy0hcsilx9y',
                        url: faker.image.urlLoremFlickr({
                            category: 'technics',
                        }),
                    },
                    {
                        public_id: 'shopit/demo/welkq4dgfi5267usmj0n',
                        url: faker.image.urlLoremFlickr({
                            category: 'technics',
                        }),
                    },
                    {
                        public_id: 'shopit/demo/pabtjloyzenmr6z8klcr',
                        url: faker.image.urlLoremFlickr({
                            category: 'technics',
                        }),
                    },
                ],
                category: faker.helpers.arrayElement(productCategories),
                seller: faker.company.name(),
                stock: faker.helpers.rangeToNumber({ min: 10, max: 100 }),
            };
        };

        const products: Prisma.ProductCreateInput[] = faker.helpers.multiple(
            createRandomProduct,
            {
                count: 50,
            }
        );

        for (const product of products) {
            await prisma.product.create({
                data: product,
            });
        }

        console.log(`Database has been seeded. 🌱`);
    } catch (error) {
        throw error;
    }
};

main().catch((err) => {
    console.warn('Error While generating Seed: \n', err);
});
