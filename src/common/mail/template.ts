export const TEMPLATES = {
    email_verification: {
        id: 6984848,
        variables: {
            firstname: true,
            otp: true,
        }
    },
    share_folder: {
        id: 6859450,
        variables: {
            firstname: true,
            lastname: true,
            link: true,
        }
    }
}

export type TemplateName = keyof typeof TEMPLATES;

export type ExpectedVariableNames<T extends TemplateName> = keyof typeof TEMPLATES[T]['variables'];

export type TemplateVariables<T extends TemplateName> = {
    [K in ExpectedVariableNames<T>]: string | string[];
};
