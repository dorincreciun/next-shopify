export type FormState<T> =
    | {
          errors?: {
              [K in keyof T]?: string[]
          } & {
              _form?: string[]
          }
          message?: string
          success?: boolean
      }
    | undefined
