

export const generateSelector = <T extends object>(cls: new (...args: any[]) => T): Record<keyof T, true> => {
    const instance = new cls({}); // Crée une instance vide
    const keys = Object.keys(instance) as (keyof T)[];
    const selector: Record<keyof T, true> = {} as any;
    keys.forEach(key => {
        selector[key] = true;
    });
    return selector;
};