
export type TemplateName = "email_verification"

export const TEMPLATES = {
    email_verification: {
        id: 6984848,
        variables: {
            firstname: true,
            otp: true,
        }
    }
}

export type ExpectedVariableNames<T extends TemplateName> = keyof typeof TEMPLATES[T]['variables'];

export type TemplateVariables<T extends TemplateName> = {
    [K in ExpectedVariableNames<T>]: string;
};
