export const notFoundMessage = (subject: string) => {
    return { message: `${subject} not found` };
};

export const alreadyExistsMessage = (subject: string) => {
    return { message: `${subject} is already exists` };
};