import { z } from "zod";
import { UDG_EMAIL_REGEX } from "./constants";

export const loginSchema = z.object({
    email: z.email({
        pattern: UDG_EMAIL_REGEX,
        error: "El correo debe ser institucional (@alumnos.udg.mx)"
    }),

    password: z.string()
        .min(1, "La contraseña es requerida")
})

export type LoginRequest = z.infer<typeof loginSchema>