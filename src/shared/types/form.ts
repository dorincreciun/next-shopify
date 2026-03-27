export type FormState<T> =
    | {
    errors?: {
        [K in keyof T]?: string[];
    } & {
        form?: string[];
    };
    messages?: string;
}
    | undefined;