export declare const prismaClient: import("@prisma/client/runtime/library").DynamicClientExtensionThis<import(".prisma/client").Prisma.TypeMap<import("@prisma/client/runtime/library").InternalArgs & {
    result: {
        address: {
            formattedAddress: () => {
                needs: {
                    lineOne: true;
                    lineTwo: true;
                    city: true;
                    country: true;
                    pincode: true;
                };
                compute: (addr: {
                    lineOne: string;
                    lineTwo: string | null;
                    city: string;
                    pincode: string;
                    country: string;
                }) => string;
            };
        };
    };
    model: {};
    query: {};
    client: {};
}, import(".prisma/client").Prisma.PrismaClientOptions>, import(".prisma/client").Prisma.TypeMapCb, {
    result: {
        address: {
            formattedAddress: () => {
                needs: {
                    lineOne: true;
                    lineTwo: true;
                    city: true;
                    country: true;
                    pincode: true;
                };
                compute: (addr: {
                    lineOne: string;
                    lineTwo: string | null;
                    city: string;
                    pincode: string;
                    country: string;
                }) => string;
            };
        };
    };
    model: {};
    query: {};
    client: {};
}, {}>;
